package com.poker.controller;

import com.poker.dto.CozeChatDTO;
import com.poker.dto.Result;
import com.poker.service.CozeService;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Coze 智能体 REST 控制器
 */
@Slf4j
@RestController
@RequestMapping("/api/coze")
public class CozeController {

    private final CozeService cozeService;

    public CozeController(CozeService cozeService) {
        this.cozeService = cozeService;
    }

    /**
     * 发送消息给智能体
     * POST /api/coze/chat
     */
    @PostMapping("/chat")
    public Result<Map<String, String>> chat(@Valid @RequestBody CozeChatDTO dto) {
        try {
            Map<String, String> result = cozeService.chat(dto.getUserId(), dto.getMessage(), dto.getConversationId());
            return Result.success(result);
        } catch (Exception e) {
            log.error("Coze聊天失败", e);
            return Result.error(e.getMessage());
        }
    }
}
