import { View, Text, ScrollView } from '@tarojs/components';
import { getCardColor } from '../../utils';
import './index.scss';

interface HandCardsProps {
  cards: string[];
  title?: string;
}

/**
 * 玩家手牌区组件
 * 展示当前登录玩家的所有手牌
 */
export default function HandCards({ cards, title = '我的手牌' }: HandCardsProps) {
  if (!cards || cards.length === 0) {
    return (
      <View className="hand-cards-empty">
        <Text className="empty-title">{title}</Text>
        <Text className="empty-hint">暂无手牌，等待房主发牌…</Text>
      </View>
    );
  }

  return (
    <View className="hand-cards">
      <View className="hand-cards-header">
        <Text className="hand-title">{title}</Text>
        <Text className="hand-count">{cards.length}张</Text>
      </View>

      <ScrollView className="cards-scroll" scrollX>
        <View className="cards-list">
          {cards.map((card, index) => (
            <View
              key={index}
              className="card-item"
              style={{
                borderColor: getCardColor(card),
                transform: `rotate(${(index - cards.length / 2) * 2}deg)`,
              }}
            >
              <Text
                className="card-value"
                style={{ color: getCardColor(card) }}
              >
                {card}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
