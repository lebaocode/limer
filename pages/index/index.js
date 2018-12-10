//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sessionKey: '',
    nextUrl: "/pages/books/index",
    nextSwtichTab: true
  },
  //事件处理函数
  onLoad: function (options) {
    this.data.nextUrl = options.url || '/pages/books/index'
    this.data.nextSwitchTab = options.switchTab || true

    console.log("nextUrl:" + this.data.nextUrl)
    console.log("nextSwitchTab:" + this.data.nextSwitchTab)

    //检查是否存储本地用户信息
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      console.log("read userInfo from storage")
      console.log(userInfo)

      this.redirectToNext()
      return
    }

    wx.showLoading({
      title: '加载中...',
    })
    this.limerLogin()
    
  },
  redirectToNext: function() {
    console.log("nextUrl:" + this.data.nextUrl)
    console.log("nextSwitchTab:" + this.data.nextSwitchTab)
    
    if (this.data.nextSwitchTab) {
      wx.switchTab({
        url: this.data.nextUrl,
      })
    } else {
      wx.redirectTo({
        url: this.data.nextUrl,
      })
    }
  },
  bindGetUserInfo: function(e) {
    this.decryptData2(this.data.sessionKey, e.detail.iv, e.detail.encryptedData)
  },
  limerLogin: function () {
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://www.limer.cn/json/code2Session',
          data: {
            code: res.code
          },
          success: (res2) => {
            //console.log("code2Session return")
            //console.log(res2)
            this.setData({
              sessionKey: res2.data.session_key
            })
            wx.hideLoading()
          }
        })
      }
    })
  },
  decryptData2: function (sessionKey, iv, encryptedData) {
    // 可以将 res 发送给后台解码出 unionId
    wx.request({
      url: 'https://www.limer.cn/json/decryptUserInfo',
      data: {
        encryptedData: encryptedData,
        sessionKey: sessionKey,
        iv: iv
      },
      success: (res3) => {
        console.log("decryptUserInfo return:")
        console.log(res3)
        wx.setStorageSync('userInfo', res3.data)
        this.redirectToNext()
      }
    })
  },
  decryptData: function (sessionKey) {

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res2 => {
              this.decryptData2(sessionKey, res2.iv, res2.encryptedData)
              
            }
          })
        }
      }
    })
  }
})
