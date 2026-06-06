// ============================================
// 类型定义
// ============================================

/** 发牌弹窗信息 */
export interface DealInfo {
  toNickname: string;
  card: string;
  seatNumber: number;
}

/** 座位信息 */
export interface SeatInfo {
  seatNumber: number;
  userId: string | null;
  nickname: string;       // 玩家昵称
  cards: string[];
  score: number | null;   // 当前分数（计分器模块）
}

/** 送分日志 */
export interface ScoreLog {
  id: number;
  fromNickname: string;
  toNickname: string;
  amount: number;
  createdAt: string;
}

/** 房间详情 */
export interface RoomVO {
  roomId: number;
  roomCode: string;
  hostUserId: string;
  status: number;
  currentSeatIndex: number;
  maxSeats: number;
  roomType: string;           // POKER=扑克, SCORE=计分器
  seats: SeatInfo[];
  lastDeal: DealInfo | null;  // 最新发牌弹窗信息
  scoreLogs: ScoreLog[];      // 送分日志（计分器模块）
  createdAt: string;
}

/** 后端统一返回格式 */
export interface ApiResult<T> {
  code: number;
  message: string;
  data: T;
}

/** WebSocket 消息 */
export interface WsMessage {
  type: string;
  roomId: number;
  data: RoomVO;
}

/** 消息类型常量 */
export const WS_TYPE = {
  DEAL_CARD: 'DEAL_CARD',
  CHANGE_SEAT: 'CHANGE_SEAT',
  TRANSFER_HOST: 'TRANSFER_HOST',
  RESET: 'RESET',
  JOIN_ROOM: 'JOIN_ROOM',
  LEAVE_ROOM: 'LEAVE_ROOM',
  ROOM_DISMISSED: 'ROOM_DISMISSED',
  ROOM_UPDATE: 'ROOM_UPDATE',
  SCORE_TRANSFER: 'SCORE_TRANSFER',
} as const;
