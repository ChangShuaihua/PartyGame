package com.poker.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * 转让房主请求
 */
@Data
public class TransferHostDTO {

    /** 房间ID */
    @NotNull(message = "房间ID不能为空")
    private Long roomId;

    /** 当前房主用户ID */
    @NotBlank(message = "当前房主ID不能为空")
    private String fromUserId;

    /** 新房主用户ID */
    @NotBlank(message = "新房主ID不能为空")
    private String toUserId;
}
