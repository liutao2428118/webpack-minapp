const { resolve } = require('path');
const r = url => resolve(__dirname, url);
module.exports = {
  json: {
    // 这些内容主要来自app.json
    pages: [
      'pages/index/index',
      'pages/logs/logs',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '首页',
      navigationBarTextStyle: 'black'
    }
  },
  components: [
    'pages/components/demo',
    // 'pages/components/demo2',
  ],
  app: r('./src/app.js')
}