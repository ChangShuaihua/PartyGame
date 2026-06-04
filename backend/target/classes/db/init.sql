-- =============================================
-- 扑克房间发牌游戏 - 数据库初始化脚本
-- MySQL 8.0+
-- =============================================

CREATE DATABASE IF NOT EXISTS poker_game DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE poker_game;

-- -----------------------------------------
-- 1. 房间表 room
-- -----------------------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
    `id`                BIGINT          NOT NULL AUTO_INCREMENT  COMMENT '主键ID',
    `room_code`         VARCHAR(6)      NOT NULL                COMMENT '房间号，6位数字',
    `host_user_id`      VARCHAR(64)     NOT NULL                COMMENT '房主用户ID（微信openid）',
    `status`            TINYINT         NOT NULL DEFAULT 0      COMMENT '房间状态：0=等待中，1=发牌中',
    `current_seat_index` INT            NOT NULL DEFAULT 1      COMMENT '当前发牌座位指针(1-6)，指向下一个待发牌座位',
    `max_seats`         INT             NOT NULL DEFAULT 6      COMMENT '最大座位数',
    `created_at`        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at`        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_room_code` (`room_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='房间表';

-- -----------------------------------------
-- 2. 房间玩家表 room_user
-- -----------------------------------------
DROP TABLE IF EXISTS `room_user`;
CREATE TABLE `room_user` (
    `id`            BIGINT          NOT NULL AUTO_INCREMENT  COMMENT '主键ID',
    `room_id`       BIGINT          NOT NULL                COMMENT '房间ID',
    `user_id`       VARCHAR(64)     NOT NULL                COMMENT '用户ID（微信openid）',
    `seat_number`   INT             NOT NULL                COMMENT '座位号 1-6',
    `joined_at`     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '加入时间',
    PRIMARY KEY (`id`),
    KEY `idx_room_id` (`room_id`),
    UNIQUE KEY `uk_room_seat` (`room_id`, `seat_number`),
    UNIQUE KEY `uk_room_user` (`room_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='房间玩家表';

-- -----------------------------------------
-- 3. 牌库表 poker_pool
-- -----------------------------------------
DROP TABLE IF EXISTS `poker_pool`;
CREATE TABLE `poker_pool` (
    `id`            BIGINT          NOT NULL AUTO_INCREMENT  COMMENT '主键ID',
    `room_id`       BIGINT          NOT NULL                COMMENT '房间ID',
    `card_value`    VARCHAR(10)     NOT NULL                COMMENT '牌面值（如 A♠, 2♥, 小王, 大王）',
    `card_index`    INT             NOT NULL                COMMENT '洗牌后的顺序索引 1-54',
    `dealt`         TINYINT         NOT NULL DEFAULT 0      COMMENT '是否已发出：0=未发，1=已发',
    `dealt_at`      DATETIME        DEFAULT NULL            COMMENT '发出时间',
    PRIMARY KEY (`id`),
    KEY `idx_room_dealt` (`room_id`, `dealt`),
    KEY `idx_room_index` (`room_id`, `card_index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='房间牌库表';

-- -----------------------------------------
-- 4. 玩家手牌表 user_hand
-- -----------------------------------------
DROP TABLE IF EXISTS `user_hand`;
CREATE TABLE `user_hand` (
    `id`            BIGINT          NOT NULL AUTO_INCREMENT  COMMENT '主键ID',
    `room_id`       BIGINT          NOT NULL                COMMENT '房间ID',
    `user_id`       VARCHAR(64)     NOT NULL                COMMENT '用户ID',
    `card_value`    VARCHAR(10)     NOT NULL                COMMENT '牌面值',
    `dealt_order`   INT             NOT NULL                COMMENT '全局发牌顺序号',
    `dealt_at`      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发牌时间',
    PRIMARY KEY (`id`),
    KEY `idx_room_user` (`room_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='玩家手牌表';
