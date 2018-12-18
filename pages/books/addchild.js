// pages/books/addchild.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: '请选择',
    sex: 0,
    sexArray: ['男', '女'],
    sexDesc: '男',
    region: '请选择',
    receiverMobile: '',
    address: '',
    receiverName: '',
    childName: '',
    relation: 0,
    relationArray: ['妈妈', '爸爸', '奶奶', '爷爷', '姥姥', '姥爷', '其他'],
    relationDesc: '妈妈',
    lastUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })

    var redirectTo = decodeURIComponent(options.redirectTo)
    console.log("redirectTo:" + redirectTo)
    this.setData({
      lastUrl : redirectTo || ''
    })

    wx.request({
      url: 'https://www.limer.cn/json/getAddress',
      data: {
        'unionId': wx.getStorageSync("userInfo").unionId,
        'openId': wx.getStorageSync("userInfo").openId,
      },
      success: (res) => {
        if (res.data.success && res.data.data.hasInfo) {
          this.setData({
            birthday: res.data.data.birthday,
            childName: res.data.data.childName,
            relation: res.data.data.relation,
            sex: res.data.data.sex,
            address: res.data.data.address,
            region: res.data.data.region,
            receiverMobile: res.data.data.receiverMobile,
            receiverName: res.data.data.receiverName,
          })

          this.setData({
            sexDesc: this.data.sexArray[this.data.sex],
          })

          this.setData({
            relationDesc: this.data.relationArray[this.data.relation],
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
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
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading()
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
  setChildName: function(e) {
    
    this.setData({
      childName: e.detail.value
    })
  },
  setReceiverName: function (e) {

    this.setData({
      receiverName: e.detail.value
    })
  },
  setMobile: function (e) {

    this.setData({
      receiverMobile: e.detail.value
    })
  },
  setAddress: function (e) {

    this.setData({
      address: e.detail.value
    })
  },
  setBirthday: function (e) {

    this.setData({
      birthday: e.detail.value
    })
  },
  setSex: function (e) {
    var s = e.detail.value
    this.setData({
      sex: s,
      sexDesc: this.data.sexArray[s] 
    })
  },
  setRegion: function (e) {
    console.log(e.detail)
    var s = e.detail.value
    this.setData({
      region: s,
      regionDesc: s
    })
  },
  setRelation: function (e) {

    this.setData({
      relation: e.detail.value,
      relationDesc: this.data.relationArray[e.detail.value]
    })
  },
  formSubmit: function() {
    //check valid
    if (this.data.receiverName.length == 0) {
      wx.showToast({
        title: '请填写收件人名称',
        icon: 'none'
      })
      return
    }
    if (this.data.receiverMobile.length == 0) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return
    }
    if (this.data.region == '请选择') {
      wx.showToast({
        title: '请填写所在地区',
        icon: 'none'
      })
      return
    }
    if (this.data.address.length == 0) {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none'
      })
      return
    }
    if (this.data.childName.length == 0) {
      wx.showToast({
        title: '请填写孩子昵称',
        icon: 'none'
      })
      return
    }
    
    if (this.data.birthday == '请选择') {
      wx.showToast({
        title: '请填写孩子生日',
        icon: 'none'
      })
      return
    }
    

    wx.request({
      url: 'https://www.limer.cn/json/fillAddress',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: {
        childName: this.data.childName,
        sex: this.data.sex,
        birthday: this.data.birthday,
        relation: this.data.relation,
        receiverMobile: this.data.receiverMobile,
        address: this.data.address,
        region: this.data.region,
        receiverName: this.data.receiverName,
        ue: "ISO-8859-1",
        unionId: wx.getStorageSync("userInfo").unionId,
        openId: wx.getStorageSync("userInfo").openId,
      },
      success: (res) => {
        wx.redirectTo({
          url: this.data.lastUrl,
        })
      }
    })
  }
})