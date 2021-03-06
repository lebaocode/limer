// pages/booklist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catList: [],
    curTag: "理性思维",
    curStart: 0,
    curLen: 20,
    bannerUrl: 'https://storage.limer.cn/images/banner_xinshu_flat.jpg',
    bookList: [],
    loaded: false
  },
  getCatList: function () {
    return [
      { "tag": "理性思维", "selected": true },
      { "tag": "世界认知", "selected": false },
      { "tag": "英文学习", "selected": false },
      { "tag": "性格培养", "selected": false },
      { "tag": "生活习惯", "selected": false },
      { "tag": "学习习惯", "selected": false },
      
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cList = this.getCatList();
    this.setData({
      catList: cList
    })

    var tag = options.tag;
    if (!tag) tag = this.data.curTag;
    var start = options.start ? options.start : this.data.curStart;
    if (start < 0) start = 0
    var len = options.len ? options.len : this.data.curLen;
    if (len < 20) len = 20
    if (len > 100) len = 100

    this.setData({
      curTag: tag,
      curStart: start,
      curLen: len
    })
    this.switchCatId(tag, start, len);
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
  gotoBookList: function(e) {
    wx.navigateTo({
      url: '/pages/booklist/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  gotoActivity: function () {
    wx.navigateTo({
      url: '/pages/activity/newbook',
    })
  },
  switchCat: function (e) {
    this.setData({
      loaded: false
    })
    var tag = e.target.dataset.tag;
    this.setData({
      curTag: tag,
      curStart: 0
    })
    this.switchCatId(tag, 0, this.data.curLen)
  },
  switchCatId: function (tag, start, len) {
    wx.showLoading({
      title: '加载中...',
    })

    for (var i = 0; i < this.data.catList.length; i++) {
      if (tag == this.data.catList[i].tag) {
        this.data.catList[i].selected = true;
      } else {
        this.data.catList[i].selected = false;
      }
    }
    this.setData({
      catList: this.data.catList,
      bookList: []
    })

    //获取类别对应的图书列表
    this.getCatBookList(tag, start, len)
  },
  getCatBookList: function (tag, start, len) {
    console.log("getCatBookList:" + tag + " " + start + " " + len)
    wx.request({
      url: 'https://www.limer.cn/json/getRecentBookLists',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        "tag": tag,
        "start": start,
        "len": len,
        "ue": "ISO-8859-1"
      },
      success: (res) => {
        if (res.data && res.data.data) {
          var newList = this.data.bookList.concat(res.data.data)
          var size = newList.length
          if (size > 200) {
            for (var i = 0; i < size - 200; i++) {
              newList.shift()
            }
          }

          this.setData({
            bookList: newList,
            loaded: true
          })
        }
        wx.hideLoading()
      },
      fail: (res) => {
        console.log(res)
        wx.hideLoading()
      }
    })
  },
  nextPage: function () {
    if (this.data.bookList.length != this.data.curLen) return;

    console.log("nextpage")
    this.setData({
      curStart: this.data.curStart + this.data.curLen
    })
    this.getCatBookList(this.data.curTag, this.data.curStart, this.data.curLen)
  },
  lastPage: function () {
    if (this.data.curStart == 0) return;

    console.log("lastpage")
    this.setData({
      curStart: this.data.curStart - this.data.curLen < 0 ? 0 : this.data.curStart - this.data.curLen
    })


    this.getCatBookList(this.data.curTag, this.data.curStart, this.data.curLen)
  }
})