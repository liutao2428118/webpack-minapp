require('shelljs/global');
const webpack = require('webpack');
const fs = require('fs');
const { resolve } = require('path');
const r = url => resolve(__dirname, url);

const webpackConfig = require('./webpack.config');
const minaConfig = require(r('./mina.config'));
const assetsPath = r('../dist');

//shelljs工具函数，每次打包先清除输出目录，再创建输出目录（也就是dist文件夹）
rm('-rf', assetsPath);
mkdir(assetsPath);

var renderConfig = webpackConfig;

// 设置打包入口
renderConfig.entry = minaConfig.json.pages.reduce((en, i) => {
  en[i] = resolve(process.cwd(), './', `${i}.mina`)

  return en;
}, {});
renderConfig.entry.app = minaConfig.app;

// 打包后的出口
renderConfig.output = {
  path: r('../dist'),
  filename: '[name].js'
}

var compiler = webpack(renderConfig);

//写入小程序的app.json文件
fs.writeFileSync(r('../dist/app.json'), JSON.stringify(minaConfig.json), 'utf8');

// 监听文件变化
compiler.watch({
  aggregateTimeout: 300,
  poll: true
}, (err, stats) => {
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: true,
    chunks: true,
    chunkModules: true
  }) + '\n\n')
});