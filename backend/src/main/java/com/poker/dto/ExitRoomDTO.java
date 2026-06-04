package com.poker.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * 退出房间请求
 */
@Data
public class ExitRoomDTO {

    /** 房间ID */
    @NotNull(message = "房间ID不能为空")
    private Long roomId;

    /** 用户ID */
    @NotBlank(message = "用户ID不能为空")
    private String userId;
}
