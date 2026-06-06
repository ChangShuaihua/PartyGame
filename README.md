# 🎮 小华华的酒桌小游戏

微信小程序酒桌娱乐合集 —— 模块化架构，支持多种小游戏。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Taro 4 + React 18 + TypeScript |
| 后端 | SpringBoot 2.7 + Java 11 + MyBatis-Plus |
| 数据库 | MySQL 8.0 |
| 通信 | REST API + WebSocket 实时推送 |

## 娱乐模块

| 模块 | 说明 | 状态 |
|------|------|------|
| 🃏 扑克发牌 | 房间制逐张发牌，房主管理 | ✅ |
| 📊 计分器 | 无房主，送分计分，负分制 | ✅ |
| 🎲 摇骰子 | 更多游戏 | 🔜 |

## 项目架构

```
test4/
├── backend/                              # 后端 SpringBoot 项目
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/poker/
│       │   ├── PokerApplication.java
│       │   ├── config/
│       │   │   ├── WebSocketConfig.java
│       │   │   ├── CorsConfig.java
│       │   │   └── GlobalExceptionHandler.java
│       │   ├── entity/
│       │   │   ├── Room.java             # 房间（含 room_type 区分模块）
│       │   │   ├── RoomUser.java         # 房间玩家
│       │   │   ├── PokerPool.java        # 牌库（扑克模块）
│       │   │   ├── UserHand.java         # 玩家手牌（扑克模块）
│       │   │   ├── UserScore.java        # 玩家分数（计分器模块）
│       │   │   └── ScoreLog.java         # 送分日志（计分器模块）
│       │   ├── mapper/
│       │   ├── dto/
│       │   │   ├── Result.java           # 统一返回封装
│       │   │   ├── WsMessage.java        # WebSocket 消息体
│       │   │   ├── RoomVO.java           # 房间视图（含座位、手牌、分数、日志）
│       │   │   ├── CreateRoomDTO.java    # 创建房间（支持 roomType、nickname）
│       │   │   ├── ScoreTransferDTO.java # 送分请求
│       │   │   └── ResetRoundDTO.java    # 本轮结束请求
│       │   ├── service/
│       │   │   ├── RoomService.java      # 房间业务（通用，支持多模块）
│       │   │   ├── PokerService.java     # 扑克发牌业务
│       │   │   ├── ScoreService.java     # 计分器业务（送分/日志/重置）
│       │   │   └── WebSocketService.java # WebSocket 广播
│       │   ├── controller/
│       │   │   ├── RoomController.java   # 房间 REST API（通用）
│       │   │   ├── PokerController.java  # 扑克 REST API
│       │   │   └── ScoreController.java  # 计分器 REST API
│       │   └── websocket/
│       │       ├── PokerWebSocketHandler.java
│       │       └── WebSocketSessionManager.java
│       └── resources/
│           ├── application.yml
│           └── db/
│               ├── init.sql              # 全量建表脚本
│               └── migration.sql         # 增量迁移脚本
│
└── frontend/                             # 前端 Taro 小程序项目
    ├── package.json
    ├── project.config.json
    └── src/
        ├── app.tsx / app.config.ts / app.scss
        ├── types/index.ts                # TypeScript 类型定义
        ├── services/
        │   ├── api.ts                    # REST API 封装
        │   └── websocket.ts              # WebSocket 连接管理
        ├── utils/index.ts                # 工具函数
        ├── components/
        │   ├── SeatArea/                 # 座位布局（扑克模块）
        │   ├── HandCards/                # 手牌展示（扑克模块）
        │   ├── ActionButtons/            # 操作按钮（扑克模块）
        │   ├── CardRevealPopup/          # 发牌弹窗（扑克模块）
        │   ├── ScoreBoard/               # 计分板（计分器模块）
        │   ├── ScoreTransfer/            # 送分操作（计分器模块）
        │   └── ScoreSummary/             # 本轮汇总弹窗（计分器模块）
        └── pages/
            ├── home/                     # 首页 - 娱乐模块入口
            ├── poker/                    # 扑克模块
            │   ├── index/                #   创建/加入房间
            │   └── room/                 #   游戏房间
            └── score/                    # 计分器模块
                ├── index/                #   创建/加入房间
                └── room/                 #   计分房间
```

## 数据库设计

| 表名 | 说明 | 模块 |
|------|------|------|
| `room` | 房间（含 room_type 区分类型） | 通用 |
| `room_user` | 房间玩家 | 通用 |
| `poker_pool` | 牌库（54张牌） | 扑克 |
| `user_hand` | 玩家手牌 | 扑克 |
| `user_score` | 玩家分数 | 计分器 |
| `score_log` | 送分日志 | 计分器 |

## API 接口

### 通用（房间管理）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/room/create` | 创建房间（支持 roomType、nickname） |
| POST | `/api/room/join` | 加入房间 |
| POST | `/api/room/change-seat` | 换座 |
| POST | `/api/room/transfer-host` | 转让房主 |
| POST | `/api/room/exit` | 退出房间（自动清理所有数据） |
| GET | `/api/room/detail` | 房间详情 |
| GET | `/api/room/detail-by-code` | 按房间号查询 |
| GET | `/api/room/my-room` | 查询用户所在房间 |

### 扑克模块

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/poker/deal-one` | 发一张牌 |
| POST | `/api/poker/reset` | 重置发牌 |

### 计分器模块

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/score/transfer` | 送分（自己减分，对方加分，允许负分） |
| POST | `/api/score/reset-round` | 本轮结束（分数归零，清空日志） |

### WebSocket

```
ws://host:8080/ws/poker?roomId=xxx&userId=xxx
```

消息类型：`DEAL_CARD` | `CHANGE_SEAT` | `TRANSFER_HOST` | `RESET` | `JOIN_ROOM` | `LEAVE_ROOM` | `ROOM_DISMISSED` | `ROOM_UPDATE` | `SCORE_TRANSFER`

## 快速启动

### 1. 数据库初始化
```bash
mysql -u root -p < backend/src/main/resources/db/init.sql
```

### 2. 启动后端
```bash
cd backend
mvn spring-boot:run
```
服务启动在 `http://localhost:8080`

### 3. 启动前端
```bash
cd frontend
npm install
npm run dev:weapp
```
使用微信开发者工具打开 `frontend/` 目录

## 模块扩展指南

添加新游戏模块只需 4 步：

1. **后端**：如需新表，在 `init.sql` 添加；如需新 API，新建 Controller + Service
2. **前端页面**：在 `pages/` 下新建模块目录（如 `pages/dice/`）
3. **前端配置**：在 `app.config.ts` 注册页面路由
4. **首页入口**：在 `pages/home/index.tsx` 的 `MODULES` 数组中添加模块配置

房间创建时通过 `roomType` 字段区分模块类型，通用的房间管理逻辑（创建/加入/退出）由 `RoomService` 统一处理。
