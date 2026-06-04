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
 * 房间业务服务
 * 处理房间创建、加入、换座、转让房主、退出等逻辑
 */
@Slf4j
@Service
public class RoomService {

    private final RoomMapper roomMapper;
    private final RoomUserMapper roomUserMapper;
    private final UserHandMapper userHandMapper;
    private final PokerPoolMapper pokerPoolMapper;
    private final WebSocketService webSocketService;

    public RoomService(RoomMapper roomMapper,
                       RoomUserMapper roomUserMapper,
                       UserHandMapper userHandMapper,
                       PokerPoolMapper pokerPoolMapper,
                       WebSocketService webSocketService) {
        this.roomMapper = roomMapper;
        this.roomUserMapper = roomUserMapper;
        this.userHandMapper = userHandMapper;
        this.pokerPoolMapper = pokerPoolMapper;
        this.webSocketService = webSocketService;
    }

    // ==================== Skill1: 创建房间（房主） ====================

    @Transactional
    public RoomVO createRoom(CreateRoomDTO dto) {
        String roomCode = generateRoomCode();
        int maxSeats = (dto.getMaxSeats() != null && dto.getMaxSeats() >= 2 && dto.getMaxSeats() <= 10)
                ? dto.getMaxSeats() : 6;

        Room room = new Room();
        room.setRoomCode(roomCode);
        room.setHostUserId(dto.getUserId());
        room.setStatus(0);
        room.setCurrentSeatIndex(1);
        room.setMaxSeats(maxSeats);
        roomMapper.insert(room);

        // 房主自动落座1号位
        RoomUser hostUser = new RoomUser();
        hostUser.setRoomId(room.getId());
        hostUser.setUserId(dto.getUserId());
        hostUser.setSeatNumber(1);
        roomUserMapper.insert(hostUser);

        log.info("房间创建: roomId={}, roomCode={}, host={}, maxSeats={}", room.getId(), roomCode, dto.getUserId(), maxSeats);
        return buildRoomVO(room);
    }

    // ==================== 加入房间 ====================

    @Transactional
    public RoomVO joinRoom(JoinRoomDTO dto) {
        Room room = roomMapper.selectOne(
                new LambdaQueryWrapper<Room>().eq(Room::getRoomCode, dto.getRoomCode()));
        if (room == null) throw new RuntimeException("房间不存在");

        RoomUser existing = roomUserMapper.selectOne(
                new LambdaQueryWrapper<RoomUser>()
                        .eq(RoomUser::getRoomId, room.getId())
                        .eq(RoomUser::getUserId, dto.getUserId()));
        if (existing != null) throw new RuntimeException("你已在该房间内，座位号: " + existing.getSeatNumber());

        // 检查目标座位是否被占用
        RoomUser seatOccupied = roomUserMapper.selectOne(
                new LambdaQueryWrapper<RoomUser>()
                        .eq(RoomUser::getRoomId, room.getId())
                        .eq(RoomUser::getSeatNumber, dto.getSeatNumber()));
        if (seatOccupied != null) throw new RuntimeException("该座位已被占用");

        if (dto.getSeatNumber() < 1 || dto.getSeatNumber() > room.getMaxSeats()) {
            throw new RuntimeException("座位号不合法，有效范围 1-" + room.getMaxSeats());
        }

        RoomUser newUser = new RoomUser();
        newUser.setRoomId(room.getId());
        newUser.setUserId(dto.getUserId());
        newUser.setNickname(dto.getNickname() != null ? dto.getNickname() : "玩家");
        newUser.setSeatNumber(dto.getSeatNumber());
        roomUserMapper.insert(newUser);

        log.info("玩家加入: roomId={}, nickname={}, seat={}", room.getId(), dto.getNickname(), dto.getSeatNumber());

        RoomVO roomVO = buildRoomVO(room);
        webSocketService.broadcastToRoom(room.getId(),
                WsMessage.of(WsMessage.TYPE_JOIN_ROOM, room.getId(), roomVO));
        return roomVO;
    }

    // ==================== Skill2: 座位更换 ====================

