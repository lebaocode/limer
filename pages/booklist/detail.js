// pages/booklist/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerUrl: '/pages/images/banner_xinshu_flat.jpg',
    booklist: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.limer.cn/json/getBookListDetail',
      data: {
        id: options.id || '',
      },
      success: (res) => {
        console.log(res)
        if (res.data && res.data.success) {
          this.setData({
            booklist: res.data.data
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
  gotoBookDetail: function (e) {
    var isbn = e.currentTarget.dataset.isbn;
    console.log("dataset isbn:" + isbn)
    wx.navigateTo({
      url: '/pages/books/detail?isbn=' + isbn,
    })
  }
})