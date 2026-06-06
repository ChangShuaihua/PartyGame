package com.poker.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.poker.dto.*;
import com.poker.entity.*;
import com.poker.mapper.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 计分器业务服务
 * 处理送分、日志查询、本轮重置
 */
@Slf4j
@Service
public class ScoreService {

    private final RoomMapper roomMapper;
    private final RoomUserMapper roomUserMapper;
    private final UserScoreMapper userScoreMapper;
    private final ScoreLogMapper scoreLogMapper;
    private final WebSocketService webSocketService;
    private final RoomService roomService;

    public ScoreService(RoomMapper roomMapper,
                        RoomUserMapper roomUserMapper,
                        UserScoreMapper userScoreMapper,
                        ScoreLogMapper scoreLogMapper,
                        WebSocketService webSocketService,
                        RoomService roomService) {
        this.roomMapper = roomMapper;
        this.roomUserMapper = roomUserMapper;
        this.userScoreMapper = userScoreMapper;
        this.scoreLogMapper = scoreLogMapper;
        this.webSocketService = webSocketService;
        this.roomService = roomService;
    }

    /**
     * 送分操作（允许负分）
     */
    @Transactional
    public RoomVO transferScore(ScoreTransferDTO dto) {
        // 1. 校验房间
        Room room = roomMapper.selectById(dto.getRoomId());
        if (room == null) throw new RuntimeException("房间不存在");
        if (!"SCORE".equals(room.getRoomType())) throw new RuntimeException("该房间不是计分器房间");

        // 2. 校验不能送给自己
        if (dto.getFromUserId().equals(dto.getToUserId())) {
            throw new RuntimeException("不能送分给自己");
        }

        // 3. 校验双方都在房间内
        RoomUser fromUser = roomUserMapper.selectOne(
                new LambdaQueryWrapper<RoomUser>()
                        .eq(RoomUser::getRoomId, dto.getRoomId())
                        .eq(RoomUser::getUserId, dto.getFromUserId()));
        if (fromUser == null) throw new RuntimeException("你不在该房间内");

        RoomUser toUser = roomUserMapper.selectOne(
                new LambdaQueryWrapper<RoomUser>()
                        .eq(RoomUser::getRoomId, dto.getRoomId())
                        .eq(RoomUser::getUserId, dto.getToUserId()));
        if (toUser == null) throw new RuntimeException("对方不在该房间内");

        // 4. 查询送分方分数
        UserScore fromScore = userScoreMapper.selectOne(
                new LambdaQueryWrapper<UserScore>()
                        .eq(UserScore::getRoomId, dto.getRoomId())
                        .eq(UserScore::getUserId, dto.getFromUserId()));
        if (fromScore == null) throw new RuntimeException("送分方分数记录不存在");

        // 5. 执行送分
        fromScore.setScore(fromScore.getScore() - dto.getAmount());
        userScoreMapper.updateById(fromScore);

        UserScore toScore = userScoreMapper.selectOne(
                new LambdaQueryWrapper<UserScore>()
                        .eq(UserScore::getRoomId, dto.getRoomId())
                        .eq(UserScore::getUserId, dto.getToUserId()));
        if (toScore == null) {
            toScore = new UserScore();
            toScore.setRoomId(dto.getRoomId());
            toScore.setUserId(dto.getToUserId());
            toScore.setScore(dto.getAmount());
            userScoreMapper.insert(toScore);
        } else {
            toScore.setScore(toScore.getScore() + dto.getAmount());
            userScoreMapper.updateById(toScore);
        }

        // 6. 记录送分日志
        ScoreLog scoreLog = new ScoreLog();
        scoreLog.setRoomId(dto.getRoomId());
        scoreLog.setFromUserId(dto.getFromUserId());
        scoreLog.setFromNickname(fromUser.getNickname() != null ? fromUser.getNickname() : "");
        scoreLog.setToUserId(dto.getToUserId());
        scoreLog.setToNickname(toUser.getNickname() != null ? toUser.getNickname() : "");
        scoreLog.setAmount(dto.getAmount());
        scoreLogMapper.insert(scoreLog);

        log.info("送分: roomId={}, {} -> {}, amount={}",
                dto.getRoomId(), fromUser.getNickname(), toUser.getNickname(), dto.getAmount());

        // 7. 构建VO并广播
        RoomVO roomVO = roomService.buildRoomVO(room);
        fillScoreLogs(roomVO, dto.getRoomId());
        webSocketService.broadcastToRoom(room.getId(),
                WsMessage.of(WsMessage.TYPE_SCORE_TRANSFER, room.getId(), roomVO));
        return roomVO;
    }

    /**
     * 本轮结束：分数归零，清空日志
     */
    @Transactional
    public RoomVO resetRound(Long roomId, String userId) {
        Room room = roomMapper.selectById(roomId);
        if (room == null) throw new RuntimeException("房间不存在");
        if (!"SCORE".equals(room.getRoomType())) throw new RuntimeException("该房间不是计分器房间");

        // 校验用户在房间内
        RoomUser roomUser = roomUserMapper.selectOne(
                new LambdaQueryWrapper<RoomUser>()
                        .eq(RoomUser::getRoomId, roomId)
                        .eq(RoomUser::getUserId, userId));
        if (roomUser == null) throw new RuntimeException("你不在该房间内");

        // 分数归零
        List<UserScore> scores = userScoreMapper.selectList(
                new LambdaQueryWrapper<UserScore>().eq(UserScore::getRoomId, roomId));
        for (UserScore score : scores) {
            score.setScore(0);
            userScoreMapper.updateById(score);
        }

        // 清空日志
        scoreLogMapper.delete(
                new LambdaQueryWrapper<ScoreLog>().eq(ScoreLog::getRoomId, roomId));

        log.info("本轮结束: roomId={}, 操作者={}", roomId, userId);

        RoomVO roomVO = roomService.buildRoomVO(room);
        fillScoreLogs(roomVO, roomId);
        webSocketService.broadcastToRoom(roomId,
                WsMessage.of(WsMessage.TYPE_ROOM_UPDATE, roomId, roomVO));
        return roomVO;
    }

    /**
     * 填充送分日志到 RoomVO
     */
    public void fillScoreLogs(RoomVO roomVO, Long roomId) {
        List<ScoreLog> logs = scoreLogMapper.selectList(
                new LambdaQueryWrapper<ScoreLog>()
                        .eq(ScoreLog::getRoomId, roomId)
                        .orderByDesc(ScoreLog::getId));
        List<RoomVO.ScoreLogVO> logVOs = logs.stream().map(log -> {
            RoomVO.ScoreLogVO vo = new RoomVO.ScoreLogVO();
            vo.setId(log.getId());
            vo.setFromNickname(log.getFromNickname());
            vo.setToNickname(log.getToNickname());
            vo.setAmount(log.getAmount());
            vo.setCreatedAt(log.getCreatedAt());
            return vo;
        }).collect(Collectors.toList());
        roomVO.setScoreLogs(logVOs);
    }
}
