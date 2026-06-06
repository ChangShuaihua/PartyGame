import Taro from '@tarojs/taro';
import { ApiResult, RoomVO } from '../types';

const BASE_URL = 'http://192.168.21.33:8080';

async function request<T>(url: string, method: 'GET' | 'POST', data?: any): Promise<ApiResult<T>> {
  try {
    const res = await Taro.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: { 'Content-Type': 'application/json' },
    });
    return res.data as ApiResult<T>;
  } catch (err) {
    console.error('API请求失败:', url, err);
    throw err;
  }
}

/** 创建房间（maxSeats: 2-10） */
export function createRoom(userId: string, maxSeats: number = 6, nickname?: string) {
  return request<RoomVO>('/api/room/create', 'POST', { userId, maxSeats, nickname });
}

/** 加入房间（nickname 必填） */
export function joinRoom(roomCode: string, userId: string, seatNumber: number, nickname: string) {
  return request<RoomVO>('/api/room/join', 'POST', { roomCode, userId, seatNumber, nickname });
}

/** 查询房间详情 */
export function getRoomDetail(roomId: number) {
  return request<RoomVO>('/api/room/detail', 'GET', { roomId });
}

/** 按房间号查询 */
export function getRoomByCode(roomCode: string) {
  return request<RoomVO>('/api/room/detail-by-code', 'GET', { roomCode });
}

/** 换座 */
export function changeSeat(roomId: number, userId: string, targetSeat: number) {
  return request<RoomVO>('/api/room/change-seat', 'POST', { roomId, userId, targetSeat });
}

/** 转让房主 */
export function transferHost(roomId: number, fromUserId: string, toUserId: string) {
  return request<RoomVO>('/api/room/transfer-host', 'POST', { roomId, fromUserId, toUserId });
}

/** 退出房间 */
export function exitRoom(roomId: number, userId: string) {
  return request<string>('/api/room/exit', 'POST', { roomId, userId });
}

/** 查询用户当前所在的房间 */
export function getMyRoom(userId: string) {
  return request<RoomVO>('/api/room/my-room', 'GET', { userId });
}

/** 发一张牌 */
export function dealOneCard(roomId: number, hostUserId: string) {
  return request<RoomVO>('/api/poker/deal-one', 'POST', { roomId, hostUserId });
}

/** 一键重置 */
export function resetGame(roomId: number, hostUserId: string) {
  return request<RoomVO>('/api/poker/reset', 'POST', { roomId, hostUserId });
}

/** 创建计分器房间 */
export function createScoreRoom(userId: string, maxSeats: number = 6, nickname?: string) {
  return request<RoomVO>('/api/room/create', 'POST', { userId, maxSeats, roomType: 'SCORE', nickname });
}

/** 送分 */
export function transferScore(roomId: number, fromUserId: string, toUserId: string, amount: number) {
  return request<RoomVO>('/api/score/transfer', 'POST', { roomId, fromUserId, toUserId, amount });
}

/** 本轮结束（分数归零，清空日志） */
export function resetRound(roomId: number, userId: string) {
  return request<RoomVO>('/api/score/reset-round', 'POST', { roomId, userId });
}
