package com.poker.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 房间实体
 */
@Data
@TableName("room")
public class Room {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 6位房间号 */
    private String roomCode;

    /** 房主用户ID */
    private String hostUserId;

    /** 房间状态：0=等待中，1=发牌中 */
    private Integer status;

    /** 当前发牌座位指针(1-6) */
    private Integer currentSeatIndex;

    /** 最大座位数，默认6 */
    private Integer maxSeats;

    /** 房间类型：POKER=扑克, SCORE=计分器 */
    private String roomType;

    /** 创建时间（由数据库 DEFAULT CURRENT_TIMESTAMP 自动填充） */
    @TableField(insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime createdAt;

    /** 更新时间（由数据库 ON UPDATE CURRENT_TIMESTAMP 自动填充） */
    @TableField(insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime updatedAt;
}
