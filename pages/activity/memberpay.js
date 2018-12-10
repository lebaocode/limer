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
        }
      }
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  }
})