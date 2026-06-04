import { View, Text } from '@tarojs/components';
import { SeatInfo } from '../../types';
import { getCardColor } from '../../utils';
import './index.scss';

interface SeatAreaProps {
  seats: SeatInfo[];
  currentUserId: string;
  hostUserId: string;
  onSeatClick?: (seatNumber: number) => void;
  disabled?: boolean;
}

/**
 * 座位布局区组件
 * 6个座位围成一圈，展示每个座位的玩家和手牌
 */
export default function SeatArea({ seats, currentUserId, hostUserId, onSeatClick, disabled }: SeatAreaProps) {
  // 座位布局位置：一圈6个位置
  //   [1]
  // [6] [2]
  // [5] [3]
  //   [4]
  const positionClass = ['', 'top', 'top-right', 'bottom-right', 'bottom', 'bottom-left', 'top-left'];

  const handleSeatClick = (seat: SeatInfo) => {
    if (disabled) return;
    if (seat.userId) return; // 已有人，不可点击（除非是换座模式）
    onSeatClick?.(seat.seatNumber);
  };

  return (
    <View className="seat-area">
      <View className="table-center">
        <Text className="table-text">🃏 牌桌</Text>
      </View>

      {seats.map((seat) => {
        const isMe = seat.userId === currentUserId;
        const isHost = seat.userId === hostUserId;
        const isEmpty = !seat.userId;
        const posClass = positionClass[seat.seatNumber] || '';

        return (
          <View
            key={seat.seatNumber}
            className={`seat seat-${posClass} ${isEmpty ? 'seat-empty' : 'seat-occupied'} ${isMe ? 'seat-me' : ''} ${disabled ? '' : 'seat-clickable'}`}
            onClick={() => handleSeatClick(seat)}
          >
            {/* 座位号 */}
            <View className="seat-number">座位{seat.seatNumber}</View>

            {isEmpty ? (
              /* 空座位 */
              <View className="seat-empty-hint">
                <Text className="empty-icon">＋</Text>
                <Text className="empty-text">空位</Text>
              </View>
            ) : (
              /* 已落座玩家 */
              <View className="seat-player">
                <View className="player-avatar">
                  {isHost && <Text className="host-badge">👑</Text>}
                  {isMe && <Text className="me-badge">⭐</Text>}
                </View>
                <Text className="player-name" style={{ fontSize: '20rpx' }}>
                  {isMe ? `我(${seat.nickname})` : seat.nickname || `座位${seat.seatNumber}`}
                </Text>

                {/* 手牌预览 */}
                {seat.cards && seat.cards.length > 0 && (
                  <View className="seat-card-preview">
                    {seat.cards.slice(-5).map((card, idx) => (
                      <Text
                        key={idx}
                        className="mini-card"
                        style={{ color: getCardColor(card), fontSize: '18rpx' }}
                      >
                        {card}
                      </Text>
                    ))}
                    {seat.cards.length > 5 && (
                      <Text className="more-cards" style={{ fontSize: '16rpx' }}>
                        +{seat.cards.length - 5}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
