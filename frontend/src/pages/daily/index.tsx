import { View, Text } from '@tarojs/components';
import Weather from '../../components/Weather';
import Calendar from '../../components/Calendar';
import './index.scss';

export default function DailyPage() {
  const now = new Date();
  const weekNames = ['日', '一', '二', '三', '四', '五', '六'];
  const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 星期${weekNames[now.getDay()]}`;

  return (
    <View className="daily-page">
      <View className="daily-header">
        <Text className="daily-title">📅 今日</Text>
        <Text className="daily-date">{dateStr}</Text>
      </View>

      {/* 天气 */}
      <Weather />

      {/* 日历 */}
      <Calendar />
    </View>
  );
}
