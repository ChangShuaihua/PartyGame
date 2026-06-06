package com.poker.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * 本轮结束请求
 */
@Data
public class ResetRoundDTO {

    /** 房间ID */
    @NotNull(message = "房间ID不能为空")
    private Long roomId;

    /** 操作用户ID */
    @NotBlank(message = "用户ID不能为空")
    private String userId;
}
