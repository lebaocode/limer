//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //检查是否存储本地用户信息
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
      console.log("read userInfo from storage")
      console.log(userInfo)
      return
    }

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
  decryptData: function(sessionKey){

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
                }
              })

            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})