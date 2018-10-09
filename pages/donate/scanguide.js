// pages/donate/scanguide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageKeyAgreeRule: "hasAgreeDonateRule",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = wx.getStorageSync(this.data.storageKeyAgreeRule)
    if (!res || res.data != "agree") {
      wx.navigateTo({
        url: '/pages/donate/rule',
      })
    }
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

  beginScan: function() {
    
    wx.scanCode({
      "scanType": ['barcode'],
      "success": (res) =>  {
        wx.navigateTo({
          url: '/pages/donate/scanresult?isbn='+res.result
        })
      },
      "fail": (res) => {
        console.log(res);
        wx.showToast({
          title: '扫码失败！请确认扫的是条形码！',
        })
      }
    })
  }
})