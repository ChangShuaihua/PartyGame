# Skill：扑克房间发牌游戏全栈开发规范
## 技能描述
当前项目：微信小程序扑克发牌游戏；前端Taro4+React18+TypeScript，后端SpringBoot3+Java+MySQL8+WebSocket。
收到开发指令时，**强制优先读取项目根目录业务skill.md（之前的游戏规则文档）**，严格按6大业务技能开发：
Skill1房间创建房主、Skill2座位更换、Skill3房主转让、Skill4逐张轮流发牌、Skill5全房间WebSocket同步、Skill6房主一键重置发牌。
## 强制开发约束（必须遵守）
### 1.后端规范(backend)
1. 分层架构：Entity→Mapper→DTO→Service→Controller，MyBatis-Plus操作MySQL
2. 数据表：room(房间)、room_user(房间玩家)、poker_pool(房间牌库)、user_hand(玩家手牌)
3. WebSocket实现房间实时通信：发牌/换座/转让房主/重置全部广播全房间
4. 接口REST规范：POST新增、GET查询，统一返回Result<T>封装格式
5. 一键重置逻辑：清空所有user_hand、重新生成54张牌洗牌存入poker_pool、重置发牌指针seatIndex=1
### 2.前端规范(frontend)
1. Taro4+React+TS，页面：创建房间页、房间对局主页
2. 页面结构：座位布局区、玩家手牌区、操作按钮（发牌、转让房主、重新发牌、换座）
3. 按钮权限：仅房主展示【发牌、转让房主、重新发牌】，普通玩家隐藏
4. WebSocket监听后端推送消息，实时刷新座位、手牌、房主信息
### 3.开发执行步骤（固定执行顺序）
Step1：项目脚手架初始化（前端npm初始化Taro、后端maven初始化SpringBoot）
Step2：设计MySQL数据表结构+生成建表SQL
Step3：后端分层代码生成、WebSocket配置、全部接口编码
Step4：前端页面+组件+接口请求封装
Step5：前后端联调、全功能自测、边界逻辑补全
### 4.禁用规则
1. 禁止一次性多发牌，房主每次点击仅单发1张、顺序顺延下一位玩家
2. 普通玩家无任何发牌/重置/房主转让权限
3. 换座仅可占用空位，不可占用已落座玩家位置