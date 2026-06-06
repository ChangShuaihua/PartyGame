import { View, Text } from '@tarojs/components';
import { SeatInfo } from '../../types';
import './index.scss';

interface Props {
  seats: SeatInfo[];
  currentUserId: string;
}

export default function ScoreBoard({ seats, currentUserId }: Props) {
  const players = seats.filter(s => s.userId !== null);

  // 按分数降序排列
  const sorted = [...players].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  return (
    <View className="score-board">
      <View className="score-board-header">
        <Text className="score-board-title">📊 计分板</Text>
        <Text className="score-board-count">{players.length} 人</Text>
      </View>
      <View className="score-board-list">
        {sorted.map((player, index) => {
          const isMe = player.userId === currentUserId;
          const score = player.score ?? 0;
          return (
            <View key={player.userId} className={`score-board-item ${isMe ? 'score-board-item--me' : ''}`}>
              <View className="score-board-rank">
                <Text className="rank-text">{index + 1}</Text>
              </View>
              <View className="score-board-info">
                <Text className="score-board-name">
                  {player.nickname || '未命名'}
                  {isMe ? ' ⭐' : ''}
                </Text>
              </View>
              <View className={`score-board-value ${score > 0 ? 'positive' : score < 0 ? 'negative' : ''}`}>
                <Text className="score-number">{score}</Text>
                <Text className="score-unit">分</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
