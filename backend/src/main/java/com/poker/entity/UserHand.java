package com.poker.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 玩家手牌实体
 */
@Data
@TableName("user_hand")
public class UserHand {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 房间ID */
    private Long roomId;

    /** 用户ID */
    private String userId;

    /** 牌面值 */
    private String cardValue;

    /** 全局发牌顺序号 */
    private Integer dealtOrder;

    /** 发牌时间（由数据库 DEFAULT CURRENT_TIMESTAMP 自动填充） */
    @TableField(insertStrategy = FieldStrategy.NEVER)
    private LocalDateTime dealtAt;
}
