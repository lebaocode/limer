// pages/books/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageKeyAgreeRule: "hasAgreeBorrowRule",
    storageKeyHasMail: "hasMail",

    book: {},
    bookStatus: 2, //1可借阅 2可预约 3借阅中

    comments: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.isbn)
    this.getBookDetail(options.isbn)

    //get book comments
    wx.request({
      url: 'https://www.limer.cn/json/getBookComments',
      data: {
        isbn: options.isbn,
        start: 0,
        len: 5
      },
      success: (res) => {
        console.log(res)
        if (res && res.data && res.data.success){
          this.setData({
            comments: res.data.data
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
  getBookDetail: function(isbn) {
    wx.request({
      url: 'https://www.limer.cn/json/getBookDetail',
      data: {
        isbn: isbn
      },
      success: (res) => {
        if (res.data) {
          if (res.data.success){
            var book = res.data.data

            book.summary = book.summary.replace(/\n/g, "\n\n")
            if (book.summary.length == 0) book.summary = "暂无"
            book.authorIntro = book.authorIntro.replace(/\n/g, "\n\n")
            book.catalog = book.catalog.replace(/\n/g, "\n\n")
            book.status = book.statusDesc

            this.setData({
              book: book
            });
          }else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      }
    })
    

  },
  submitBorrow: function() {
    var res = wx.getStorageSync(this.data.storageKeyAgreeRule)
    if (!res || res.data != "agree") {
      //先去同意借书规则
      wx.navigateTo({
        url: '/pages/books/rule',
      })
      return
    }

    //加入购物车
    var isbn = this.target.dataset.isbn;
    wx.navigateTo({
      url: '/pages/books/cart?isbn=' + isbn,
    })
  },
  gotoActivity: function() {
    wx.navigateTo({
      url: '/pages/activity/newbook',
    })
  },
  gotoWriteComment: function() {
    wx.navigateTo({
      url: '/pages/books/writecomment?isbn=' + this.data.book.isbn13,
    })
  }
})