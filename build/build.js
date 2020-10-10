
const webpack = require('webpack');
const fs = require('fs');
const { resolve } = require('path');
const r = url => resolve(__dirname, url);

const webpackConfig = require('./webpack.config');
const projectConfig = require(r('../project.config'));
const minaConfig = require(r('../mina.config'));

var renderConfig = webpackConfig;

// 设置打包入口
const entrys = minaConfig.json.pages.concat(minaConfig.components)
renderConfig.entry = entrys.reduce((en, i) => {
  en[i] = resolve(process.cwd(), './src', `${i}.mina`)

  return en;
}, {});
renderConfig.entry.app = minaConfig.app;
console.log(renderConfig.entry)

// 打包后的出口
renderConfig.output = {
  path: r('../dist'),
  filename: '[name].js'
}

var compiler = webpack(renderConfig);

//写入小程序的app.json文件
fs.writeFileSync(r('../dist/app.json'), JSON.stringify(minaConfig.json), 'utf8');

//写入小程序的app.json文件
fs.writeFileSync(r('../dist/project.config.json'), JSON.stringify(projectConfig), 'utf8');

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