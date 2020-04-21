const { resolve } = require('path');
const r = url => resolve(__dirname, url);
const webpack = require('webpack');
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
      util: r('../util/util')
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader' //css-loader 解释(interpret) @import 和 url()
          },
          // 添加postcss-loader会报错，后面解决
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss', // options中应用require 需要ident申明一下
          //     sourceMap: true,
          //     plugins: loader => [
          //       require('autoprefixer')({ // require进来autoprefixer
          //         browsers: ['> 0.15% in CN']
          //       }) // autoprefixer添加前缀,browser设置支持哪些浏览器
          //     ]
          //   }
          // },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.mina$/,
        loader: 'wechat-mina-loader',
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