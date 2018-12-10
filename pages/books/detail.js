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
    hasChildInfo: false,

    totalBorrowNum: 0,
    totalBorrowPrice: "0.00", 
    basketBooks: [],
    singleBookNo: 0,

    comments: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.isbn)
    this.getBookDetail(options.isbn)

    //获取当前借阅篮里的情况
    if (wx.getStorageSync("basket")) {
      this.setData({
        totalBorrowNum: wx.getStorageSync("basket").totalBorrowNum,
        totalBorrowPrice: wx.getStorageSync("basket").totalBorrowPrice,
        basketBooks: wx.getStorageSync("basket").basketBooks
      })
    }

    //get book comments
    wx.request({
      url: 'https://www.limer.cn/json/getBookComments',
      data: {
        isbn: options.isbn,
        start: 0,
        len: 5,
        unionId: wx.getStorageSync("userInfo").unionId,
        openId: wx.getStorageSync("userInfo").openId,
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
  addToBasket: function() {
    var basketBooks = []
    var totalBorrowPrice = 0
    var totalBorrowNum = 0
    if (wx.getStorageSync("basket")) {
      totalBorrowNum = wx.getStorageSync("basket").totalBorrowNum
      totalBorrowPrice = wx.getStorageSync("basket").totalBorrowPrice
      basketBooks = wx.getStorageSync("basket").basketBooks
    }

    var exists = false
    for (var i = 0; i < basketBooks.length; i++) {
      var s = basketBooks[i].isbn13 + "_" + basketBooks[i].singleBookNo
      if (s == (this.data.book.isbn13 + "_" + this.data.book.singleBookNo)) {
        exists = true
        break
      }
    }

    if (exists) {
      wx.showToast({
        title: '此本书已加入过了哦~',
        icon: 'none'
      })
      return
    }

    var curPrice = Number(this.data.book.price)
    if (totalBorrowPrice + curPrice > 200) {
      wx.showToast({
        title: '借书总定价不可超过200元哦~',
        icon: 'none'
      })
      return
    }

    if (totalBorrowNum > 9) {
      wx.showToast({
        title: '借书不可超过10本哦~',
        icon: 'none'
      })
      return
    }

    wx.request({
      url: 'https://www.limer.cn/json/preBorrowOneBook',
      data: {
        'isbn': this.data.book.isbn13,
        'unionId': wx.getStorageSync("userInfo").unionId,
        'openId': wx.getStorageSync("userInfo").openId,
      },
      success: (res) => {
        if (res.data.success){
          this.data.book.limerBookId = res.data.data.limerBookId

          totalBorrowNum = totalBorrowNum + 1
          totalBorrowPrice = totalBorrowPrice + curPrice
          basketBooks.push(this.data.book)

          wx.setStorageSync("basket", {
            totalBorrowNum: totalBorrowNum,
            totalBorrowPrice: totalBorrowPrice,
            basketBooks: basketBooks
          })

          this.setData({
            totalBorrowNum: totalBorrowNum,
            totalBorrowPrice: totalBorrowPrice,
            basketBooks: basketBooks
          })

          wx.showToast({
            title: '加入成功！',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
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
        isbn: isbn,
        unionId: wx.getStorageSync("userInfo").unionId,
        openId: wx.getStorageSync("userInfo").openId,
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
              book: book,
              hasChildInfo: book.hasChildInfo || false
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
    if (this.data.hasChildInfo) {
      wx.navigateTo({
        url: '/pages/books/writecomment?isbn=' + this.data.book.isbn13,
      })
    } else {
      wx.navigateTo({
        url: '/pages/books/addchild?redirectTo=' + encodeURIComponent('/pages/books/writecomment?isbn=' + this.data.book.isbn13),
      })
    }

    
  }
})