    @Transactional
    public RoomVO changeSeat(ChangeSeatDTO dto) {
        Room room = getRoomOrThrow(dto.getRoomId());

        RoomUser currentUser = roomUserMapper.selectOne(
                new LambdaQueryWrapper<RoomUser>()
                        .eq(RoomUser::getRoomId, dto.getRoomId())
                        .eq(RoomUser::getUserId, dto.getUserId()));
        if (currentUser == null) throw new RuntimeException("你不在该房间内");

        if (dto.getTargetSeat() < 1 || dto.getTargetSeat() > room.getMaxSeats()) {
            throw new RuntimeException("座位号不合法");
        }

        RoomUser targetOccupied = roomUserMapper.selectOne(
                new LambdaQueryWrapper<RoomUser>()
                        .eq(RoomUser::getRoomId, dto.getRoomId())
                        .eq(RoomUser::getSeatNumber, dto.getTargetSeat()));
        if (targetOccupied != null) throw new RuntimeException("目标座位已被占用");

        int oldSeat = currentUser.getSeatNumber();
        currentUser.setSeatNumber(dto.getTargetSeat());
        roomUserMapper.updateById(currentUser);

        log.info("换座: roomId={}, userId={}, {} -> {}", dto.getRoomId(), dto.getUserId(), oldSeat, dto.getTargetSeat());

        RoomVO roomVO = buildRoomVO(room);
        webSocketService.broadcastToRoom(room.getId(),
                WsMessage.of(WsMessage.TYPE_CHANGE_SEAT, room.getId(), roomVO));
        return roomVO;
    }

    // ==================== Skill3: 房主转让 ====================

    @Transactional
    public RoomVO transferHost(TransferHostDTO dto) {
        Room room = getRoomOrThrow(dto.getRoomId());

        if (!room.getHostUserId().equals(dto.getFromUserId())) {
            throw new RuntimeException("仅房主可以转让房主身份");
        }

        RoomUser newHost = roomUserMapper.selectOne(
                new LambdaQueryWrapper<RoomUser>()
                        .eq(RoomUser::getRoomId, dto.getRoomId())
                        .eq(RoomUser::getUserId, dto.getToUserId()));
        if (newHost == null) throw new RuntimeException("新房主不在该房间内");
        if (dto.getFromUserId().equals(dto.getToUserId())) throw new RuntimeException("不能转让给自己");

        room.setHostUserId(dto.getToUserId());
        roomMapper.updateById(room);

        log.info("转让房主: roomId={}, from={}, to={}", dto.getRoomId(), dto.getFromUserId(), dto.getToUserId());

        RoomVO roomVO = buildRoomVO(room);
        webSocketService.broadcastToRoom(room.getId(),
                WsMessage.of(WsMessage.TYPE_TRANSFER_HOST, room.getId(), roomVO));
        return roomVO;
    }

    // ==================== 退出房间 ====================

    /**
     * 退出房间逻辑：
     * 1. 删除该用户在此房间的手牌 (user_hand)
     * 2. 删除该用户在此房间的座位记录 (room_user)
     * 3. 如果该用户是房主：按座位号顺序找下一个玩家继承房主
     * 4. 如果房间内没有其他玩家 → 清空房间所有数据 (user_hand, poker_pool, room_user, room)
     * 5. WebSocket 广播
     */
    @Transactional
    public void exitRoom(ExitRoomDTO dto) {
        Room room = roomMapper.selectById(dto.getRoomId());
        if (room == null) throw new RuntimeException("房间不存在");

        RoomUser leavingUser = roomUserMapper.selectOne(
                new LambdaQueryWrapper<RoomUser>()
                        .eq(RoomUser::getRoomId, dto.getRoomId())
                        .eq(RoomUser::getUserId, dto.getUserId()));
        if (leavingUser == null) throw new RuntimeException("你不在该房间内");

        boolean isHost = room.getHostUserId().equals(dto.getUserId());

        // 1. 删除手牌
        userHandMapper.delete(new LambdaQueryWrapper<UserHand>()
                .eq(UserHand::getRoomId, dto.getRoomId())
                .eq(UserHand::getUserId, dto.getUserId()));

        // 2. 删除座位记录
        roomUserMapper.deleteById(leavingUser.getId());

        // 3. 统计剩余玩家
        List<RoomUser> remaining = roomUserMapper.selectList(
                new LambdaQueryWrapper<RoomUser>().eq(RoomUser::getRoomId, dto.getRoomId()));

        if (remaining.isEmpty()) {
            // 4a. 房间无人 → 清空房间所有数据
            userHandMapper.delete(new LambdaQueryWrapper<UserHand>()
                    .eq(UserHand::getRoomId, dto.getRoomId()));
            pokerPoolMapper.delete(new LambdaQueryWrapper<PokerPool>()
                    .eq(PokerPool::getRoomId, dto.getRoomId()));
            roomUserMapper.delete(new LambdaQueryWrapper<RoomUser>()
                    .eq(RoomUser::getRoomId, dto.getRoomId()));
            roomMapper.deleteById(dto.getRoomId());

            log.info("房间解散: roomId={}, 所有玩家已退出", dto.getRoomId());

            RoomVO emptyVO = new RoomVO();
            emptyVO.setRoomId(dto.getRoomId());
            webSocketService.broadcastToRoom(dto.getRoomId(),
                    WsMessage.of(WsMessage.TYPE_ROOM_DISMISSED, dto.getRoomId(), emptyVO));
            return;
        }

        // 4b. 房主退出 → 按座位号找下一位继承者
        if (isHost) {
            RoomUser nextHost = remaining.stream()
                    .min(Comparator.comparingInt(RoomUser::getSeatNumber))
                    .orElseThrow();
            room.setHostUserId(nextHost.getUserId());
            roomMapper.updateById(room);
            log.info("房主退出自动转让: roomId={}, newHost={}", dto.getRoomId(), nextHost.getUserId());
        }

        log.info("玩家退出: roomId={}, userId={}, 剩余{}人", dto.getRoomId(), dto.getUserId(), remaining.size());

        // 5. WebSocket 广播
        RoomVO roomVO = buildRoomVO(room);
        webSocketService.broadcastToRoom(room.getId(),
                WsMessage.of(WsMessage.TYPE_LEAVE_ROOM, room.getId(), roomVO));
    }

