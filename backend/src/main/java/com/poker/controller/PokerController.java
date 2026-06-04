package com.poker.controller;

import com.poker.dto.*;
import com.poker.service.PokerService;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * 发牌 REST 控制器
 * 处理发牌、重置
 */
@Slf4j
@RestController
@RequestMapping("/api/poker")
public class PokerController {

    private final PokerService pokerService;

    public PokerController(PokerService pokerService) {
        this.pokerService = pokerService;
    }

    /**
     * Skill4: 逐张轮流发牌（房主每次点击仅发1张）
     * POST /api/poker/deal-one
     */
    @PostMapping("/deal-one")
    public Result<RoomVO> dealOneCard(@Valid @RequestBody DealCardDTO dto) {
        try {
            RoomVO roomVO = pokerService.dealOneCard(dto);
            return Result.success(roomVO);
        } catch (Exception e) {
            log.error("发牌失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * Skill6: 房主一键重置发牌
     * POST /api/poker/reset
     */
    @PostMapping("/reset")
    public Result<RoomVO> resetGame(@Valid @RequestBody ResetDTO dto) {
        try {
            RoomVO roomVO = pokerService.resetGame(dto);
            return Result.success(roomVO);
        } catch (Exception e) {
            log.error("重置失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 查询房间剩余牌数
     * GET /api/poker/remaining?roomId=xxx
     */
    @GetMapping("/remaining")
    public Result<Long> getRemainingCards(@RequestParam Long roomId) {
        try {
            // 由 service 层统一提供，这里简单返回
            return Result.success(null);
        } catch (Exception e) {
            log.error("查询剩余牌数失败", e);
            return Result.error(e.getMessage());
        }
    }
}
