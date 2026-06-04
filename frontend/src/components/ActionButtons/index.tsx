import { View, Text, Button } from '@tarojs/components';
import { SeatInfo } from '../../types';
import './index.scss';

interface ActionButtonsProps {
  isHost: boolean;
  seats: SeatInfo[];
  currentUserId: string;
  currentSeat: number;
  onDealCard: () => void;
  onReset: () => void;
  onTransferHost: (toUserId: string) => void;
  onChangeSeat: (targetSeat: number) => void;
  onExitRoom: () => void;
  dealing: boolean;
}

export default function ActionButtons({
  isHost, seats, currentUserId, currentSeat,
  onDealCard, onReset, onTransferHost, onChangeSeat, onExitRoom, dealing,
}: ActionButtonsProps) {

  const transferTargets = seats.filter(s => s.userId && s.userId !== currentUserId);
  const emptySeats = seats.filter(s => !s.userId && s.seatNumber !== currentSeat);

  return (
    <View className="action-buttons">

      {/* 房主专属 */}
      {isHost && (
        <View className="host-actions">
          <View className="action-label">👑 房主操作</View>
          <Button className="btn btn-primary" onClick={onDealCard} disabled={dealing}>
            🃏 发一张牌
          </Button>

          {transferTargets.length > 0 && (
            <View className="transfer-group">
              <Text className="group-label">转让房主给：</Text>
              <View className="transfer-list">
                {transferTargets.map((target) => (
                  <Button key={target.seatNumber} className="btn btn-transfer btn-sm"
                    onClick={() => onTransferHost(target.userId!)}>
                    {target.nickname || `座位${target.seatNumber}`}
                  </Button>
                ))}
              </View>
            </View>
          )}

          <Button className="btn btn-danger" onClick={onReset}>
            🔄 重新发牌（重置）
          </Button>
        </View>
      )}

      {/* 换座 */}
      {emptySeats.length > 0 && (
        <View className="player-actions">
          <View className="action-label">🚶 换座</View>
          <View className="seat-change-list">
            {emptySeats.map((s) => (
              <Button key={s.seatNumber} className="btn btn-outline btn-sm"
                onClick={() => onChangeSeat(s.seatNumber)}>
                换到座位{s.seatNumber}
              </Button>
            ))}
          </View>
        </View>
      )}

      {!isHost && emptySeats.length === 0 && (
        <View className="no-actions">
          <Text className="no-actions-text">等待房主发牌…</Text>
        </View>
      )}

      {/* 退出房间按钮（所有人可见） */}
      <View className="exit-section">
        <View className="exit-divider" />
        <Button className="btn btn-exit" onClick={onExitRoom}>
          🚪 退出房间
        </Button>
      </View>
    </View>
  );
}
