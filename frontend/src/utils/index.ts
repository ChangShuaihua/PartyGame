import Taro from '@tarojs/taro';

/**
 * 获取当前用户ID（模拟微信openid）
 * 实际项目中通过 Taro.login() 获取 code，再通过后端换取 openid
 */
export function getCurrentUserId(): string {
  // 先用本地存储的ID，没有则生成临时ID
  let userId = '';
  try {
    userId = Taro.getStorageSync('poker_user_id') || '';
  } catch (e) {
    /* ignore */
  }
  if (!userId) {
    userId = 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
    try {
      Taro.setStorageSync('poker_user_id', userId);
    } catch (e) {
      /* ignore */
    }
  }
  return userId;
}

/**
 * Toast 提示
 */
export function showToast(title: string, icon: 'success' | 'error' | 'none' = 'none') {
  Taro.showToast({ title, icon, duration: 2000 });
}

/**
 * 牌面颜色（红心/方块=红色，黑桃/梅花=黑色，Joker=红色）
 */
export function getCardColor(card: string): string {
  if (card === '小王' || card === '大王') {
    return '#e74c3c'; // Joker 红色
  }
  if (card.includes('♥') || card.includes('♦')) {
    return '#e74c3c'; // 红色花色
  }
  return '#2c3e50'; // 黑色花色
}

/**
 * 格式化牌面显示
 */
export function formatCard(card: string): string {
  return card;
}

/** 牌面含义映射表 */
const CARD_MEANING_MAP: Record<string, string> = {
  '大王': '挡酒牌 🛡️',
  '小王': '挡酒牌 🛡️',
  'A': '命令牌 👉',
  '2': '小姐牌 👩',
  '3': '逛三园牌 🌳',
  '4': '挑战牌 ⚔️',
  '5': '照相机牌 📷',
  '6': '柳树扭扭牌 🌿',
  '7': '逢7过牌 🔢',
  '8': '厕所牌 🚻',
  '9': '自罚牌 🍺',
  '10': '神经病牌 🤪',
  'J': '左边喝牌 👈',
  'Q': '右边喝牌 👉',
  'K': '定量牌 📏',
};

/**
 * 根据牌面获取酒桌游戏含义
 */
export function getCardMeaning(card: string): string {
  let rank: string;
  if (card === '大王' || card === '小王') {
    rank = card;
  } else {
    // 去掉末尾花色符号，如 "A♠" → "A", "10♥" → "10"
    rank = card.slice(0, -1);
  }
  return CARD_MEANING_MAP[rank] || '';
}

/** 最近房间缓存结构 */
export interface RecentRoom {
  roomId: number;
  roomCode: string;
  nickname: string;
  timestamp: number;
}

const RECENT_ROOM_KEY = 'poker_recent_room';

/** 保存最近进入的房间信息 */
export function saveRecentRoom(room: RecentRoom) {
  try {
    Taro.setStorageSync(RECENT_ROOM_KEY, JSON.stringify(room));
  } catch (e) { /* ignore */ }
}

/** 读取最近进入的房间信息 */
export function getRecentRoom(): RecentRoom | null {
  try {
    const raw = Taro.getStorageSync(RECENT_ROOM_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as RecentRoom;
  } catch (e) {
    return null;
  }
}

/** 清除最近房间记录 */
export function clearRecentRoom() {
  try {
    Taro.removeStorageSync(RECENT_ROOM_KEY);
  } catch (e) { /* ignore */ }
}
