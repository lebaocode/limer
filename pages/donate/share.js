// pages/donate/share.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharePic: "",
    qrCodeImgUrl: "/pages/images/qrcode-sample.png",
    checkedImgUrl: "/pages/images/checked.png",
    maskDisplay: "block",
    shareDisplay: "flex"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.userInfo) {
      wx.switchTab({
        url: '/pages/books/index',
      })
      return;
    }
    
    var donateInfo = {
      totalNum: 108,
      title: "藏书大家",
      recentBookImgUrl: [
        "/pages/images/bookcover-default.png",
        "/pages/images/bookcover-default.png",
        "/pages/images/bookcover-default.png"
      ],
      userLogo: app.globalData.userInfo.avatarUrl,
      userName: app.globalData.userInfo.nickName
    }
    console.log(donateInfo)
    this.drawCanvas(donateInfo)
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
    return {
      title: "来交流一下有啥好书吧",
      path: "/pages/donate/rule",
      imageUrl: this.data.sharePic
    }
  },
  gotoBookList: function() {
    wx.switchTab({
      url: '/pages/books/index'
    })
  },
  canvasError: function(e) {
    console.log(e)
  },
  closeLayer: function(){
    this.setData({
      shareDisplay: "none",
      maskDisplay: "none"
    })
  },
  drawCanvas: function(info) {
    

    wx.getImageInfo({
      src: info.userLogo,
      success: (res) => {
        var context = wx.createCanvasContext("share-pic", this);
        context.setStrokeStyle("#7ABC22");

        var cw = 600; //canvas 宽度
        var ch = 900; //canvas 高度
        var logoW = 132; //userLogo 宽度
        var logoH = 132; //userLogo 高度
        var top = 136; //顶部边距
        var left = 65; //左边边距
        var bw = 150; //书宽
        var bh = 150; //书高
        var qrW = 150; //二维码宽度
        var qrH = 150; //二维码高度
        var checkedW = 16;//对勾宽度
        var checkedH = 16;//对勾高度

        context.beginPath()
        context.rect(0, 0, cw, ch)
        context.setFillStyle("#7ABC22");
        context.fill()
        context.closePath()
        context.stroke()
        context.save()

        context.beginPath()
        context.arc(cw / 2, top, logoW/2, 0, 2*Math.PI)
        context.clip()
        context.drawImage(res.path, cw / 2 - logoW / 2, top - logoW / 2, logoW, logoH)
        context.restore()

        context.setFontSize(30)
        context.setFillStyle("#FFFFFF");
        context.setTextAlign("center")
        context.fillText(info.userName + " 已捐赠 " + info.totalNum + " 本书", cw/2, top + logoH + 10)
        context.fillText("获得 " + info.title + " 称号", cw / 2, top + logoH + 60)

        for (var i = 0; i < info.recentBookImgUrl.length; i++) {
          context.drawImage(info.recentBookImgUrl[i], left + (i*(bw+ 10)), top+ logoH+ 140, bw, bh)
        }

        //绘制二维码，并描一个白边
        var borderW = 10
        context.beginPath()
        context.setStrokeStyle("#FFFFFF")
        context.setLineWidth(borderW)
        context.rect(left + 20, top + logoH + 250 + bh, qrW, qrH)
        context.closePath()
        context.stroke()
        context.drawImage(this.data.qrCodeImgUrl, left+20, top+logoH+250+bh, qrW, qrH)

        var curLeft = left + 20 + qrW + 30
        var curTop = top + logoH + 250 + bh
        var curFontSize = 24
        context.setFontSize(24)
        context.setTextAlign("left")
        context.setTextBaseline("top")
        context.fillText("扫码加入青柠书友会", curLeft, curTop)
        context.drawImage(this.data.checkedImgUrl, curLeft, curTop + 48, checkedW, checkedH)
        context.fillText("免费借书", curLeft + checkedW + 10, curTop + 40)
        context.drawImage(this.data.checkedImgUrl, curLeft, curTop + 88, checkedW, checkedH)
        context.fillText("上门取书还书", curLeft + checkedW + 10, curTop + 80)
        context.drawImage(this.data.checkedImgUrl, curLeft, curTop + 128, checkedW, checkedH)
        context.fillText("督促打卡，社群读书", curLeft + checkedW + 10, curTop + 120)
        
        context.draw(false, () => {
          console.log("draw finished.")
          wx.canvasToTempFilePath({
            canvasId: 'share-pic',
            x: 0,
            y: 0,
            width: cw,
            height: ch,
            destWidth: cw,
            destHeight: ch,
            quality: 1,
            success: (res) => {
              console.log("success: " + res.tempFilePath)
              this.setData({
                "sharePic": res.tempFilePath
              })

              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: () => {
                  
                }
              })
              
            }
          }, this)
        })

        
      }
    })

    
    
    
    
  }
})