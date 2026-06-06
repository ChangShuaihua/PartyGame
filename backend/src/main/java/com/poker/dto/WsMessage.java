package com.poker.dto;

import lombok.Data;

/**
 * WebSocket 广播消息体
 */
@Data
public class WsMessage {

    /** 消息类型 */
    private String type;

    /** 房间ID */
    private Long roomId;

    /** 消息数据 */
    private Object data;

    public static WsMessage of(String type, Long roomId, Object data) {
        WsMessage msg = new WsMessage();
        msg.type = type;
        msg.roomId = roomId;
        msg.data = data;
        return msg;
    }

    // ===== 消息类型常量 =====
    public static final String TYPE_DEAL_CARD      = "DEAL_CARD";       // 发牌
    public static final String TYPE_CHANGE_SEAT    = "CHANGE_SEAT";     // 换座
    public static final String TYPE_TRANSFER_HOST  = "TRANSFER_HOST";   // 转让房主
    public static final String TYPE_RESET          = "RESET";           // 重置发牌
    public static final String TYPE_JOIN_ROOM      = "JOIN_ROOM";       // 加入房间
    public static final String TYPE_LEAVE_ROOM     = "LEAVE_ROOM";      // 离开房间
    public static final String TYPE_ROOM_DISMISSED = "ROOM_DISMISSED";  // 房间已解散
    public static final String TYPE_ROOM_UPDATE    = "ROOM_UPDATE";     // 房间全量刷新
    public static final String TYPE_SCORE_TRANSFER = "SCORE_TRANSFER";  // 送分
}
