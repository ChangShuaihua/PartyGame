package com.poker.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * 送分请求
 */
@Data
public class ScoreTransferDTO {

    /** 房间ID */
    @NotNull(message = "房间ID不能为空")
    private Long roomId;

    /** 送分用户ID */
    @NotBlank(message = "用户ID不能为空")
    private String fromUserId;

    /** 收分用户ID */
    @NotBlank(message = "目标用户ID不能为空")
    private String toUserId;

    /** 送分数量（正整数） */
    @NotNull(message = "分数不能为空")
    @Min(value = 1, message = "最少送1分")
    private Integer amount;
}
