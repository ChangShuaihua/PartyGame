package com.poker.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 送分日志实体（计分器模块）
 */
@Data
@TableName("score_log")
public class ScoreLog {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 房间ID */
    private Long roomId;

    /** 送分用户ID */
    private String fromUserId;

    /** 送分用户昵称 */
    private String fromNickname;

    /** 收分用户ID */
    private String toUserId;

    /** 收分用户昵称 */
    private String toNickname;

    /** 送分数量 */
    private Integer amount;

    /** 送分时间（由数据库 DEFAULT CURRENT_TIMESTAMP 自动填充） */
    @TableField(insertStrategy = FieldStrategy.NEVER)
    private LocalDateTime createdAt;
}
