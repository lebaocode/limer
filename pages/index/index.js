//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    nextUrl: "/pages/books/index",
    nextSwtichTab: true
  },
  //事件处理函数
  onLoad: function (options) {
    this.data.nextUrl = options.url
    this.data.nextSwitchTab = options.switchTab
  },
  limerLogin: function(){
    
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
            this.decryptData(res2.data.session_key)
          }
        })
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
              //console.log("getUserInfo return:")
              //console.log(res2)

              // 可以将 res 发送给后台解码出 unionId
              wx.request({
                url: 'https://www.limer.cn/json/decryptUserInfo',
                data: {
                  encryptedData: res2.encryptedData,
                  sessionKey: sessionKey,
                  iv: res2.iv
                },
                success: (res3) => {
                  //console.log("decryptUserInfo return:")
                  //console.log(res3)
                  this.globalData.userInfo = res3.data
                  wx.setStorageSync('userInfo', res3.data)

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }

                  wx.navigateBack({
                    delta: 1,
                  })
                }
              })

            }
          })
        }
      }
    })
  },

  nextAction: function() {
    if (this.data.nextSwitchTab) {
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
