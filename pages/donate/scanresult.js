// pages/donate/scanresult.js
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
    } else {
      this.mockBookList();
    }

    var paraIsbn = options.isbn;
    if (paraIsbn) {
      this.getBookInfo(paraIsbn);
    } 

    this.confirmSetData();
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
      if (this.data.bookList[i].isbn == curIsbn) {
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
    var score = 0;
    for (var i = 0; i < this.data.bookList.length; i++) {
      var b = this.data.bookList[i];
      score += b.score;
    }
    this.data.bookTotalNum = this.data.bookList.length;
    this.data.bookTotalScore = score;

    this.setData({
      bookTotalScore: score,
      bookList: this.data.bookList,
      bookTotalNum: this.data.bookList.length
    })

  },
  getBookInfo: function (isbn) {
    var curBook = {
      "cover": "/pages/images/bookcover-default-gray.png",
      "title": "高效学习4",
      "author": "[日] 和田秀树，蓝朔 著",
      "isbn": "4",
      "price": "￥60.00",
      "score": 60
    }
    if (curBook) {
      var found = false;
      for (var i = 0; i < this.data.bookList.length; i++) {
        if (this.data.bookList[i].isbn == isbn) {
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
    }
    
  },
  mockBookList: function() {
    console.log("mocked")
    this.data.bookList = [
      {
        "cover": "/pages/images/bookcover-default-gray.png",
        "title": "高效学习3",
        "author": "[日] 和田秀树，蓝朔 著",
        "isbn": "3",
        "price": "￥50.00",
        "score": 50
      },
      {
        "cover": "/pages/images/bookcover-default-gray.png",
        "title": "高效学习2",
        "author": "[日] 和田秀树，蓝朔 著",
        "isbn": "2",
        "price": "￥40.00",
        "score": 40
      },
      {
        "cover": "/pages/images/bookcover-default-gray.png",
        "title": "高效学习1",
        "author": "[日] 和田秀树，蓝朔 著",
        "isbn": "1",
        "price": "￥30.00",
        "score": 30
      },
      {
        "cover": "/pages/images/bookcover-default-gray.png",
        "title": "高效学习0",
        "author": "[日] 和田秀树，蓝朔 著",
        "isbn": "0",
        "price": "￥20.00",
        "score": 20
      }
      
      
    ];

    
  },
  continueScan: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  submitDonate: function() {
    wx.navigateTo({
      url: '/pages/donate/share',
    })
  }
})