package com.poker.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 房间详情视图对象
 */
@Data
public class RoomVO {

    /** 房间ID */
    private Long roomId;

    /** 房间号 */
    private String roomCode;

    /** 房主用户ID */
    private String hostUserId;

    /** 房间状态 */
    private Integer status;

    /** 当前发牌座位指针 */
    private Integer currentSeatIndex;

    /** 最大座位数 */
    private Integer maxSeats;

    /** 座位列表 */
    private List<SeatVO> seats;

    /** 上次发牌信息（用于弹窗） */
    private DealInfo lastDeal;

    /** 创建时间 */
    private LocalDateTime createdAt;

    /**
     * 座位视图
     */
    @Data
    public static class SeatVO {
        /** 座位号 */
        private Integer seatNumber;
        /** 座位上的用户ID，null表示空位 */
        private String userId;
        /** 玩家昵称 */
        private String nickname;
        /** 该用户的手牌列表 */
        private List<String> cards;
    }

    /**
     * 发牌弹窗信息
     */
    @Data
    public static class DealInfo {
        /** 发给谁 */
        private String toNickname;
        /** 什么牌 */
        private String card;
        /** 座位号 */
        private Integer seatNumber;
    }
}
