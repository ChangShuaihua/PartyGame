package com.poker.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.poker.dto.*;
import com.poker.entity.PokerPool;
import com.poker.entity.Room;
import com.poker.entity.RoomUser;
import com.poker.entity.UserHand;
import com.poker.mapper.PokerPoolMapper;
import com.poker.mapper.RoomMapper;
import com.poker.mapper.RoomUserMapper;
import com.poker.mapper.UserHandMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

/**
 * 扑克发牌核心业务服务
 * 处理发牌、洗牌、重置等逻辑
 */
@Slf4j
@Service
public class PokerService {

    private final RoomMapper roomMapper;
    private final RoomUserMapper roomUserMapper;
    private final PokerPoolMapper pokerPoolMapper;
    private final UserHandMapper userHandMapper;
    private final WebSocketService webSocketService;
    private final RoomService roomService;

    /**
     * 一副完整54张牌（52张标准 + 2张Joker）
     */
    private static final List<String> FULL_DECK = new ArrayList<>();
    static {
        String[] suits = {"♠", "♥", "♦", "♣"};
        String[] ranks = {"A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"};
        for (String suit : suits) {
            for (String rank : ranks) {
                FULL_DECK.add(rank + suit);  // e.g. "A♠", "10♥"
            }
        }
        FULL_DECK.add("小王");
        FULL_DECK.add("大王");
    }

    public PokerService(RoomMapper roomMapper,
                        RoomUserMapper roomUserMapper,
                        PokerPoolMapper pokerPoolMapper,
                        UserHandMapper userHandMapper,
                        WebSocketService webSocketService,
                        RoomService roomService) {
        this.roomMapper = roomMapper;
        this.roomUserMapper = roomUserMapper;
        this.pokerPoolMapper = pokerPoolMapper;
        this.userHandMapper = userHandMapper;
        this.webSocketService = webSocketService;
        this.roomService = roomService;
    }

    // ==================== Skill4: 逐张轮流发牌 ====================

    /**
     * 房主点击发牌，每次仅发1张给下一位玩家（按座位号顺序轮转）
     *
     * 发牌逻辑：
     * 1. 验证操作者是房主
     * 2. 获取当前发牌指针指向的座位
     * 3. 检查该座位是否有玩家（空座位跳过）
     * 4. 从牌库中取 card_index 最小且未发出的牌
     * 5. 将牌发给该座位玩家，存入 user_hand
     * 6. 指针后移（循环 1-6）
     * 7. WebSocket 广播全房间
     */
    @Transactional
    public RoomVO dealOneCard(DealCardDTO dto) {
        Room room = roomMapper.selectById(dto.getRoomId());
        if (room == null) {
            throw new RuntimeException("房间不存在");
        }

        // 1. 验证操作者是房主
        if (!room.getHostUserId().equals(dto.getHostUserId())) {
            throw new RuntimeException("仅房主可以发牌");
        }

        // 2. 初始化牌库（首次发牌时）
        initPokerPoolIfNeeded(room.getId());

        // 3. 检查是否还有剩余牌
        long remaining = pokerPoolMapper.selectCount(
                new LambdaQueryWrapper<PokerPool>()
                        .eq(PokerPool::getRoomId, room.getId())
                        .eq(PokerPool::getDealt, 0));
        if (remaining == 0) {
            throw new RuntimeException("牌已全部发完，请重置后重新发牌");
        }

        // 4. 找到当前发牌指针指向的座位上的玩家
        int currentSeat = room.getCurrentSeatIndex();
        int maxSeats = room.getMaxSeats();
        RoomUser targetUser = null;
        int attempts = 0;

        // 从当前指针开始，找下一个有人的座位（最多绕一圈）
        while (attempts < maxSeats) {
            targetUser = roomUserMapper.selectOne(
                    new LambdaQueryWrapper<RoomUser>()
                            .eq(RoomUser::getRoomId, room.getId())
                            .eq(RoomUser::getSeatNumber, currentSeat));
            if (targetUser != null) {
                break;
            }
            // 该座位无人，指针后移
            currentSeat = (currentSeat % maxSeats) + 1;
            attempts++;
        }

        if (targetUser == null) {
            throw new RuntimeException("房间内没有玩家，无法发牌");
        }

        // 5. 从牌库取下一张未发的牌（card_index 升序第一张）
        PokerPool nextCard = pokerPoolMapper.selectOne(
                new LambdaQueryWrapper<PokerPool>()
                        .eq(PokerPool::getRoomId, room.getId())
                        .eq(PokerPool::getDealt, 0)
                        .orderByAsc(PokerPool::getCardIndex)
                        .last("LIMIT 1"));

        if (nextCard == null) {
            throw new RuntimeException("没有可发的牌了");
        }

        // 6. 标记牌已发出
        nextCard.setDealt(1);
        nextCard.setDealtAt(LocalDateTime.now());
        pokerPoolMapper.updateById(nextCard);

        // 7. 记录到玩家手牌
        int dealtOrder = pokerPoolMapper.selectCount(
                new LambdaQueryWrapper<PokerPool>()
                        .eq(PokerPool::getRoomId, room.getId())
                        .eq(PokerPool::getDealt, 1)).intValue();

        UserHand hand = new UserHand();
        hand.setRoomId(room.getId());
        hand.setUserId(targetUser.getUserId());
        hand.setCardValue(nextCard.getCardValue());
        hand.setDealtOrder(dealtOrder);
        userHandMapper.insert(hand);

        log.info("发牌: roomId={}, seat={}, userId={}, card={}, dealtOrder={}",
                room.getId(), currentSeat, targetUser.getUserId(), nextCard.getCardValue(), dealtOrder);

        // 8. 指针后移到下一个座位（循环）
        int nextSeat = (currentSeat % maxSeats) + 1;
        room.setCurrentSeatIndex(nextSeat);
        room.setStatus(1);
        roomMapper.updateById(room);

        // 9. 构建房间视图（含发牌弹窗信息）+ WebSocket 广播
        RoomVO roomVO = roomService.buildRoomVO(room);
        RoomVO.DealInfo dealInfo = new RoomVO.DealInfo();
        dealInfo.setCard(nextCard.getCardValue());
        dealInfo.setToNickname(targetUser.getNickname() != null ? targetUser.getNickname() : "玩家");
        dealInfo.setSeatNumber(currentSeat);
        roomVO.setLastDeal(dealInfo);

        webSocketService.broadcastToRoom(room.getId(),
                WsMessage.of(WsMessage.TYPE_DEAL_CARD, room.getId(), roomVO));

        return roomVO;
    }

