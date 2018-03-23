//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  dealData: function (questions) {
    console.log(questions[0].choices)
    if (questions[0].choices[0].value)
      return questions
    var n = questions.length
    for (var i = 0; i < n; ++i) {
      var tmp = questions[i].choices
      var ans = questions[i].answer
      var choices = new Array()
      for (var j = 0; j < tmp.length; ++j) {
        if (app.in_array(tmp[j],ans)) {
          choices[j] = { value: tmp[j], flag: 'choiceGreen' }
        }
        else {
          choices[j] = { value: tmp[j] }
        }
      }
      questions[i].choices = choices
    }
    return questions
  },
  goToQuestion: function() {
    /*wx.request({
      url: '#',
      data: {
        openId: app.globalData.openId
      },
      success: function (res) {
        if (res.status == 0) {
          app.globalData.questions = dealData(res.resultMsg)
          wx.navigateTo({
            url: '../question/question'
          })
        }

      }
    })*/
    app.globalData.questions = this.dealData(app.globalData.questions)
    app.globalData.score = 0
    wx.navigateTo({
      url: '../question/question'
    })
  },
  goToRank: function () {
    /*wx.request({
      url: '#',
      data: {
        openId: app.globalData.openId
      },
      success: function (res) {
        if (res.status == 0) {
          app.globalData.rank = res.resultMsg
          wx.navigateTo({
            url: '../rank/rank'
          })
        }        
      }
    })*/
    wx.navigateTo({
      url: '../rank/rank'
    })
  }
})
