package com.poker.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 房间牌库实体
 */
@Data
@TableName("poker_pool")
public class PokerPool {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 房间ID */
    private Long roomId;

    /** 牌面值 */
    private String cardValue;

    /** 洗牌后的顺序索引 1-54 */
    private Integer cardIndex;

    /** 是否已发出：0=未发，1=已发 */
    private Integer dealt;

    /** 发出时间 */
    private LocalDateTime dealtAt;
}
