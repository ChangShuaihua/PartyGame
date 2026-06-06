import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function Calendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const today = now.getDate();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  // 上个月天数（填充前面的空格）
  const prevDays = getDaysInMonth(year, month - 1);

  const handlePrev = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const handleBackToday = () => {
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  };

  // 构建日历格子
  const cells: { day: number; isCurrentMonth: boolean }[] = [];

  // 上个月的尾巴
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevDays - i, isCurrentMonth: false });
  }

  // 本月
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isCurrentMonth: true });
  }

  // 下个月的开头
  const remaining = 42 - cells.length; // 6行 x 7列
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, isCurrentMonth: false });
  }

  return (
    <View className="calendar">
      {/* 月份导航 */}
      <View className="calendar-nav">
        <View className="nav-btn" onClick={handlePrev}>
          <Text className="nav-btn-text">◀</Text>
        </View>
        <View className="nav-title" onClick={handleBackToday}>
          <Text className="nav-year">{year}年</Text>
          <Text className="nav-month">{month + 1}月</Text>
        </View>
        <View className="nav-btn" onClick={handleNext}>
          <Text className="nav-btn-text">▶</Text>
        </View>
      </View>

      {/* 星期头部 */}
      <View className="calendar-weekdays">
        {WEEKDAYS.map(w => (
          <View key={w} className="weekday-cell">
            <Text className="weekday-text">{w}</Text>
          </View>
        ))}
      </View>

      {/* 日期网格 */}
      <View className="calendar-grid">
        {cells.map((cell, index) => {
          const isToday = isCurrentMonth && cell.isCurrentMonth && cell.day === today;
          return (
            <View
              key={index}
              className={`day-cell ${!cell.isCurrentMonth ? 'day-cell--other' : ''} ${isToday ? 'day-cell--today' : ''}`}
            >
              <Text className="day-text">{cell.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
