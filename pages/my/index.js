// pages/my/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageKeyUserInfo : "userInfo",

    userLogo: "",
    userName: "",

    userScore: 120,
    userDonateNum: 1,
    userBorrowNum: 12
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userLogo: userInfo.avatarUrl,
        userName: userInfo.nickName
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
  gotoGrant: function(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  viewDonateRule: function() {
    wx.navigateTo({
      url: '/pages/donate/rule?onlyview=true',
    })
  },
  viewBorrowRule: function () {
    wx.navigateTo({
      url: '/pages/books/rule?onlyview=true',
    })
  },
  clearStorage: function() {
    wx.showModal({
      title: '提示',
      content: '确认要清空缓存吗？',
      success: function(res) {
        if (res.confirm) {
          wx.clearStorage({
            success: () => {
              wx.showToast({
                title: '缓存数据清除完毕',
                icon: 'none'
              })
            }
          });
        }
      }
    })
    
  },
  gotoMember: function() {
    wx.navigateTo({
      url: '/pages/activity/memberindex',
    })
  }
})