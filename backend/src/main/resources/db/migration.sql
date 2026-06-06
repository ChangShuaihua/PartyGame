-- =============================================
-- 计分器模块 - 数据库迁移脚本
-- 在现有 poker_game 数据库上执行
-- =============================================

USE poker_game;

-- 1. room 表新增 room_type 字段
ALTER TABLE `room` ADD COLUMN `room_type` VARCHAR(20) NOT NULL DEFAULT 'POKER' COMMENT '房间类型：POKER=扑克, SCORE=计分器' AFTER `max_seats`;

-- 2. 新建玩家分数表
CREATE TABLE IF NOT EXISTS `user_score` (
    `id`            BIGINT          NOT NULL AUTO_INCREMENT  COMMENT '主键ID',
    `room_id`       BIGINT          NOT NULL                COMMENT '房间ID',
    `user_id`       VARCHAR(64)     NOT NULL                COMMENT '用户ID',
    `score`         INT             NOT NULL DEFAULT 0      COMMENT '当前分数',
    `updated_at`    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_room_user` (`room_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='玩家分数表';
