import { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import SeatArea from '../../../components/SeatArea';
import HandCards from '../../../components/HandCards';
import ActionButtons from '../../../components/ActionButtons';
import CardRevealPopup from '../../../components/CardRevealPopup';
import {
  getRoomDetail, changeSeat, transferHost,
  dealOneCard, resetGame, exitRoom,
} from '../../../services/api';
import { wsManager } from '../../../services/websocket';
import { RoomVO, DealInfo, WS_TYPE } from '../../../types';
import { getCurrentUserId, showToast } from '../../../utils';
import './index.scss';

export default function PokerRoomPage() {
  const router = useRouter();
  const { roomId: roomIdStr, roomCode: roomCodeStr, nickname: nicknameParam } = router.params;

  const roomId = Number(roomIdStr);
  const roomCode = roomCodeStr || '';
  const myNickname = decodeURIComponent(nicknameParam || '');
  const currentUserId = getCurrentUserId();

  const [roomData, setRoomData] = useState<RoomVO | null>(null);
  const [loading, setLoading] = useState(true);
  const [dealing, setDealing] = useState(false);
  const [popupDeal, setPopupDeal] = useState<DealInfo | null>(null);

  // 标记用户是否已主动退出，防止 ROOM_DISMISSED 回调重复 navigateBack
  const exitingRef = useRef(false);

  const isHost = roomData?.hostUserId === currentUserId;
  const currentSeat = roomData?.seats?.find(s => s.userId === currentUserId)?.seatNumber ?? 0;
  const myCards: string[] = roomData?.seats?.find(s => s.userId === currentUserId)?.cards ?? [];

  // ==================== 初始化 ====================
  useEffect(() => {
    if (!roomId) return;

    const loadRoom = async () => {
      try {
        const res = await getRoomDetail(roomId);
        if (res.code === 200 && res.data) {
          setRoomData(res.data);
        }
      } catch (e) { /* ignore */ }
      finally { setLoading(false); }
    };
    loadRoom();

    wsManager.connect(roomId, currentUserId);

    const handleWsMessage = (data: RoomVO) => {
      // ROOM_DISMISSED 等消息的 data 不完整（seats 为 null），跳过以免渲染崩溃
      if (!data.seats) return;
      console.log('[Room] WS更新');
      setRoomData(data);
      setDealing(false);

      // 如果有发牌弹窗信息，展示弹窗
      if (data.lastDeal) {
        setPopupDeal(data.lastDeal);
        setTimeout(() => setPopupDeal(null), 5000);
      }
    };
    wsManager.on('*', handleWsMessage);

    // 监听房间解散
    const handleDismissed = (data: RoomVO) => {
      // 如果用户已主动退出，跳过（避免重复跳转）
      if (exitingRef.current) return;
      showToast('房间已解散', 'none');
      setTimeout(() => Taro.redirectTo({ url: '/pages/poker/index' }), 1500);
    };
    wsManager.on(WS_TYPE.ROOM_DISMISSED, handleDismissed);

    return () => {
      wsManager.off('*', handleWsMessage);
      wsManager.off(WS_TYPE.ROOM_DISMISSED, handleDismissed);
      wsManager.disconnect();
    };
  }, [roomId]);

  // ==================== 操作处理 ====================

  const handleDealCard = useCallback(async () => {
    if (!roomId || !isHost) { showToast('仅房主可以发牌', 'error'); return; }
    setDealing(true);
    try {
      const res = await dealOneCard(roomId, currentUserId);
      if (res.code === 200 && res.data) {
        setRoomData(res.data);
        // 展示弹窗
        if (res.data.lastDeal) {
          setPopupDeal(res.data.lastDeal);
          setTimeout(() => setPopupDeal(null), 5000);
        }
        setDealing(false);
      } else {
        showToast(res.message || '发牌失败', 'error');
        setDealing(false);
      }
    } catch (e) { showToast('发牌请求失败', 'error'); setDealing(false); }
  }, [roomId, isHost, currentUserId]);

  const handleReset = useCallback(async () => {
    if (!roomId || !isHost) { showToast('仅房主可以重置', 'error'); return; }
    Taro.showModal({
      title: '确认重置', content: '将清空所有手牌并重新洗牌，确定继续？',
      success: async (modalRes) => {
        if (modalRes.confirm) {
          try {
            const res = await resetGame(roomId, currentUserId);
            if (res.code === 200 && res.data) { setRoomData(res.data); showToast('已重置', 'success'); }
            else showToast(res.message || '重置失败', 'error');
          } catch (e) { showToast('重置请求失败', 'error'); }
        }
      },
    });
  }, [roomId, isHost, currentUserId]);

  const handleTransferHost = useCallback(async (toUserId: string) => {
    if (!roomId || !isHost) { showToast('仅房主可以转让', 'error'); return; }
    Taro.showModal({
      title: '确认转让房主', content: '确定将房主转让给该玩家吗？',
      success: async (modalRes) => {
        if (modalRes.confirm) {
          try {
            const res = await transferHost(roomId, currentUserId, toUserId);
            if (res.code === 200 && res.data) { setRoomData(res.data); showToast('房主已转让', 'success'); }
            else showToast(res.message || '转让失败', 'error');
          } catch (e) { showToast('转让请求失败', 'error'); }
        }
      },
    });
  }, [roomId, isHost, currentUserId]);

  const handleChangeSeat = useCallback(async (targetSeat: number) => {
    if (!roomId) return;
    try {
      const res = await changeSeat(roomId, currentUserId, targetSeat);
      if (res.code === 200 && res.data) { setRoomData(res.data); showToast(`已换到座位${targetSeat}`, 'success'); }
      else showToast(res.message || '换座失败', 'error');
    } catch (e) { showToast('换座请求失败', 'error'); }
  }, [roomId, currentUserId]);

  const handleExitRoom = useCallback(async () => {
    if (!roomId) return;
    Taro.showModal({
      title: '确认退出', content: '确定退出房间吗？退出后将清理你的相关数据。',
      success: async (modalRes) => {
        if (modalRes.confirm) {
          // 先标记正在退出，防止 handleDismissed 重复 navigateBack
          exitingRef.current = true;
          try {
            const res = await exitRoom(roomId, currentUserId);
            if (res.code === 200) {
              // 先主动断开 WebSocket（设置 intentionalClose 标记，防止后续重连）
              wsManager.disconnect();
              showToast('已退出房间', 'success');
              setTimeout(() => Taro.redirectTo({ url: '/pages/poker/index' }), 1000);
            } else {
              // API 失败，重置退出标记
              exitingRef.current = false;
              showToast(res.message || '退出失败', 'error');
            }
          } catch (e) {
            exitingRef.current = false;
            showToast('退出请求失败', 'error');
          }
        }
      },
    });
  }, [roomId, currentUserId]);

  // ==================== 渲染 ====================
  if (loading) {
    return <View className="room-page"><View className="loading"><Text className="loading-text">加载中…</Text></View></View>;
  }
  if (!roomData) {
    return <View className="room-page"><View className="error-box"><Text className="error-text">房间数据加载失败</Text></View></View>;
  }

  return (
    <View className="room-page">
      {/* 顶部信息栏 */}
      <View className="room-header">
        <View className="room-info">
          <Text className="room-code-label">房间号</Text>
          <Text className="room-code" selectable>{roomData.roomCode}</Text>
        </View>
        <View className="room-stats">
          <Text className="stat-item">
            👥 {roomData.seats.filter(s => s.userId).length}/{roomData.maxSeats}
          </Text>
          <Text className="stat-item">{roomData.status === 1 ? '发牌中' : '等待中'}</Text>
        </View>
        <View className="host-info">
          {isHost ? <Text className="host-badge-text">👑 房主</Text> : <Text className="normal-text">📍 座位{currentSeat}</Text>}
        </View>
      </View>

      {/* 座位 */}
      <SeatArea seats={roomData.seats} currentUserId={currentUserId} hostUserId={roomData.hostUserId} disabled />

      {/* 我的手牌 */}
      <HandCards cards={myCards} title={`${myNickname}的手牌`} />

      {/* 操作按钮 */}
      <ActionButtons
        isHost={isHost}
        seats={roomData.seats}
        currentUserId={currentUserId}
        currentSeat={currentSeat}
        onDealCard={handleDealCard}
        onReset={handleReset}
        onTransferHost={handleTransferHost}
        onChangeSeat={handleChangeSeat}
        onExitRoom={handleExitRoom}
        dealing={dealing}
      />

      {/* 发牌弹窗 */}
      {popupDeal && <CardRevealPopup dealInfo={popupDeal} onClose={() => setPopupDeal(null)} />}

      {/* 底部 */}
      <View className="room-footer">
        <Text className="footer-text">当前发牌指针 → 座位{roomData.currentSeatIndex}</Text>
      </View>
    </View>
  );
}
