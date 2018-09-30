// pages/donate/rule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageKeyAgreeRule: "hasAgreeDonateRule",

    licenseAgreeColor: "#000",
    licenseDisagreeColor: "#999",
    licenseCurColor: "#999",

    btnAgreeColor: "#FFF",
    btnAgreeBgColor: "#AFCB21",
    btnDisagreeColor: "#AAA",
    btnDisagreeBgColor: "#E0E0E0",
    btnCurColor: "#AAA",
    btnCurBgColor: "#E0E0E0"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = wx.getStorageSync(this.data.storageKeyAgreeRule)
    if (res && res.data == "agree") {
      wx.setStorageSync(this.data.storageKeyAgreeRule, {data: "agree"});
      wx.redirectTo({
        url: '/pages/donate/scanguide',
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
  checkboxChange: function(e) {
    if (e.detail.value=="agree") {
      this.setData({
        licenseCurColor: this.data.licenseAgreeColor,
        btnCurColor: this.data.btnAgreeColor,
        btnCurBgColor: this.data.btnAgreeBgColor 
      })
    } else {
      this.setData({
        licenseCurColor: this.data.licenseDisagreeColor,
        btnCurColor: this.data.btnDisagreeColor,
        btnCurBgColor: this.data.btnDisagreeBgColor 
      })
    }
  },
  btnClick: function(){
    if (this.data.btnCurColor == this.data.btnAgreeColor) {
      wx.setStorageSync(this.data.storageKeyAgreeRule, {
        data: 'agree'
      })
      wx.redirectTo({
        url: '/pages/donate/scanguide'
      })
    } 
  }
})