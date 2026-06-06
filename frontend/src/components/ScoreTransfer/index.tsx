import { useState } from 'react';
import { View, Text, Input, Button } from '@tarojs/components';
import { SeatInfo } from '../../types';
import './index.scss';

interface Props {
  seats: SeatInfo[];
  currentUserId: string;
  myScore: number;
  onTransfer: (toUserId: string, amount: number) => void;
  loading: boolean;
}

export default function ScoreTransfer({ seats, currentUserId, myScore, onTransfer, loading }: Props) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [amount, setAmount] = useState('');

  const otherPlayers = seats.filter(s => s.userId !== null && s.userId !== currentUserId);
  const selectedPlayer = seats.find(s => s.userId === selectedUser);
  const amountNum = parseInt(amount) || 0;

  const handleTransfer = () => {
    if (!selectedUser || amountNum <= 0) return;
    onTransfer(selectedUser, amountNum);
    setAmount('');
    setSelectedUser(null);
  };

  const canTransfer = selectedUser && amountNum > 0 && !loading;

  return (
    <View className="score-transfer">
      <View className="score-transfer-header">
        <Text className="score-transfer-title">🎁 送分</Text>
        <Text className="score-transfer-my">我的分数: <Text className="my-score-num">{myScore}</Text></Text>
      </View>

      {/* 选择目标玩家 */}
      <View className="transfer-section">
        <Text className="transfer-label">选择送给谁：</Text>
        <View className="player-chips">
          {otherPlayers.map(player => (
            <View
              key={player.userId}
              className={`player-chip ${selectedUser === player.userId ? 'player-chip--selected' : ''}`}
              onClick={() => setSelectedUser(player.userId === selectedUser ? null : player.userId)}
            >
              <Text className="player-chip-name">{player.nickname}</Text>
              <Text className="player-chip-score">{player.score ?? 0}分</Text>
            </View>
          ))}
          {otherPlayers.length === 0 && (
            <Text className="no-players">等待其他玩家加入...</Text>
          )}
        </View>
      </View>

      {/* 输入分数 */}
      {selectedUser && (
        <View className="transfer-section">
          <Text className="transfer-label">
            送给 {selectedPlayer?.nickname} 多少分？
          </Text>
          <View className="amount-row">
            <Input
              className="amount-input"
              type="number"
              placeholder="输入分数"
              placeholderClass="input-placeholder"
              value={amount}
              onInput={(e) => setAmount(e.detail.value)}
            />
            <View className="quick-amounts">
              {[1, 5, 10].map(n => (
                <View
                  key={n}
                  className={`quick-amount ${amountNum === n ? 'quick-amount--active' : ''}`}
                  onClick={() => setAmount(String(n))}
                >
                  <Text className="quick-amount-text">+{n}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* 确认按钮 */}
      {selectedUser && amountNum > 0 && (
        <Button
          className={`btn-transfer ${canTransfer ? '' : 'btn-transfer--disabled'}`}
          onClick={handleTransfer}
          loading={loading}
          disabled={!canTransfer}
        >
          确认送出 {amountNum} 分
        </Button>
      )}
    </View>
  );
}
