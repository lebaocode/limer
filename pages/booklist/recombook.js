// pages/booklist/recombook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklistId: '',
    inputIsbn: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      booklistId: options.id || ''
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
  setIsbn: function(e) {
    this.setData({
      inputIsbn: e.detail.value
    })
  },
  gotoScan: function(){

    wx.scanCode({
      "scanType": ['barcode'],
      "success": (res) => {
        wx.navigateTo({
          url: '/pages/books/writecomment?isbn=' + res.result + "&booklistId=" + this.data.booklistId,
        })
      }
    })
  },
  formSubmit: function() {
    if (!this.data.inputIsbn || this.data.inputIsbn.length == 0) {
      wx.showToast({
        title: '请输入图书isbn',
        icon: 'none'
      })
      return false
    }
    wx.navigateTo({
      url: '/pages/books/writecomment?isbn=' + this.data.inputIsbn + "&booklistId=" + this.data.booklistId,
    })
  }
})