package com.poker.controller;

import com.poker.dto.*;
import com.poker.service.RoomService;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * 房间 REST 控制器
 * 处理房间创建、加入、换座、转让房主
 */
@Slf4j
@RestController
@RequestMapping("/api/room")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    /**
     * Skill1: 创建房间（创建者自动成为房主，落座1号位）
     * POST /api/room/create
     */
    @PostMapping("/create")
    public Result<RoomVO> createRoom(@Valid @RequestBody CreateRoomDTO dto) {
        try {
            RoomVO roomVO = roomService.createRoom(dto);
            return Result.success(roomVO);
        } catch (Exception e) {
            log.error("创建房间失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 加入房间
     * POST /api/room/join
     */
    @PostMapping("/join")
    public Result<RoomVO> joinRoom(@Valid @RequestBody JoinRoomDTO dto) {
        try {
            RoomVO roomVO = roomService.joinRoom(dto);
            return Result.success(roomVO);
        } catch (Exception e) {
            log.error("加入房间失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * Skill2: 更换座位（仅可占用空位）
     * POST /api/room/change-seat
     */
    @PostMapping("/change-seat")
    public Result<RoomVO> changeSeat(@Valid @RequestBody ChangeSeatDTO dto) {
        try {
            RoomVO roomVO = roomService.changeSeat(dto);
            return Result.success(roomVO);
        } catch (Exception e) {
            log.error("更换座位失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * Skill3: 转让房主
     * POST /api/room/transfer-host
     */
    @PostMapping("/transfer-host")
    public Result<RoomVO> transferHost(@Valid @RequestBody TransferHostDTO dto) {
        try {
            RoomVO roomVO = roomService.transferHost(dto);
            return Result.success(roomVO);
        } catch (Exception e) {
            log.error("转让房主失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 退出房间（删除玩家数据，房主退出自动继承，无人则解散房间）
     * POST /api/room/exit
     */
    @PostMapping("/exit")
    public Result<String> exitRoom(@Valid @RequestBody ExitRoomDTO dto) {
        try {
            roomService.exitRoom(dto);
            return Result.success("已退出房间");
        } catch (Exception e) {
            log.error("退出房间失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 查询房间详情（按房间ID）
     * GET /api/room/detail?roomId=xxx
     */
    @GetMapping("/detail")
    public Result<RoomVO> getRoomDetail(@RequestParam Long roomId) {
        try {
            RoomVO roomVO = roomService.getRoomDetail(roomId);
            return Result.success(roomVO);
        } catch (Exception e) {
            log.error("查询房间失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 查询房间详情（按房间号）
     * GET /api/room/detail-by-code?roomCode=xxxxxx
     */
    @GetMapping("/detail-by-code")
    public Result<RoomVO> getRoomByCode(@RequestParam String roomCode) {
        try {
            RoomVO roomVO = roomService.getRoomByCode(roomCode);
            return Result.success(roomVO);
        } catch (Exception e) {
            log.error("查询房间失败", e);
            return Result.error(e.getMessage());
        }
    }

    /**
     * 查询用户当前所在的房间（用于"返回房间"入口）
     * GET /api/room/my-room?userId=xxx
     */
    @GetMapping("/my-room")
    public Result<RoomVO> getMyRoom(@RequestParam String userId) {
        try {
            RoomVO roomVO = roomService.getMyRoom(userId);
            if (roomVO == null) {
                return Result.error("用户不在任何房间内");
            }
            return Result.success(roomVO);
        } catch (Exception e) {
            log.error("查询我的房间失败", e);
            return Result.error(e.getMessage());
        }
    }
}
