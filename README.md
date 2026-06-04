# 🃏 扑克房间发牌游戏

微信小程序扑克发牌游戏 —— 房间制、逐张发牌、实时同步。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Taro 4 + React 18 + TypeScript |
| 后端 | SpringBoot 3 + Java 17 + MyBatis-Plus |
| 数据库 | MySQL 8.0 |
| 通信 | REST API + WebSocket 实时推送 |

## 项目架构

```
test4/
├── backend/                         # 后端 SpringBoot 项目
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/poker/
│       │   ├── PokerApplication.java          # 启动类
│       │   ├── config/
│       │   │   ├── WebSocketConfig.java       # WebSocket 配置
│       │   │   ├── CorsConfig.java            # 跨域配置
│       │   │   └── GlobalExceptionHandler.java # 全局异常处理
│       │   ├── entity/
│       │   │   ├── Room.java                  # 房间实体
│       │   │   ├── RoomUser.java              # 房间玩家实体
│       │   │   ├── PokerPool.java             # 牌库实体
│       │   │   └── UserHand.java              # 玩家手牌实体
│       │   ├── mapper/
│       │   │   ├── RoomMapper.java
│       │   │   ├── RoomUserMapper.java
│       │   │   ├── PokerPoolMapper.java
│       │   │   └── UserHandMapper.java
│       │   ├── dto/
│       │   │   ├── Result.java                # 统一返回封装
│       │   │   ├── WsMessage.java             # WebSocket 消息体
│       │   │   ├── RoomVO.java                # 房间视图对象
│       │   │   ├── CreateRoomDTO.java
│       │   │   ├── JoinRoomDTO.java
│       │   │   ├── ChangeSeatDTO.java
│       │   │   ├── TransferHostDTO.java
│       │   │   ├── DealCardDTO.java
│       │   │   └── ResetDTO.java
│       │   ├── service/
│       │   │   ├── RoomService.java           # 房间业务（创建/加入/换座/转让）
│       │   │   ├── PokerService.java          # 发牌业务（发牌/重置/洗牌）
│       │   │   └── WebSocketService.java      # WebSocket 广播服务
│       │   ├── controller/
│       │   │   ├── RoomController.java        # 房间 REST API
│       │   │   └── PokerController.java       # 发牌 REST API
│       │   └── websocket/
│       │       ├── PokerWebSocketHandler.java     # WebSocket 处理器
│       │       └── WebSocketSessionManager.java   # 会话管理器
│       └── resources/
│           ├── application.yml
│           └── db/init.sql                    # 数据库建表脚本
│
└── frontend/                        # 前端 Taro 小程序项目
    ├── package.json
    ├── tsconfig.json
    ├── config/
    │   └── index.ts
    └── src/
        ├── app.tsx
        ├── app.config.ts
        ├── app.scss
        ├── types/
        │   └── index.ts                       # TypeScript 类型定义
        ├── services/
        │   ├── api.ts                          # REST API 封装
        │   └── websocket.ts                    # WebSocket 连接管理
        ├── utils/
        │   └── index.ts                        # 工具函数
        ├── components/
        │   ├── SeatArea/                       # 座位布局组件
        │   ├── HandCards/                      # 手牌展示组件
        │   └── ActionButtons/                  # 操作按钮组件（含权限）
        └── pages/
            ├── index/                          # 首页 - 创建/加入房间
            └── room/                           # 房间对局主页
```

## 数据库设计

| 表名 | 说明 | 核心字段 |
|------|------|----------|
| `room` | 房间 | room_code, host_user_id, status, current_seat_index |
| `room_user` | 房间玩家 | room_id, user_id, seat_number (1-6) |
| `poker_pool` | 牌库 | room_id, card_value, card_index (1-54), dealt |
| `user_hand` | 玩家手牌 | room_id, user_id, card_value, dealt_order |

## 6大业务技能实现

### Skill1: 房间创建房主
- `POST /api/room/create` → 生成6位房间号，创建者落座1号位，成为房主

### Skill2: 座位更换
- `POST /api/room/change-seat` → 玩家换到空位，不可占用已有人座位

### Skill3: 房主转让
- `POST /api/room/transfer-host` → 房主将身份转让给房间内其他玩家

### Skill4: 逐张轮流发牌
- `POST /api/poker/deal-one` → 房主点击一次发1张，按座位号轮转

### Skill5: 全房间WebSocket同步
- `ws://host:8080/ws/poker?roomId=xxx&userId=xxx`
- 发牌/换座/转让/重置 → 全部广播全房间

### Skill6: 房主一键重置发牌
- `POST /api/poker/reset` → 清空所有手牌 → 重新54张洗牌 → 指针归位

## 快速启动

### 1. 数据库初始化
```bash
mysql -u root -p < backend/src/main/resources/db/init.sql
```

### 2. 启动后端
```bash
cd backend
mvn mvn spring-boot:run
```
服务启动在 `http://localhost:8080`

### 3. 启动前端
```bash
cd frontend
npm install
npm run dev:weapp
```
使用微信开发者工具打开 `dist/` 目录

### 4. WebSocket 测试
```
ws://localhost:8080/ws/poker?roomId=1&userId=test_user
```

## 禁用规则
1. ❌ 禁止一次性多发牌 → 房主每次点击仅单发1张
2. ❌ 普通玩家无发牌/重置/转让权限
3. ❌ 换座仅可占用空位，不可占用已落座玩家位置
