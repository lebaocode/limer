// pages/books/writecomment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbn: '',
    bookTitle: '',
    booklistId: '',
    inputReason: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isbn: options.isbn || '',
      booklistId: options.booklistId || ''
    })

    wx.request({
      url: 'https://www.limer.cn/json/getBookDetail',
      data: {
        isbn: this.data.isbn
      },
      success: (res) => {
        this.setData({
          bookTitle: res.data.data.title
        })
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
  setReason: function(e) {
    this.setData({
      inputReason: e.detail.value
    })
  },
  formSubmit: function() {
    if (!this.data.inputReason || this.data.inputReason.length == 0) {
      wx.showToast({
        title: '请输入推荐理由',
        icon: 'none'
      })
      return false;
    }

    wx.request({
      url: 'https://www.limer.cn/json/addBookToBookList',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        "isbn": this.data.isbn,
        "booklistId": this.data.booklistId,
        "content": this.data.inputReason,
        "ue": "ISO-8859-1",
        'unionId': wx.getStorageSync("userInfo").unionId
      },
      success: (res) => {
        wx.navigateBack({
          delta: 2
        })
        wx.navigateTo({
          url: '/pages/books/detail?isbn='+ this.data.isbn,
        })
      }
    })
  }
})