package com.poker.dto;

import javax.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Coze 聊天请求
 */
@Data
public class CozeChatDTO {

    /** 用户ID */
    @NotBlank(message = "用户ID不能为空")
    private String userId;

    /** 用户发送的消息 */
    @NotBlank(message = "消息不能为空")
    private String message;

    /** 会话ID（用于多轮对话，可选） */
    private String conversationId;
}
