import Taro from '@tarojs/taro';
import { WsMessage, RoomVO } from '../types';

// WebSocket 服务器地址
const WS_BASE_URL = 'ws://192.168.21.33:8080';

/** 连接超时时间（毫秒） */
const CONNECT_TIMEOUT = 10_000;

/**
 * WebSocket 连接管理器
 *
 * Taro 4 微信小程序 WebSocket 必须使用全局事件监听：
 * Taro.onSocketOpen / onSocketMessage / onSocketClose / onSocketError
 * 而不是 SocketTask 实例方法
 */
class WebSocketManager {
  private roomId: number | null = null;
  private userId: string = '';
  private listeners: Map<string, Set<(data: RoomVO) => void>> = new Map();
  private reconnectTimer: any = null;
  private heartbeatTimer: any = null;
  private connectTimer: any = null;
  private connecting: boolean = false;
  private connected: boolean = false;
  private socketOpened: boolean = false;
  private intentionalClose: boolean = false;

  // 事件处理函数引用（用于移除监听）
  private onOpenHandler: ((res: any) => void) | null = null;
  private onMessageHandler: ((res: any) => void) | null = null;
  private onCloseHandler: ((res: any) => void) | null = null;
  private onErrorHandler: ((res: any) => void) | null = null;

  /**
   * 连接到房间 WebSocket
   * Taro 4: 先注册全局事件监听，再调用 connectSocket
   */
  connect(roomId: number, userId: string) {
    // 如果已经连接到同一个房间，直接复用
    if (this.connected && this.socketOpened && this.roomId === roomId && this.userId === userId) {
      console.log('[WebSocket] 复用已有连接, roomId=%d', roomId);
      return;
    }

    // 防止并发建连
    if (this.connecting) {
      console.log('[WebSocket] 正在连接中，本次调用被忽略');
      return;
    }

    // 清理旧连接（同步：设置标志 + 移除监听器；异步：closeSocket）
    this.disconnect();

    this.roomId = roomId;
    this.userId = userId;
    this.connecting = true;
    this.intentionalClose = false;
    this.socketOpened = false;

    const url = `${WS_BASE_URL}/ws/poker?roomId=${roomId}&userId=${userId}`;
    console.log('[WebSocket] 连接中...', url);

    // 1. 注册全局事件监听
    this.onOpenHandler = (res: any) => {
      console.log('[WebSocket] 连接已打开', res);
      this.clearConnectTimeout();
      this.connecting = false;
      this.connected = true;
      this.socketOpened = true;
      this.startHeartbeat();
    };

    this.onMessageHandler = (res: any) => {
      try {
        const message: WsMessage = JSON.parse(res.data as string);
        console.log('[WebSocket] 收到消息:', message.type);
        this.handleMessage(message);
      } catch (e) {
        console.error('[WebSocket] 消息解析失败', e);
      }
    };

    this.onCloseHandler = (res: any) => {
      console.log('[WebSocket] 连接关闭', res.code, res.reason);
      this.connected = false;
      this.socketOpened = false;
      this.stopHeartbeat();
      // 仅当非主动关闭 AND 仍在同一房间时重连
      if (!this.intentionalClose && this.roomId) {
        this.scheduleReconnect();
      }
    };

    this.onErrorHandler = (err: any) => {
      console.error('[WebSocket] 连接错误', err);
      this.connected = false;
      this.socketOpened = false;
      this.stopHeartbeat();
      // 仅当非主动关闭时重连
      if (!this.intentionalClose && this.roomId) {
        this.scheduleReconnect();
      }
    };

    // 注册全局 WebSocket 事件
    Taro.onSocketOpen(this.onOpenHandler);
    Taro.onSocketMessage(this.onMessageHandler);
    Taro.onSocketClose(this.onCloseHandler);
    Taro.onSocketError(this.onErrorHandler);

    // 2. 发起连接
    Taro.connectSocket({
      url,
      success: () => {
        console.log('[WebSocket] connectSocket 调用成功');
      },
      fail: (err) => {
        console.error('[WebSocket] connectSocket 调用失败', err);
        this.clearConnectTimeout();
        this.connecting = false;
        this.scheduleReconnect();
      },
    });

    // 3. 连接超时兜底：防止 onOpen 丢失导致 connecting 永久为 true
    this.connectTimer = setTimeout(() => {
      if (this.connecting) {
        console.warn('[WebSocket] 连接超时(%dms)，强制重置状态', CONNECT_TIMEOUT);
        this.connecting = false;
      }
    }, CONNECT_TIMEOUT);
  }

