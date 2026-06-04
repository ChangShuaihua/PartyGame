import { View, Text } from '@tarojs/components';
import { DealInfo } from '../../types';
import { getCardColor, getCardMeaning } from '../../utils';
import './index.scss';

interface CardRevealPopupProps {
  dealInfo: DealInfo;
  onClose: () => void;
}

/**
 * 发牌弹窗组件
 * 显示：哪位玩家获得了哪张牌
 * 3 秒后自动消失，也可点击关闭
 */
export default function CardRevealPopup({ dealInfo, onClose }: CardRevealPopupProps) {
  return (
    <View className="card-popup-overlay" onClick={onClose}>
      <View className="card-popup" onClick={(e) => e.stopPropagation()}>
        <Text className="popup-title">🎴 发牌结果</Text>

        <View className="popup-card-display">
          <Text
            className="popup-card-value"
            style={{ color: getCardColor(dealInfo.card) }}
          >
            {dealInfo.card}
          </Text>
        </View>

        <Text className="popup-card-meaning">
          {getCardMeaning(dealInfo.card)}
        </Text>

        <Text className="popup-receiver">
          {dealInfo.toNickname}
        </Text>
        <Text className="popup-seat">
          座位 {dealInfo.seatNumber}
        </Text>

        <View className="popup-close-btn" onClick={onClose}>
          <Text className="popup-close-text">知道了</Text>
        </View>
      </View>
    </View>
  );
}
