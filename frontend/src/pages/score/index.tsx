import { useState, useEffect } from 'react';
import { View, Text, Input, Button, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { createScoreRoom, joinRoom, getRoomByCode, getMyRoom } from '../../services/api';
import { getCurrentUserId, showToast, saveRecentRoom, getRecentRoom, clearRecentRoom } from '../../utils';
import { RoomVO } from '../../types';
import './index.scss';

export default function ScoreIndexPage() {
  const [roomCode, setRoomCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [maxSeats, setMaxSeats] = useState(6);
  const [loading, setLoading] = useState(false);
  const [myRoom, setMyRoom] = useState<RoomVO | null>(null);
  const [recentRoom, setRecentRoom] = useState(getRecentRoom());

  const userId = getCurrentUserId();

  // 页面加载时检查用户是否已有房间
  useEffect(() => {
    const checkMyRoom = async () => {
      try {
        const res = await getMyRoom(userId);
        if (res.code === 200 && res.data && res.data.roomType === 'SCORE') {
          setMyRoom(res.data);
        }
      } catch (e) { /* ignore */ }
    };
    checkMyRoom();
  }, [userId]);

  /** 跳转到计分房间 */
  const goToRoom = (roomId: number, roomCode: string, nick: string) => {
    const url = `/pages/score/room/index?roomId=${roomId}&roomCode=${roomCode}&nickname=${encodeURIComponent(nick)}`;
    saveRecentRoom({ roomId, roomCode, nickname: nick, timestamp: Date.now() });
    setRecentRoom(getRecentRoom());
    Taro.redirectTo({ url });
  };

  /** 创建计分器房间 */
  const handleCreateRoom = async () => {
    if (!nickname.trim()) {
      showToast('请先设置昵称', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await createScoreRoom(userId, maxSeats, nickname.trim());
      if (res.code === 200 && res.data) {
        const room = res.data;
        showToast(`房间创建成功！房间号: ${room.roomCode}`, 'success');
        goToRoom(room.roomId, room.roomCode, nickname.trim());
      } else {
        showToast(res.message || '创建失败', 'error');
      }
    } catch (err) {
      showToast('网络错误，请重试', 'error');
    } finally {
      setLoading(false);
    }
  };

  /** 加入房间 */
  const handleJoinRoom = async () => {
    if (!roomCode || roomCode.length !== 6) {
      showToast('请输入6位房间号', 'error');
      return;
    }
    if (!nickname.trim()) {
      showToast('请先设置昵称', 'error');
      return;
    }
    setLoading(true);
    try {
      const roomRes = await getRoomByCode(roomCode);
      if (roomRes.code !== 200 || !roomRes.data) {
        showToast('房间不存在', 'error');
        return;
      }
      const room = roomRes.data;
      const emptySeat = room.seats.find(s => !s.userId);
      if (!emptySeat) {
        showToast('房间已满', 'error');
        return;
      }
      const joinRes = await joinRoom(roomCode, userId, emptySeat.seatNumber, nickname.trim());
      if (joinRes.code === 200 && joinRes.data) {
        showToast(`加入成功！座位${emptySeat.seatNumber}`, 'success');
        goToRoom(room.roomId, roomCode, nickname.trim());
      } else if (joinRes.message && joinRes.message.includes('已在该房间内')) {
        goToRoom(room.roomId, roomCode, nickname.trim());
      } else {
        showToast(joinRes.message || '加入失败', 'error');
      }
    } catch (err) {
      showToast('网络错误，请重试', 'error');
    } finally {
      setLoading(false);
    }
  };

  /** 返回我的房间 */
  const handleBackToRoom = () => {
    if (!myRoom) return;
    goToRoom(myRoom.roomId, myRoom.roomCode, myRoom.seats.find(s => s.userId === userId)?.nickname || nickname || '');
  };

  /** 通过最近房间快速加入 */
  const handleQuickJoin = () => {
    if (!recentRoom) return;
    setRoomCode(recentRoom.roomCode);
    setNickname(recentRoom.nickname);
    clearRecentRoom();
    setRecentRoom(null);
  };

  const seatRange = Array.from({ length: 9 }, (_, i) => i + 2); // 2-10

  return (
    <View className="score-index-page">
      <View className="header">
        <Text className="title">📊 计分器</Text>
        <Text className="subtitle">创建房间，和好友一起计分</Text>
      </View>

      {/* 我的房间入口 */}
      {myRoom && (
        <View className="section my-room-section" onClick={handleBackToRoom}>
          <View className="section-header">
            <Text className="section-icon">🏠</Text>
            <Text className="section-title">返回我的计分房间</Text>
            <Text className="return-arrow">→</Text>
          </View>
          <Text className="section-desc">
            房间号 {myRoom.roomCode} · {myRoom.seats.filter(s => s.userId).length}/{myRoom.maxSeats}人
          </Text>
        </View>
      )}

      {/* 最近房间快速入口 */}
      {!myRoom && recentRoom && (
        <View className="section recent-room-section" onClick={handleQuickJoin}>
          <View className="section-header">
            <Text className="section-icon">🕐</Text>
            <Text className="section-title">上次进入的房间</Text>
          </View>
          <Text className="section-desc">
            房间号 {recentRoom.roomCode} · 昵称 {recentRoom.nickname}
          </Text>
          <Text className="recent-hint">点击自动填入</Text>
        </View>
      )}

      {/* 昵称输入 */}
      <View className="section">
        <View className="section-header">
          <Text className="section-icon">✏️</Text>
          <Text className="section-title">设置昵称</Text>
        </View>
        <Input
          className="nickname-input"
          type="text"
          maxlength={12}
          placeholder="输入你的昵称（必填）"
          placeholderClass="input-placeholder"
          value={nickname}
          onInput={(e) => setNickname(e.detail.value)}
        />
      </View>

      {/* 创建房间 */}
      <View className="section">
        <View className="section-header">
          <Text className="section-icon">🏗️</Text>
          <Text className="section-title">创建计分房间</Text>
        </View>
        <Text className="section-desc">创建房间，邀请好友一起计分</Text>

        <View className="picker-row">
          <Text className="picker-label">房间人数上限：</Text>
          <Picker
            mode="selector"
            range={seatRange}
            value={seatRange.indexOf(maxSeats)}
            onChange={(e) => setMaxSeats(seatRange[Number(e.detail.value)])}
          >
            <View className="picker-value">{maxSeats} 人</View>
          </Picker>
        </View>

        <Button className="btn-create" onClick={handleCreateRoom} loading={loading} disabled={loading}>
          创建房间
        </Button>
      </View>

      {/* 分割线 */}
      <View className="divider">
        <View className="divider-line" />
        <Text className="divider-text">或</Text>
        <View className="divider-line" />
      </View>

      {/* 加入房间 */}
      <View className="section">
        <View className="section-header">
          <Text className="section-icon">🚪</Text>
          <Text className="section-title">加入已有房间</Text>
        </View>
        <Text className="section-desc">输入6位房间号，加入好友的计分房间</Text>
        <Input
          className="room-code-input"
          type="number"
          maxlength={6}
          placeholder="请输入6位房间号"
          placeholderClass="input-placeholder"
          value={roomCode}
          onInput={(e) => setRoomCode(e.detail.value)}
        />
        <Button className="btn-join" onClick={handleJoinRoom} loading={loading} disabled={loading || roomCode.length !== 6}>
          加入房间
        </Button>
      </View>

      <View className="user-info">
        <Text className="user-label">当前用户ID:</Text>
        <Text className="user-value">{userId.slice(-8)}</Text>
      </View>
    </View>
  );
}
