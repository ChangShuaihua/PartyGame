# CLAUDE.md

## 项目概述

微信小程序酒桌娱乐合集，模块化架构。当前包含扑克发牌和计分器两个模块。

## 技术栈

- **前端**: Taro 4 + React 18 + TypeScript，编译目标微信小程序
- **后端**: SpringBoot 2.7 + Java 11 + MyBatis-Plus
- **数据库**: MySQL 8.0 (poker_game)
- **通信**: REST API + WebSocket (同一端口 8080)

## 项目结构

- `backend/` — SpringBoot 后端，`mvn spring-boot:run` 启动
- `frontend/` — Taro 前端，`npm run dev:weapp` 开发，`npm run build:weapp` 编译
- 微信开发者工具打开 `frontend/` 目录（miniprogramRoot 指向 dist/）

## 关键约定

### 后端
- 所有 API 返回 `Result<T>` 统一封装（code/message/data）
- WebSocket 仅做服务端推送，业务逻辑走 REST
- 房间通过 `room.room_type` 区分模块（POKER/SCORE）
- `RoomService` 处理通用房间逻辑（创建/加入/退出），退出时清理所有关联表
- 计分器模块允许负分，无房主概念

### 前端
- 页面按模块组织：`pages/poker/`、`pages/score/`
- 首页 `pages/home/` 是模块入口，通过 `MODULES` 数组配置
- WebSocket 使用全局事件监听（Taro.onSocket*），支持通配符 `*`
- 用户 ID 通过 `utils/index.ts` 的 `getCurrentUserId()` 生成并持久化

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
4. 房间创建时传 `roomType` 区分类型
