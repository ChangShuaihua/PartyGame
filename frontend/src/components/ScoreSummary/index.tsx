import { View, Text } from '@tarojs/components';
import { SeatInfo, ScoreLog } from '../../types';
import './index.scss';

interface Props {
  seats: SeatInfo[];
  logs: ScoreLog[];
  onClose: () => void;
  onConfirmReset?: () => void;
}

export default function ScoreSummary({ seats, logs, onClose, onConfirmReset }: Props) {
  const players = seats.filter(s => s.userId !== null);
  const sorted = [...players].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  return (
    <View className="score-summary-mask" onClick={onClose}>
      <View className="score-summary" onClick={(e) => e.stopPropagation()}>
        <Text className="summary-title">📊 本轮汇总</Text>

        {/* 最终排名 */}
        <View className="summary-section">
          <Text className="summary-section-title">最终排名</Text>
          {sorted.map((player, index) => {
            const score = player.score ?? 0;
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
            return (
              <View key={player.userId} className="summary-rank-item">
                <Text className="summary-medal">{medal}</Text>
                <Text className="summary-name">{player.nickname || '未命名'}</Text>
                <Text className={`summary-score ${score > 0 ? 'positive' : score < 0 ? 'negative' : ''}`}>
                  {score} 分
                </Text>
              </View>
            );
          })}
        </View>

        {/* 送分记录 */}
        {logs.length > 0 && (
          <View className="summary-section">
            <Text className="summary-section-title">送分记录</Text>
            {logs.map(log => (
              <View key={log.id} className="summary-log-item">
                <Text className="summary-log-text">
                  {log.fromNickname || '未命名'} → {log.toNickname || '未命名'} +{log.amount}分
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* 按钮区 */}
        <View className="summary-actions">
          {onConfirmReset && (
            <View className="btn-confirm-reset" onClick={onConfirmReset}>
              <Text className="btn-confirm-reset-text">🔄 确认结束本轮</Text>
            </View>
          )}
          <View className="btn-close" onClick={onClose}>
            <Text className="btn-close-text">关闭</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
