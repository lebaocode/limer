//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    nextUrl: "/pages/books/index",
    nextSwtichTab: true
  },
  //事件处理函数
  onLoad: function (options) {
    this.nextUrl = options.url
    this.nextSwitchTab = options.switchTab

    if (app.globalData.userInfo) {
      console.log("read from globalData")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.nextAction()
      
    } else if (this.data.canIUse){
      console.log("use open-type");
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.nextAction()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log("no open-type, use getUserInfo")
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.nextAction()
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.nextAction()
  },
  nextAction: function() {
    if (this.nextSwitchTab) {
      wx.switchTab({
        url: this.data.nextUrl,
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
      wx.navigateTo({
        url: this.data.nextUrl,
      })
    }
  }
})