    // ==================== 查询 ====================

    public RoomVO getRoomDetail(Long roomId) {
        return buildRoomVO(getRoomOrThrow(roomId));
    }

    public RoomVO getRoomByCode(String roomCode) {
        Room room = roomMapper.selectOne(
                new LambdaQueryWrapper<Room>().eq(Room::getRoomCode, roomCode));
        if (room == null) throw new RuntimeException("房间不存在");
        return buildRoomVO(room);
    }

    /**
     * 查询用户当前所在的房间（用于"返回房间"入口）
     */
    public RoomVO getMyRoom(String userId) {
        RoomUser mySeat = roomUserMapper.selectOne(
                new LambdaQueryWrapper<RoomUser>().eq(RoomUser::getUserId, userId));
        if (mySeat == null) return null;
        return buildRoomVO(getRoomOrThrow(mySeat.getRoomId()));
    }

    // ==================== 私有辅助 ====================

    private Room getRoomOrThrow(Long roomId) {
        Room room = roomMapper.selectById(roomId);
        if (room == null) throw new RuntimeException("房间不存在");
        return room;
    }

    /**
     * 构建房间VO（含座位+手牌+昵称）
     */
    RoomVO buildRoomVO(Room room) {
        RoomVO vo = new RoomVO();
        vo.setRoomId(room.getId());
        vo.setRoomCode(room.getRoomCode());
        vo.setHostUserId(room.getHostUserId());
        vo.setStatus(room.getStatus());
        vo.setCurrentSeatIndex(room.getCurrentSeatIndex());
        vo.setMaxSeats(room.getMaxSeats());
        vo.setCreatedAt(room.getCreatedAt());

        List<RoomUser> roomUsers = roomUserMapper.selectList(
                new LambdaQueryWrapper<RoomUser>().eq(RoomUser::getRoomId, room.getId()));

        List<UserHand> allHands = userHandMapper.selectList(
                new LambdaQueryWrapper<UserHand>().eq(UserHand::getRoomId, room.getId()));

        Map<String, List<String>> userCardMap = allHands.stream()
                .collect(Collectors.groupingBy(
                        UserHand::getUserId,
                        Collectors.mapping(UserHand::getCardValue, Collectors.toList())));

        Map<Integer, RoomUser> seatUserMap = roomUsers.stream()
                .collect(Collectors.toMap(RoomUser::getSeatNumber, u -> u));

        List<RoomVO.SeatVO> seats = new ArrayList<>();
        for (int seatNum = 1; seatNum <= room.getMaxSeats(); seatNum++) {
            RoomVO.SeatVO seat = new RoomVO.SeatVO();
            seat.setSeatNumber(seatNum);
            RoomUser user = seatUserMap.get(seatNum);
            if (user != null) {
                seat.setUserId(user.getUserId());
                seat.setNickname(user.getNickname() != null ? user.getNickname() : "");
                seat.setCards(userCardMap.getOrDefault(user.getUserId(), Collections.emptyList()));
            } else {
                seat.setUserId(null);
                seat.setNickname("");
                seat.setCards(Collections.emptyList());
            }
            seats.add(seat);
        }
        vo.setSeats(seats);

        return vo;
    }

    private String generateRoomCode() {
        Random random = new Random();
        String code;
        int maxAttempts = 100;
        do {
            code = String.format("%06d", random.nextInt(1_000_000));
            Long count = roomMapper.selectCount(
                    new LambdaQueryWrapper<Room>().eq(Room::getRoomCode, code));
            if (count == 0) break;
        } while (--maxAttempts > 0);
        return code;
    }
}
