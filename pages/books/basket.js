// pages/books/basket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    totalBorrowNum: 0,
    totalBorrowPrice: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync("basket")) {
      this.setData({
        bookList: wx.getStorageSync("basket").basketBooks,
        totalBorrowNum: wx.getStorageSync("basket").totalBorrowNum,
        totalBorrowPrice: wx.getStorageSync("basket").totalBorrowPrice,
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
  deleteItem: function(e) {
    var curId = e.target.dataset.limberbookid;
    var curIndex = -1;
    var curBook = {};
    var curPrice = 0;
    for (var i = 0; i < this.data.bookList.length; i++) {
      if (this.data.bookList[i].limerBookId == curId) {
        curIndex = i;
        curBook = this.data.bookList[i];
        curPrice = Number(this.data.bookList[i].price)
        break;
      }
    }

    if (curIndex != -1) {
      this.data.bookList.splice(curIndex, 1);
      
      this.setData({
        bookList: this.data.bookList,
        totalBorrowNum: this.data.totalBorrowNum - 1,
        totalBorrowPrice: this.data.totalBorrowPrice - curPrice
      })

      wx.setStorageSync("basket", {
        basketBooks: this.data.bookList,
        totalBorrowNum: this.data.totalBorrowNum,
        totalBorrowPrice: this.data.totalBorrowPrice
      });

      //如果没书了，btn需要disable掉。TODO
    }
  },
  submitBorrow: function() {
    //判断是否填过地址
    wx.request({
      url: 'https://www.limer.cn/json/isAddressFilled',
      data: {
        'unionId': wx.getStorageSync("userInfo").unionId,
        'openId': wx.getStorageSync("userInfo").openId,
      },
      success: (res) => {
        if (res.data.success) {
          if (res.data.data.hasInfo) {
            wx.navigateTo({
              url: '/pages/books/pay',
            })
          } else {
            wx.navigateTo({
              url: '/pages/books/fillAddress',
            })
          }
        }
      }
    })
  }
})