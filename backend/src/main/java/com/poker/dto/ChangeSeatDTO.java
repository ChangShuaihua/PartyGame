package com.poker.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * 更换座位请求
 */
@Data
public class ChangeSeatDTO {

    /** 房间ID */
    @NotNull(message = "房间ID不能为空")
    private Long roomId;

    /** 用户ID */
    @NotBlank(message = "用户ID不能为空")
    private String userId;

    /** 目标座位号 1-6 */
    @NotNull(message = "目标座位号不能为空")
    private Integer targetSeat;
}
