import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getCurrentUserId } from '../../utils';
import './index.scss';

/** 娱乐模块配置 */
const MODULES = [
  {
    id: 'poker',
    icon: '🃏',
    title: '扑克发牌',
    desc: '酒桌小游戏，发牌定命运',
    color: '#f0c040',
    available: true,
  },
  {
    id: 'score',
    icon: '📊',
    title: '计分器',
    desc: '送分计分，轻松记录',
    color: '#2ecc71',
    available: true,
  },
  {
    id: 'dice',
    icon: '🎲',
    title: '摇骰子',
    desc: '经典骰子游戏，敬请期待',
    color: '#95a5a6',
    available: false,
  },
  {
    id: 'more',
    icon: '🎰',
    title: '更多游戏',
    desc: '更多精彩即将上线...',
    color: '#95a5a6',
    available: false,
  },
];

export default function HomePage() {
  const userId = getCurrentUserId();

  const handleModuleClick = (mod: typeof MODULES[0]) => {
    if (!mod.available) {
      Taro.showToast({ title: '即将上线，敬请期待', icon: 'none' });
      return;
    }

    switch (mod.id) {
      case 'poker':
        Taro.navigateTo({ url: '/pages/poker/index' });
        break;
      case 'score':
        Taro.navigateTo({ url: '/pages/score/index' });
        break;
      default:
        break;
    }
  };

  return (
    <View className="home-page">
      {/* 顶部品牌区 */}
      <View className="home-header">
        <Text className="home-logo">🎮</Text>
        <Text className="home-title">小华华的娱乐小游戏</Text>
        <Text className="home-subtitle">和好友一起嗨起来</Text>
      </View>

      {/* 娱乐模块区 */}
      <View className="module-section">
        <View className="module-section-header">
          <Text className="module-section-icon">🎯</Text>
          <Text className="module-section-title">娱乐模块</Text>
        </View>

        <View className="module-grid">
          {MODULES.map((mod) => (
            <View
              key={mod.id}
              className={`module-card ${!mod.available ? 'module-card--disabled' : ''}`}
              onClick={() => handleModuleClick(mod)}
            >
              <View className="module-card-icon" style={{ backgroundColor: `${mod.color}20` }}>
                <Text className="module-card-emoji">{mod.icon}</Text>
              </View>
              <Text className="module-card-title">{mod.title}</Text>
              <Text className="module-card-desc">{mod.desc}</Text>
              {!mod.available && (
                <View className="module-card-badge">
                  <Text className="module-card-badge-text">即将上线</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* 底部用户信息 */}
      <View className="home-footer">
        <Text className="home-footer-text">用户ID: {userId.slice(-8)}</Text>
      </View>
    </View>
  );
}
