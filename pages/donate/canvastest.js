// pages/donate/canvastest.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharePic: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  canvasError: function(e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var context = wx.createCanvasContext("canvasShare", this)
    console.log(context)
    context.drawImage("/pages/images/sample.png", 0, 0, 200, 200)
    context.draw(false, () => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 600,
        height: 900,
        destWidth: 600,
        destHeight: 900,
        quality: 0.9,

        canvasId: 'canvasShare',
        success: (res) => {
          console.log("success")
          console.log(res)
          this.setData({
            "sharePic": res.tempFilePath
          })
        },
        fail: (res) => {
          console.log("failed")
          console.log(res)
        }
      }, this)
    })
    
    
    
    
    
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

  }
})