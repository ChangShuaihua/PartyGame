package com.poker.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * 一键重置请求
 */
@Data
public class ResetDTO {

    /** 房间ID */
    @NotNull(message = "房间ID不能为空")
    private Long roomId;

    /** 房主用户ID（仅房主可重置） */
    @NotBlank(message = "房主ID不能为空")
    private String hostUserId;
}
