package com.poker.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * 发牌请求
 */
@Data
public class DealCardDTO {

    /** 房间ID */
    @NotNull(message = "房间ID不能为空")
    private Long roomId;

    /** 房主用户ID（仅房主可发牌） */
    @NotBlank(message = "房主ID不能为空")
    private String hostUserId;
}
