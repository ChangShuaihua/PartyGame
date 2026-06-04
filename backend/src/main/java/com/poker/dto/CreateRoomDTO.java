package com.poker.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 创建房间请求
 */
@Data
public class CreateRoomDTO {

    /** 用户ID（微信openid） */
    @NotBlank(message = "用户ID不能为空")
    private String userId;

    /** 最大座位数（2-10，房主自设） */
    @Min(value = 2, message = "最少2人")
    @Max(value = 10, message = "最多10人")
    private Integer maxSeats;
}
