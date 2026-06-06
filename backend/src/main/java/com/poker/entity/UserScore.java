package com.poker.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 玩家分数实体（计分器模块）
 */
@Data
@TableName("user_score")
public class UserScore {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 房间ID */
    private Long roomId;

    /** 用户ID */
    private String userId;

    /** 当前分数 */
    private Integer score;

    /** 更新时间（由数据库 ON UPDATE CURRENT_TIMESTAMP 自动填充） */
    @TableField(insertStrategy = FieldStrategy.NEVER, updateStrategy = FieldStrategy.NEVER)
    private LocalDateTime updatedAt;
}
