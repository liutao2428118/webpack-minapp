import regeneratorRuntime from "regenerator-runtime"
global.regeneratorRuntime = regeneratorRuntime

// import _ from 'loadsh'
// global._ = _

import * as R from 'ramda'
global.R = R

const asyncWrap = fn => (options = {}) => new Promise((resolve, reject) => {
  let conf = {
    success: res => {
      resolve(res)
    },
    fail: err => {
      reject(err)
    }
  }
  wx[fn](R.merge(conf, options))
})

wx.loginAsync = asyncWrap('login')
wx.getUserInfoAsync = asyncWrap('getUserInfo')

wx.getSettingAsync = asyncWrap('getSetting')

wx.requestAsync = asyncWrap('request')
wx.uploadFileAsync = asyncWrap('uploadFile')

wx.getLocationAsync = asyncWrap('getLocation')
wx.chooseLocationAsync = asyncWrap('chooseLocation')

wx.chooseImageAsync = asyncWrap('chooseImage')

wx.startPullDownRefreshAsync = asyncWrap('startPullDownRefresh')
wx.stopPullDownRefreshAsync = asyncWrap('stopPullDownRefresh')

// 包装缓存异步方法
wx.setStorageAsync = asyncWrap('setStorage')
wx.removeStorageAsync = asyncWrap('removeStorage')
wx.getStorageInfoAsync = asyncWrap('getStorageInfo')
wx.getStorageAsync = asyncWrap('getStorage')
wx.clearStorageAsync = asyncWrap('clearStorage')



wx.paymentAsync = asyncWrap('requestPayment')

// let lastTime = 0

// global.requestAnimationFrame = callback => {
//   const currentTime = new Date().getTime()
//   const timeToCall = Math.max(0, 16 - (currentTime - lastTime))
//   const timer = global.setTimeout(function() {
//     callBack(currentTime + timeToCall)
//   }, timeToCall)

//   lastTime = currentTime + timeToCall

//   return timer
// }

// global.cancalAnimationFram = timer => {
//   clearTimeout(timer)
// }

// import TWEEN from 'tween'

// TWEEN.now = function() {
//   return new Date.now
// }

// global.TWEEN = TWEEN

wx.alert = (content) => {
  wx.showModal({
    title: '',
    content,
    showCancel: false
  })
}


// import Store from './store/store';
// import Create from './tools/Omix/create';
// import Util from './tools/Util';
// import Config from './tools/Config';

// console.log(Create)

// global.Store = Store;
// global.Create = Create;
// global.Util = Util;
// global.Config = Config;