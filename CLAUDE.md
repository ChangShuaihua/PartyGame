# CLAUDE.md

## 项目概述

微信小程序娱乐合集，模块化架构。包含扑克发牌、计分器、日历天气、AI 情感陪伴四个模块。

## 技术栈

- **前端**: Taro 4 + React 18 + TypeScript，编译目标微信小程序
- **后端**: SpringBoot 2.7 + Java 11 + MyBatis-Plus
- **数据库**: MySQL 8.0 (poker_game)
- **通信**: REST API + WebSocket (同一端口 8080)
- **AI**: Coze 智能体 API (api.coze.cn)

## 项目结构

- `backend/` — SpringBoot 后端，`mvn spring-boot:run` 启动
- `frontend/` — Taro 前端，`npm run dev:weapp` 开发，`npm run build:weapp` 编译
- 微信开发者工具打开 `frontend/` 目录（miniprogramRoot 指向 dist/）

## 模块清单

| 模块 | 后端 | 前端 |
|------|------|------|
| 🃏 扑克发牌 | RoomController + PokerController | pages/poker/ |
| 📊 计分器 | RoomController + ScoreController | pages/score/ |
| 📅 日历天气 | 纯前端 | pages/daily/ |
| 💕 小陪(AI) | CozeController | pages/companion/ |

## 关键约定

### 后端
- 所有 API 返回 `Result<T>` 统一封装（code/message/data）
- WebSocket 仅做服务端推送，业务逻辑走 REST
- 房间通过 `room.room_type` 区分模块（POKER/SCORE）
- `RoomService` 处理通用房间逻辑（创建/加入/退出），退出时清理所有关联表（room_user, user_hand, poker_pool, user_score, score_log, room）
- 计分器模块允许负分，无房主概念
- Coze 智能体通过 `CozeService` 调用，使用 PAT Token 认证，支持多轮对话（conversationId）

### 前端
- 页面按模块组织：`pages/poker/`、`pages/score/`、`pages/daily/`、`pages/companion/`
- 首页 `pages/home/` 是模块入口，通过 `MODULES` 数组配置（id, icon, title, desc, color, available）
- WebSocket 使用全局事件监听（Taro.onSocket*），支持通配符 `*`
- 用户 ID 通过 `utils/index.ts` 的 `getCurrentUserId()` 生成并持久化
- 天气使用 wttr.in 免费 API，通过 `Taro.getLocation` 获取定位
- 日历天气和 AI 陪伴是纯前端模块，不需要后端额外建表

### 数据库
- 全量脚本：`backend/src/main/resources/db/init.sql`
- 增量迁移：`backend/src/main/resources/db/migration.sql`
- 连接：127.0.0.1:3306/poker_game, root/040929

## 常用命令

```bash
# 后端编译运行
cd backend && mvn package -DskipTests && java -jar target/poker-game-1.0.0.jar

# 前端编译
cd frontend && npm run build:weapp

# 数据库迁移（增量）
mysql -u root -p040929 < backend/src/main/resources/db/migration.sql
```

## 扩展新模块

1. 后端：如需新表建 entity/mapper，新建 Controller + Service
2. 前端：`pages/xxx/` 新建页面，`app.config.ts` 注册路由
3. 首页：`pages/home/index.tsx` 的 `MODULES` 数组添加配置
4. 房间类模块创建时传 `roomType` 区分类型
5. 纯前端模块（如日历天气）不需要后端改动
