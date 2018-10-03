// pages/books/mail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnActiveColor: "#FFF",
    btnActiveBgColor: "#AFCB21",
    btnInactiveColor: "#AAA",
    btnInactiveBgColor: "#E0E0E0",

    btnCodeCurColor: "#FFF",
    btnCodeCurBgColor: "#AFCB21",
    btnSubmitCurColor: "#AAA",
    btnSubmitCurBgColor: "#E0E0E0",

    code: "",
    mobile: "",
    mail: "",

    storageKeyHasMail: "hasMail"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getVerifyCode: function() {
    this.setData({
      btnCodeCurColor: this.data.btnInactiveColor,
      btnCodeCurBgColor: this.data.btnInactiveBgColor,
    })
  },
  bindCodeInput: function(e) {
    var code = e.detail.value
    //如果验证码正确，则可以提交
    if (code.length >= 4) {
      this.setData({
        btnSubmitCurColor: this.data.btnActiveColor,
        btnSubmitCurBgColor: this.data.btnActiveBgColor,
        code: code
      })
    }
  },
  formSubmit: function(e) {
    console.log(e.detail.value)
    var data = e.detail.value
    if (data.mobile.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return;
    }

    if (data.mail.length == 0) {
      wx.showToast({
        title: '请输入邮寄地址',
        icon: 'none'
      })
      return;
    }

    if (data.code != "1234") {
      wx.showToast({
        title: '验证码错误',
        icon: 'none'
      })
      return;
    }

    //验证码正确，则提交；并记录到storage
    wx.setStorageSync(this.data.storageKeyHasMail, {"data": true})

    wx.navigateBack({
      delta: 1
    })
  }
})