const { resolve } = require('path');
const r = url => resolve(__dirname, url);
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 清空打包目录的插件
const CopyWebpackPlugin = require('copy-webpack-plugin'); //拷贝插件
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); //编译进度条插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //抽取样式到单独文件的插件
const UglifyjsPlugin = require('uglifyjs-webpack-plugin'); //js压缩插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css的插件


module.exports = {
  devtool: false,
  mode: 'production',
  output: {
    path: r('../dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: { // 配置别名
      util: r('../src/util/util')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              'env',
              {
                modules: false
              }
            ]
          ]
        }
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader'
          },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader' //css-loader 解释(interpret) @import 和 url()
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.mina$/,
        loader: 'wechat-mini-loader',
        options: {
          path: r('../'),
          dist: './dist'
        }
      }
    ]
  },
  optimization: {
    // 压缩js
    minimizer: [
      new UglifyjsPlugin({
        cache: true, // 消除注释
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({}) //压缩css
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: true, // 模拟删除
      verbose: true, // 写入日志
      cleanOnceBeforeBuildPatterns: [r('../dist')]
    }), // 清空打包目录
    //提取出来样式写入到.wxss中
    new MiniCssExtractPlugin({
      filename: '[name].wxss'
    }),
    new CopyWebpackPlugin([
      {
        from: {
          glob: 'pages/**/*.json', // 定义要拷贝的源文件
        },
        to: '' //定义要拷贝到的目标文件夹 
      },
      {
        from: 'static',
        to: 'static'
      }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ProgressBarPlugin() //编译进度条
  ],
}