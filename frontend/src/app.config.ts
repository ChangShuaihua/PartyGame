export default defineAppConfig({
  pages: [
    'pages/index/index',   // 创建房间页
    'pages/room/index',    // 房间对局主页
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1a1a2e',
    navigationBarTitleText: '扑克发牌',
    navigationBarTextStyle: 'white',
  },
});