  /**
   * 断开连接（同步清理状态 + 异步关闭 Socket）
   * 主动关闭时会设置 intentionalClose 标记，防止 onClose 触发自动重连
   */
  disconnect() {
    // 1. 先标记为主动关闭——即使 onCloseHandler 已在事件队列中也会跳过重连
    this.intentionalClose = true;

    // 2. 清理定时器
    this.stopHeartbeat();
    this.clearReconnect();
    this.clearConnectTimeout();

    // 3. 保存关闭前的连接状态，然后更新
    const wasOpened = this.socketOpened;
    this.connected = false;
    this.socketOpened = false;

    // 4. 移除全局事件监听（部分 Taro 版本未提供 offSocket* 方法，做兼容处理）
    try {
      if (this.onOpenHandler) {
        if (typeof Taro.offSocketOpen === 'function') Taro.offSocketOpen(this.onOpenHandler);
      }
    } catch (e) { /* ignore */ }
    try {
      if (this.onMessageHandler) {
        if (typeof Taro.offSocketMessage === 'function') Taro.offSocketMessage(this.onMessageHandler);
      }
    } catch (e) { /* ignore */ }
    try {
      if (this.onCloseHandler) {
        if (typeof Taro.offSocketClose === 'function') Taro.offSocketClose(this.onCloseHandler);
      }
    } catch (e) { /* ignore */ }
    try {
      if (this.onErrorHandler) {
        if (typeof Taro.offSocketError === 'function') Taro.offSocketError(this.onErrorHandler);
      }
    } catch (e) { /* ignore */ }
    // 无论卸载是否成功，都清空引用，防止被复用
    this.onOpenHandler = null;
    this.onMessageHandler = null;
    this.onCloseHandler = null;
    this.onErrorHandler = null;

    // 5. 仅当 Socket 确实打开过才关闭（避免"not connected"报错）
    if (wasOpened) {
      try {
        Taro.closeSocket({});
      } catch (e) { /* ignore */ }
    }

    // 6. 最后清空房间信息、释放连接锁
    this.roomId = null;
    this.connecting = false;
  }

  /**
   * 注册消息监听
   * @param type 消息类型，传 '*' 监听所有
   * @param callback 回调函数
   */
  on(type: string, callback: (data: RoomVO) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(callback);
  }

  /**
   * 取消监听
   */
  off(type: string, callback: (data: RoomVO) => void) {
    const cbs = this.listeners.get(type);
    if (cbs) {
      cbs.delete(callback);
    }
  }

  /**
   * 处理收到的 WebSocket 消息
   */
  private handleMessage(message: WsMessage) {
    const roomData: RoomVO = message.data;

    // 触发特定类型监听
    const typeCallbacks = this.listeners.get(message.type);
    if (typeCallbacks) {
      typeCallbacks.forEach(cb => cb(roomData));
    }

    // 触发通配符监听（* 匹配所有类型）
    const allCallbacks = this.listeners.get('*');
    if (allCallbacks) {
      allCallbacks.forEach(cb => cb(roomData));
    }
  }

  /**
   * 心跳保活：每 30 秒发送 PING
   */
  private startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.connected) {
        Taro.sendSocketMessage({
          data: JSON.stringify({ type: 'PING' }),
          fail: () => {
            console.warn('[WebSocket] 心跳发送失败');
          },
        });
      }
    }, 30000);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  /**
   * 断线重连：5 秒后自动重连
   */
  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    console.log('[WebSocket] 5秒后尝试重连...');
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (this.roomId && this.userId) {
        console.log('[WebSocket] 正在重连...');
        this.connect(this.roomId, this.userId);
      }
    }, 5000);
  }

  private clearReconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private clearConnectTimeout() {
    if (this.connectTimer) {
      clearTimeout(this.connectTimer);
      this.connectTimer = null;
    }
  }
}

// 导出单例
export const wsManager = new WebSocketManager();
