// pages/books/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catList: [],
    bookList: []
  },
  mockCatList: function() {
    return [
      { "name": "互联网", "id": 1, "selected": true },
      { "name": "经管", "id": 2, "selected": false },
      { "name": "历史", "id": 3, "selected": false },
      { "name": "励志", "id": 4, "selected": false },
      { "name": "IT", "id": 5, "selected": false },
      { "name": "文学", "id": 6, "selected": false },
      { "name": "小说", "id": 7, "selected": false }
    ]
  },
  mockBookList: function(){
    return [
      {
        "cover": "/pages/images/book-sample1.jpg",
        "title": "定位：争夺用户心智的战争（经典重译版）",
        "subtitle": "争夺用户心智的战争",
        "author": "[美] 艾·里斯（Al Ries），杰克·特劳特（Jack Trout） 著",
        "isbn": "1",
        "catid": 1
      },
      {
        "cover": "/pages/images/bookcover-default-gray.png",
        "title": "史记",
        "author": "司马迁 著",
        "isbn": "2",
        "catid": 3
      },
      {
        "cover": "/pages/images/book-sample2.jpg",
        "title": "影响力",
        "author": "[美] 罗伯特·B·西奥迪尼 著",
        "isbn": "3",
        "catid": 1
      },
      {
        "cover": "/pages/images/bookcover-default-gray.png",
        "title": "斗破苍穹",
        "author": "唐家三少 著",
        "isbn": "4",
        "catid": 7
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cList = this.mockCatList();
    this.setData({
      catList: cList
    })
    this.switchCatId(1)
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
  switchCat: function(e) {
    var catId = e.target.dataset.catid;
    this.switchCatId(catId)
  },
  switchCatId: function(catId) {
    for (var i=0;i<this.data.catList.length; i++) {
      if (catId == this.data.catList[i].id) {
        this.data.catList[i].selected = true;
      } else {
        this.data.catList[i].selected = false;
      }
    }
    this.setData({
      catList: this.data.catList
    })

    //获取类别对应的图书列表
    this.getCatBookList(catId)
  },
  getCatBookList: function(catId) {
    var mockList = this.mockBookList()
    var bList = [];
    for (var i = 0; i < mockList.length; i++) {
      var b = mockList[i];
      if (b.catid == catId) {
        bList.push(b);
      }
    }
    this.setData({
      bookList: bList
    })
  },
  gotoBookDetail: function(e) {
    var isbn = e.target.dataset.isbn;
    wx.navigateTo({
      url: '/pages/books/detail?isbn=' + isbn,
    })
  }
})