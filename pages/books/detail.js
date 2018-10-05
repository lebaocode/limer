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
    curUserScore: 0,//用户当前书币
    bookStoreNum: 0,//本书当前库存数量
    bookStatus: 2, //1可借阅 2可预约 3借阅中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.getUserScore()
    }

    this.getBookDetail(options.isbn)
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
  mockBookDetail: function() {
    return { "rating": { "max": 10, "numRaters": 6, "average": "0.0", "min": 0 }, "subtitle": "争夺用户心智的战争", "author": ["[美]艾·里斯（Al Ries）", "杰克·特劳特（Jack Trout）"], "pubdate": "2017-10", "tags": [{ "count": 5, "name": "营销", "title": "营销" }, { "count": 2, "name": "经典", "title": "经典" }, { "count": 2, "name": "市场营销", "title": "市场营销" }, { "count": 2, "name": "公关", "title": "公关" }, { "count": 1, "name": "广告", "title": "广告" }, { "count": 1, "name": "工作", "title": "工作" }, { "count": 1, "name": "公司存书", "title": "公司存书" }, { "count": 1, "name": "传播", "title": "传播" }], "origin_title": "", "image": "/pages/images/book-sample1.jpg", "binding": "平装", "translator": ["邓德隆", "火华强"], "catalog": "目录\n致中国读者\n序一\n序二\n前言\n在我们这个传播过度的社会中，定位是第一个用来应对这个难题的思想体系。\n第1章　定位的本质  ∥1\n如今很多人错误理解了传播在商业和政治中的角色。在我们这个传播过度的社会中，实际上达成的传播非常少。企业必须在潜在顾客的心智中创建一个“定位”。这个定位，不仅考虑了企业自身的强势和弱点，也考虑了竞争对手的强势和弱点。\n第2章　心智遭受信息轰炸  ∥8\n市场上实在是有太多公司、太多产品以及太多营销噪声了。美国的人均广告消费额每年达200美元。\n第3章　进入心智  ∥20\n成为第一是进入顾客心智的捷径。如果你不是第一，就必须想办法针对第一个进入心智的产品、政治家或人，给自己确立一个定位。\n第4章　心智中的小阶梯  ∥33\n为了应对传播过度的社会，人们学会了在心智中的阶梯上给产品排序。比如，在租车品类的心智阶梯上，大多数人把赫兹放在第一层，安飞士放在第二层，全美租车公司放在第三层。在定位之前，你必须知道自己在心智阶梯上处于什么位置。\n第5章　此路不通  ∥45\n任何向IBM在电脑业占据的定位发起正面挑战的公司，都不可能成功。很多公司忽视了这一条基本定位原则，结果备受挫折。\n第6章　领导者的定位  ∥53\n要成为领导者，你必须第一个进入潜在顾客的心智，然后遵循领导者的定位原则，以保持领导地位。\n第7章　跟随者的定位  ∥69\n对领导者行之有效的方法并不适用于跟随者。跟随者必须找到一个未被其他人占据的“空位”。\n第8章　重新定位竞争对手  ∥84\n如果找不到“空位”，你就不得不通过重新定位竞争对手来创造一个空位。比如，泰诺重新定位阿司匹林。\n第9章　名字的威力  ∥97\n为产品起名，是你要做出的最重要的营销决策。名字本身，在传播过度的社会中具有巨大的威力。\n第10章　无名陷阱  ∥118\n拥有冗长而复杂名字的公司，试图采用首字母缩写来简化名字，但这个策略极少奏效。\n第11章　搭便车陷阱  ∥134\n企业的第二个产品能够搭知名品牌的顺风车吗？升级版Alka-Seltzer及很多其他产品的案例，说明这行不通。\n第12章　品牌延伸陷阱  ∥144\n品牌延伸已成为过去10年的营销顽疾。它为何难成功？\n第13章　品牌延伸何时有效  ∥165\n但是，有一些品牌延伸的成功案例（比如通用电气）。这里会讨论什么时候采用公司名，什么时候采用新名字。\n第14章　企业定位：孟山都  ∥182\n孟山都如何通过“生命的化学真相”的定位传播方案在化工行业建立领导地位？\n第15章　国家定位：比利时  ∥194\n比利时航空公司所面临问题的答案，不是为航空公司定位，而是为比利时这个国家定位。\n第16章　产品定位：奶球  ∥203\n一个产品如何在传播预算很小的情况下，通过把自己定位为比糖果棒耐吃的替代品，得以进入心智？\n第17章　服务定位：邮递电报  ∥208\n一项真正的新服务，为何要针对老服务定位？\n第18章　为长岛银行定位  ∥217\n自己的领地遭遇来自大城市的大银行的入侵，这家银行如何实现成功反击？\n第19章　为天主教会定位  ∥226\n甚至机构也可以从定位思维中受益。为罗马天主教会定位，应采取怎样的合理步骤？\n第20章　个人及事业定位  ∥233\n你可以把定位战略运用到提升自己的事业上。关键原则是：不要试图全靠自己，而是要找一匹好马骑。\n第21章　成功六步曲  ∥245\n如何做定位？先问自己六个问题。\n第22章　定位素养  ∥254\n要定位成功，你必须具备正确的态度。你必须由外而内地思考，而不是由内而外地思考。这需要耐心、勇气和坚韧的个性。\n附录A　定位思想应用  ∥268\n附录B　企业家感言  ∥271", "pages": "312", "images": { "small": "https://img3.doubanio.com\/view\/subject\/s\/public\/s29560341.jpg", "large": "https://img3.doubanio.com\/view\/subject\/l\/public\/s29560341.jpg", "medium": "https://img3.doubanio.com\/view\/subject\/m\/public\/s29560341.jpg" }, "alt": "https:\/\/book.douban.com\/subject\/27155161\/", "id": "27155161", "publisher": "机械工业出版社", "isbn10": "7111577973", "isbn13": "9787111577973", "title": "定位：争夺用户心智的战争（经典重译版）", "url": "https:\/\/api.douban.com\/v2\/book\/27155161", "alt_title": "", "author_intro": "杰克·特劳特（Jack Trout）\n定位理论创始人，被誉为“定位之父”，于1969年在美国《工业营销》杂志上发表论文“定位：同质化时代的竞争之道”，首次提出商业中的“定位”观念，开创了定位理论，并在40多年的实战中致力于定位理论的不断发展与完善。1981年，出版学术专著《定位》；1996年，推出了定位理论刷新之作《新定位》；2001年，定位理论被美国营销学会评为“有史以来对美国营销影响最大的观念”；2009年，再次推出了定位理论新作《重新定位》。其他作品还包括《商战》《22条商规》《与众不同》《显而易见》《营销革命》《人生定位》《简单的力量》《什么是战略》等畅销书。\n艾·里斯（Al Ries）\n里斯伙伴（全球）营销公司主席，营销史上的传奇大师、全球最顶尖的营销战略家、定位理论创始人之一。2008年，作为营销战略领域的唯一入选者，与“管理学之父”彼得·德鲁克、通用电气公司前CEO杰克·韦尔奇一起被美国《广告时代》评为“全球十大顶尖商业大师”。目前，艾·里斯专门辅导《财富》500强企业（如微软、宝洁、通用电气等）的营销战略。\n译者简介：\n邓德隆，特劳特伙伴公司全球总裁。深研定位理论二十余年，与\"定位之父\"杰克?特劳特先生共同工作超过15年。一直致力于在中国倡导并实践特劳特定位理论，被誉为\"中国定位第一人\"。2001年7月，被杰克?特劳特先生核准并授权为中国区唯一合伙人。2017年1月，被\"定位之父\"杰克?特劳特先生任命为全球总裁。其著作《2小时品牌素养》持续畅销多年，另著有《中国企业如何定战略》等。\n火华强，特劳特中国公司创始合伙人。专注定位理论的研究与实践十五年。参与了特劳特中国公司大部分定位咨询项目的研究与实践，包括加多宝凉茶、东阿阿胶、瓜子二手车、劲霸男装、诺贝尔瓷砖、老乡鸡快餐、安吉尔净饮水等。译有《与众不同》和《什么是战略》, 合著有《中国企业如何定战略》。", "summary": "国际部分\nIBM成功转型，重铸辉煌\n西南航空后来居上，市值超美国航空业三强总和\n其他实践定位的企业：惠普、宝洁、汉堡王、美林、默克、雀巢、施乐、百事、宜家、雷普索尔等《财富》500强企业，“棒！约翰”、莲花公司、泽西联合银行、ECO饮用水、七喜……\n国内部分\n东阿阿胶：从边缘化补血药物，重新定位为“滋补国宝”，10年间市值从22亿元到400多亿元\n瓜子网：将“网上二手车C2C交易模式”，清晰定位为“二手车直卖网”，创办2年估值25亿美元\n加多宝：将区域性药饮“凉茶”，定位为“预防上火的饮料”，销售额从1亿元到200多亿元\n其他实践定位的企业：郎酒、劲霸男装、诺贝尔瓷砖、老乡鸡快餐、安吉尔净饮水、草晶华破壁草本、分众传媒、明月镜片、贝蒂斯橄榄油……\n2001年，美国营销学会评选“定位”为“有史以来对美国营销影响最大的观念”。2009年，美国《广告时代》杂志评选《定位》为“史上最佳营销经典”第一名。解密营销混战的误区、陷阱与机遇，如果不阅读此书就开战，胜利将无从谈起。你死我活的竞争时代，令人警醒的实战经典。《显而易见》可能会得罪不少人，因为营销大师特劳特第一次揭露了营销界的一团糟现状。广告人被指责只会寻找创意，而非营销的真相。营销人员被指责患上了大企业狂妄症，深陷复杂的方案中无力自拔。互联网被指责制造了更多的混乱。一些超级企业被指责，因其注定要倒霉的营销规划或缺乏正确的战略。特劳特的语言幽默风趣，观点一针见血，在层层梳理了营销的种种混乱后，他给出了解困之道。", "price": "59.00" }

  },
  getUserScore: function() {
    this.setData({
      curUserScore: 150
    })
  },
  getBookDetail: function(isbn) {
    var book = this.mockBookDetail()
    book.summary = book.summary.replace(/\n/g, "\n\n")
    book.author_intro = book.author_intro.replace(/\n/g, "\n\n")
    book.catalog = book.catalog.replace(/\n/g, "\n\n")
    book.status = this.data.bookStatus

    this.setData({
      book: book
    })
  },
  confirmScoreCost: function() {
    var isbn = this.data.book.isbn

    wx.showModal({
      title: '书币消耗确认',
      content: this.data.curUserScore > 10 ? "此次借阅将消耗 10 书币" : "您的书币不足",
      confirmText: this.data.curUserScore > 10 ? "确认" : "查看赚取方法",
      confirmColor: "#AFCB21",
      success: (res) => {
        if (res.confirm) {
          if (this.data.curUserScore < 10) {
            wx.navigateTo({
              url: '/pages/my/scorerule',
            })
          } else {
            //确认借阅
            var hintText = "成功"
            if (this.data.bookStatus == 1) {
              hintText = "借阅成功！\n请注意接收公众号快递提醒消息！";
            } else if (this.data.bookStatus == 2) {
              hintText = "预约成功！\n有库存时会通过公众号提醒您！";
            }
            wx.showToast({
              title: hintText,
              icon: 'none'
            })
          }
        }
      }
    })
  },
  submitOrder: function() {
    //预约
    this.submitBorrow()
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

    //看是否关注公众号
    var isSubscribed = true
    if (!isSubscribed) {
      wx.showToast({
        title: '关注公众号，才可以借阅！',
      })
      return
    }

    var userInfo = app.globalData.userInfo
    if (!userInfo) {
      //未授权，先获取授权
      wx.navigateTo({
        url: '/pages/index/index?switchTab=false&url=/pages/books/detail?isbn=' + this.data.book.isbn,
      })
      return;
    }

    //看是否填写邮寄地址
    var hasMail = wx.getStorageSync(this.data.storageKeyHasMail)
    if (!hasMail) {
      //先去填写邮寄地址
      wx.navigateTo({
        url: '/pages/books/mail',
      })
      return
    }

    //可以借
    this.confirmScoreCost()
  },
  gotoScore: function() {
    wx.navigateTo({
      url: '/pages/my/scorerule',
    })
  }
})