    // ==================== Skill6: 房主一键重置发牌 ====================

    /**
     * 一键重置逻辑：
     * 1. 清空所有 user_hand
     * 2. 清空 poker_pool
     * 3. 重新生成54张牌，洗牌后存入 poker_pool
     * 4. 重置发牌指针 seatIndex = 1
     * 5. 房间状态重置为等待中
     */
    @Transactional
    public RoomVO resetGame(ResetDTO dto) {
        Room room = roomMapper.selectById(dto.getRoomId());
        if (room == null) {
            throw new RuntimeException("房间不存在");
        }

        // 1. 验证操作者是房主
        if (!room.getHostUserId().equals(dto.getHostUserId())) {
            throw new RuntimeException("仅房主可以重置发牌");
        }

        // 2. 清空所有玩家手牌
        userHandMapper.delete(
                new LambdaQueryWrapper<UserHand>().eq(UserHand::getRoomId, room.getId()));

        // 3. 清空牌库
        pokerPoolMapper.delete(
                new LambdaQueryWrapper<PokerPool>().eq(PokerPool::getRoomId, room.getId()));

        // 4. 重新洗牌并存入牌库
        List<String> shuffled = new ArrayList<>(FULL_DECK);
        Collections.shuffle(shuffled);

        for (int i = 0; i < shuffled.size(); i++) {
            PokerPool card = new PokerPool();
            card.setRoomId(room.getId());
            card.setCardValue(shuffled.get(i));
            card.setCardIndex(i + 1);  // 1-54
            card.setDealt(0);
            pokerPoolMapper.insert(card);
        }

        // 5. 重置指针和状态
        room.setCurrentSeatIndex(1);
        room.setStatus(0);
        roomMapper.updateById(room);

        log.info("重置发牌: roomId={}, 牌库已重新洗牌, 54张牌就绪", room.getId());

        // 6. WebSocket 广播
        RoomVO roomVO = roomService.buildRoomVO(room);
        webSocketService.broadcastToRoom(room.getId(),
                WsMessage.of(WsMessage.TYPE_RESET, room.getId(), roomVO));

        return roomVO;
    }

    // ==================== 私有辅助 ====================

    /**
     * 首次发牌时初始化牌库（洗牌后存入）
     */
    private void initPokerPoolIfNeeded(Long roomId) {
        Long count = pokerPoolMapper.selectCount(
                new LambdaQueryWrapper<PokerPool>().eq(PokerPool::getRoomId, roomId));
        if (count == 0) {
            List<String> shuffled = new ArrayList<>(FULL_DECK);
            Collections.shuffle(shuffled);
            for (int i = 0; i < shuffled.size(); i++) {
                PokerPool card = new PokerPool();
                card.setRoomId(roomId);
                card.setCardValue(shuffled.get(i));
                card.setCardIndex(i + 1);
                card.setDealt(0);
                pokerPoolMapper.insert(card);
            }
            log.info("牌库初始化完成: roomId={}, 共54张牌（已洗牌）", roomId);
        }
    }
}
