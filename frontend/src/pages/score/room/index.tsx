import { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import ScoreBoard from '../../../components/ScoreBoard';
import ScoreTransfer from '../../../components/ScoreTransfer';
import ScoreSummary from '../../../components/ScoreSummary';
import { getRoomDetail, transferScore, exitRoom, resetRound } from '../../../services/api';
import { wsManager } from '../../../services/websocket';
import { RoomVO, WS_TYPE } from '../../../types';
import { getCurrentUserId, showToast } from '../../../utils';
import './index.scss';

export default function ScoreRoomPage() {
  const router = useRouter();
  const { roomId: roomIdStr, roomCode: roomCodeStr, nickname: nicknameParam } = router.params;

  const roomId = Number(roomIdStr);
  const roomCode = roomCodeStr || '';
  const currentUserId = getCurrentUserId();

  const [roomData, setRoomData] = useState<RoomVO | null>(null);
  const [loading, setLoading] = useState(true);
  const [transferring, setTransferring] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  const exitingRef = useRef(false);

  const currentSeat = roomData?.seats?.find(s => s.userId === currentUserId)?.seatNumber ?? 0;
  const myScore = roomData?.seats?.find(s => s.userId === currentUserId)?.score ?? 0;

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
      if (!data.seats) return;
      console.log('[ScoreRoom] WS更新');
      setRoomData(data);
      setTransferring(false);
    };
    wsManager.on('*', handleWsMessage);

    const handleDismissed = (data: RoomVO) => {
      if (exitingRef.current) return;
      showToast('房间已解散', 'none');
      setTimeout(() => Taro.redirectTo({ url: '/pages/score/index' }), 1500);
    };
    wsManager.on(WS_TYPE.ROOM_DISMISSED, handleDismissed);

    return () => {
      wsManager.off('*', handleWsMessage);
      wsManager.off(WS_TYPE.ROOM_DISMISSED, handleDismissed);
      wsManager.disconnect();
    };
  }, [roomId]);

  // ==================== 操作处理 ====================

  const handleTransfer = useCallback(async (toUserId: string, amount: number) => {
    if (!roomId) return;
    setTransferring(true);
    try {
      const res = await transferScore(roomId, currentUserId, toUserId, amount);
      if (res.code === 200 && res.data) {
        setRoomData(res.data);
        const toName = res.data.seats.find(s => s.userId === toUserId)?.nickname || '对方';
        showToast(`已送出 ${amount} 分给 ${toName}`, 'success');
        setTransferring(false);
      } else {
        showToast(res.message || '送分失败', 'error');
        setTransferring(false);
      }
    } catch (e) {
      showToast('送分请求失败', 'error');
      setTransferring(false);
    }
  }, [roomId, currentUserId]);

  const handleEndRound = useCallback(() => {
    setShowSummary(true);
  }, []);

  const handleConfirmReset = useCallback(async () => {
    try {
      const res = await resetRound(roomId, currentUserId);
      if (res.code === 200 && res.data) {
        setRoomData(res.data);
        setShowSummary(false);
        showToast('本轮已结束，分数已重置', 'success');
      } else {
        showToast(res.message || '操作失败', 'error');
      }
    } catch (e) {
      showToast('请求失败', 'error');
    }
  }, [roomId, currentUserId]);

  const handleExitRoom = useCallback(async () => {
    if (!roomId) return;
    Taro.showModal({
      title: '确认退出', content: '确定退出房间吗？',
      success: async (modalRes) => {
        if (modalRes.confirm) {
          exitingRef.current = true;
          try {
            const res = await exitRoom(roomId, currentUserId);
            if (res.code === 200) {
              wsManager.disconnect();
              showToast('已退出房间', 'success');
              setTimeout(() => Taro.redirectTo({ url: '/pages/score/index' }), 1000);
            } else {
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
    return <View className="score-room-page"><View className="loading"><Text className="loading-text">加载中…</Text></View></View>;
  }
  if (!roomData) {
    return <View className="score-room-page"><View className="error-box"><Text className="error-text">房间数据加载失败</Text></View></View>;
  }

  const logs = roomData.scoreLogs || [];

  return (
    <View className="score-room-page">
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
        </View>
      </View>

      {/* 计分板 */}
      <ScoreBoard seats={roomData.seats} currentUserId={currentUserId} />

      {/* 送分操作 */}
      <ScoreTransfer
        seats={roomData.seats}
        currentUserId={currentUserId}
        myScore={myScore}
        onTransfer={handleTransfer}
        loading={transferring}
      />

      {/* 送分日志 */}
      <View className="log-section">
        <View className="log-header" onClick={() => setShowLogs(!showLogs)}>
          <Text className="log-title">📝 送分记录</Text>
          <Text className="log-toggle">{showLogs ? '收起' : `展开(${logs.length})`}</Text>
        </View>
        {showLogs && (
          <View className="log-list">
            {logs.length === 0 ? (
              <Text className="log-empty">暂无送分记录</Text>
            ) : (
              logs.map(log => (
                <View key={log.id} className="log-item">
                  <Text className="log-text">
                    <Text className="log-from">{log.fromNickname || '未命名'}</Text>
                    <Text className="log-arrow"> → </Text>
                    <Text className="log-to">{log.toNickname || '未命名'}</Text>
                    <Text className="log-amount"> +{log.amount}分</Text>
                  </Text>
                </View>
              ))
            )}
          </View>
        )}
      </View>

      {/* 操作按钮区 */}
      <View className="actions-section">
        {currentSeat === 1 && (
          <View className="btn-end-round" onClick={handleEndRound}>
            <Text className="btn-end-round-text">🔄 本轮结束</Text>
          </View>
        )}
        <View className="btn-exit" onClick={handleExitRoom}>
          <Text className="btn-exit-text">退出房间</Text>
        </View>
      </View>

      {/* 本轮结束汇总弹窗 */}
      {showSummary && roomData && (
        <ScoreSummary
          seats={roomData.seats}
          logs={logs}
          onClose={() => setShowSummary(false)}
          onConfirmReset={currentSeat === 1 ? handleConfirmReset : undefined}
        />
      )}
    </View>
  );
}
