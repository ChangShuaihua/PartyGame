package com.poker.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 房间玩家实体
 */
@Data
@TableName("room_user")
public class RoomUser {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 房间ID */
    private Long roomId;

    /** 用户ID（微信openid） */
    private String userId;

    /** 玩家昵称 */
    private String nickname;

    /** 座位号 1 到 maxSeats（房主可设，上限10） */
    private Integer seatNumber;

    /** 加入时间（由数据库 DEFAULT CURRENT_TIMESTAMP 自动填充） */
    @TableField(insertStrategy = FieldStrategy.NEVER)
    private LocalDateTime joinedAt;
}
