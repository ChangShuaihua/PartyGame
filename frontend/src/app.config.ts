export default defineAppConfig({
  pages: [
    'pages/home/index',        // 首页 - 娱乐模块入口
    'pages/poker/index',       // 扑克模块 - 创建/加入房间
    'pages/poker/room/index',  // 扑克模块 - 游戏房间
    'pages/score/index',       // 计分器模块 - 创建/加入房间
    'pages/score/room/index',  // 计分器模块 - 计分房间
    'pages/daily/index',       // 日历天气模块
    'pages/companion/index',   // 情感陪伴模块
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1a1a2e',
    navigationBarTitleText: '娱乐中心',
    navigationBarTextStyle: 'white',
  },
});
