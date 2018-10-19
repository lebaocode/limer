// pages/donate/scanresult.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    donateBookListStorageName: "donatebooklist",
    bookList: [],
    bookTotalNum: 0,
    bookTotalScore: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var oldBookList = wx.getStorageSync(this.data.donateBookListStorageName);
    if (oldBookList && oldBookList.length > 0) {
      console.log("read from storage")
      this.data.bookList = oldBookList;
    } 

    var paraIsbn = options.isbn;
    if (paraIsbn) {
      this.checkBookInfo(paraIsbn);
    } else {
      this.confirmSetData()
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
    var curIsbn = e.target.dataset.isbn;
    var curIndex = -1;
    var curBook = {};
    for (var i = 0; i < this.data.bookList.length; i++) {
      if (this.data.bookList[i].isbn13 == curIsbn) {
        curIndex = i;
        curBook = this.data.bookList[i];
        break;
      }
    }
    
    if (curIndex != -1) { 
      this.data.bookList.splice(curIndex, 1);
      wx.setStorageSync(this.data.donateBookListStorageName, this.data.bookList);
      this.confirmSetData();

      //如果没书了，btn需要disable掉。TODO
    }
    
  },
  confirmSetData: function() {
    
    this.data.bookTotalNum = this.data.bookList.length;
    this.data.bookTotalScore = this.data.bookList.length*10;

    this.setData({
      bookTotalScore: this.data.bookTotalScore,
      bookList: this.data.bookList,
      bookTotalNum: this.data.bookList.length
    })

  },
  checkBookInfo: function (isbn) {
    console.log("checkBookInfo: " + isbn);

    //先判断该书是否已捐赠过
    wx.request({
      url: 'https://www.limer.cn/json/isBookDonated',
      data: {
        'isbn': isbn,
        'unionId': wx.getStorageSync("userInfo").unionId
      },
      success: (res) => {
        if (res.data) {
          var isDonated = res.data.data.donated;
          if (isDonated) {
            wx.showToast({
              title: '此书已共享过了哦~',
              icon: 'none',
            })
            this.confirmSetData();
          } else {
            this.getBookInfo(isbn)
          }
        }
      }
    })
  },
  getBookInfo: function(isbn) {
    wx.request({
      url: 'https://www.limer.cn/json/getBookDetail',
      data: {
        'isbn': isbn
      },
      success: (res) => {
        var curBook = res.data.data;
        if (curBook) {
          var found = false;
          for (var i = 0; i < this.data.bookList.length; i++) {
            if (this.data.bookList[i].isbn13 == isbn) {
              found = true;
              break;
            }
          }
          if (!found) {
            this.data.bookList.unshift(curBook);
            wx.setStorageSync(this.data.donateBookListStorageName, this.data.bookList);
          } else {
            wx.showToast({
              title: '这本书已经扫过啦~',
              icon: "none"
            })
          }

          this.confirmSetData();
        }
      }
    })
  },
  continueScan: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  submitDonate: function() {
    var isbnArr = [];
    for (var i = 0; i < this.data.bookList.length; i++) {
      isbnArr.push(this.data.bookList[i].isbn13);
    }
    
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/index/index',
      })
      return;
    }

    var unionId = app.globalData.userInfo.unionId
    wx.request({
      url: 'https://www.limer.cn/json/submitDonate',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        isbn_arr: isbnArr,
        unionId: unionId,
        ue: 'ISO-8859-1'
      },
      success: (res) => {
        wx.setStorageSync(this.data.donateBookListStorageName, []);
        wx.navigateTo({
          url: '/pages/donate/donateresult',
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '非常抱歉，共享失败！您可以稍后再试~',
          icon: 'none'
        })
      }
    })
  }
})