// pages/activity/memberpay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    allowPay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })

    wx.request({
      url: 'https://www.limer.cn/json/getMemberPayInfo',
      data: {
        unionId: wx.getStorageSync("userInfo").unionId,
        openId: wx.getStorageSync("userInfo").openId,
      },
      success: (res) => {
        this.setData({
          info: res.data.data
        })

        var sys = wx.getSystemInfoSync()
        if (sys && (sys.platform == 'android' || res.data.data.isAllowed)) {
          this.setData({
            allowPay: true
          })
        } else {
          wx.showToast({
            title: '请联系公众号“青柠童书馆”客服',
            icon: 'none'
          })
        }
      }
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gotoPay: function() {
    //var fee = this.data.info.realFee + this.data.info.depositFee
    var fee = 1
    wx.request({
      url: 'https://www.limer.cn/json/orderMember',
      data: {
        totalFee: fee,
        realFee: fee,
        unionId: wx.getStorageSync("userInfo").unionId,
        openId: wx.getStorageSync("userInfo").openId,
      },
      success: (res) => {
        if (res.data.success) {
          wx.requestPayment({
            'timeStamp': res.data.data.timestamp,
            'nonceStr': res.data.data.nonstr,
            'package': "prepay_id="+res.data.data.prepayId,
            'signType': 'MD5',
            'paySign': res.data.data.paySign,
            'success': () => {
              wx.redirectTo({
                url: '/pages/my/myorder',
              })
            },
            'fail': (res2) => {
              if (res2.errMsg && res2.errMsg.indexOf('cancel') < 0) {
                wx.showToast({
                  title: '支付失败：' + res2.errMsg,
                  icon: 'none'
                })
              }
              
            }
          })
        } else {
          wx.showToast({
            title: '支付失败',
            icon: 'none'
          })
        }
      }
    })
  },
  reFillAddress: function() {
    wx.navigateTo({
      url: '/pages/books/addchild?redirectUrl=/pages/activity/memberpay',
    })
  }
})