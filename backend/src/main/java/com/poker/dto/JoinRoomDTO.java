package com.poker.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 * 加入房间请求
 */
@Data
public class JoinRoomDTO {

    /** 6位房间号 */
    @NotBlank(message = "房间号不能为空")
    private String roomCode;

    /** 用户ID */
    @NotBlank(message = "用户ID不能为空")
    private String userId;

    /** 玩家昵称 */
    @NotBlank(message = "昵称不能为空")
    private String nickname;

    /** 选择的座位号 */
    @NotNull(message = "座位号不能为空")
    private Integer seatNumber;
}
