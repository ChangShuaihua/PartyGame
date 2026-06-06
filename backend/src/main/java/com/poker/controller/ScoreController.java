package com.poker.controller;

import com.poker.dto.*;
import com.poker.service.ScoreService;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * 计分器 REST 控制器
 */
@Slf4j
@RestController
@RequestMapping("/api/score")
public class ScoreController {

    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    /**
     * 送分
     * POST /api/score/transfer
     */
    @PostMapping("/transfer")
    public Result<RoomVO> transferScore(@Valid @RequestBody ScoreTransferDTO dto) {
        try {
            RoomVO roomVO = scoreService.transferScore(dto);
            return Result.success(roomVO);
        } catch (Exception e) {
            log.error("送分失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 本轮结束（分数归零，清空日志）
     * POST /api/score/reset-round
     */
    @PostMapping("/reset-round")
    public Result<RoomVO> resetRound(@RequestBody ResetRoundDTO dto) {
        try {
            RoomVO roomVO = scoreService.resetRound(dto.getRoomId(), dto.getUserId());
            return Result.success(roomVO);
        } catch (Exception e) {
            log.error("本轮结束失败", e);
            return Result.error(e.getMessage());
        }
    }
}
