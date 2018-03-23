//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          var code = res.code
          /*wx.request({
            url: '#',
            data: {
              js_code: code
            },
            success: function (res) {
              if (res.status==0){
                console.log(res.resultMsg)
                this.globalData.openId = res.resultMsg
              }
              
            }
          })*/
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }, 
  in_array: function(searchString, array) {
        for(var i = 0; i<array.length; i++) {
      if (searchString == array[i]) return true;
    }
    return false;
  },
  globalData: {
    userInfo:null,
    openId: 123456,
    questions: [
      {
        "questionDescription": "测试问题一?",
        "difficulty": "easy",
        "type": "Single",
        "choices": [
          "三个代表",
          "毛泽东思想",
          "邓小平理论",
          "科学发展观"
        ],
        "answer": [
          "科学发展观",
        ],
        "choicesString": "三个代表:::毛泽东思想:::邓小平理论:::科学发展观",
        "answerString": "科学发展观"
      },
      {
        "questionDescription": "9测试问题一?",
        "difficulty": "easy",
        "type": "Single",
        "choices": [
          "三个代表",
          "毛泽东思想",
          "邓小平理论",
          "科学发展观"
        ],
        "answer": [
          "科学发展观",
        ],
        "choicesString": "三个代表:::毛泽东思想:::邓小平理论:::科学发展观",
        "answerString": "科学发展观"
      },
      {
        "questionDescription": "25测试问题一?",
        "difficulty": "easy",
        "type": "Single",
        "choices": [
          "三个代表",
          "毛泽东思想",
          "邓小平理论",
          "科学发展观"
        ],
        "answer": [
          "科学发展观",
        ],
        "choicesString": "三个代表:::毛泽东思想:::邓小平理论:::科学发展观",
        "answerString": "科学发展观"
      },
      {
        "questionDescription": "10\"马者所以命形也：白者所以命色也。命色者非命形也，故日白马非马。\"从唯物辩证法的观点看，\"白马非马\"这一命题的错误在于",
        "difficulty": "normal",
        "type": "Multiple",
        "choices": [
          "割裂了事物共性和个性之间的联系",
          "颠倒了事物形态和功能之间的关系",
          "模糊了事物本质和现象之间的联系",
          "混淆了事物内容和形式之间的区别"
        ],
        "answer": [
          "混淆了事物内容和形式之间的区别",
          "颠倒了事物形态和功能之间的关系"
        ],
        "choicesString": "割裂了事物共性和个性之间的联系:::颠倒了事物形态和功能之间的关系:::模糊了事物本质和现象之间的联系:::混淆了事物内容和形式之间的区别",
        "answerString": "混淆了事物内容和形式之间的区别:::颠倒了事物形态和功能之间的关系"
      },
      {
        "questionDescription": "31经济建设是全党的中心工作，坚持以经济建设为中心不动据。就必须坚持以经济体制改革为重点不动据。当前，我国深化经济体制改革的重点是",
        "difficulty": "hard",
        "type": "Single",
        "choices": [
          "扩大优质增量供给，实现供需动态平衡",
          "完善产权制度和要素市场化配置",
          "加快培育国际经济合作和竞争新优势",
          "建立更加有效的区域协调发展新机制"
        ],
        "answer": [
          "完善产权制度和要素市场化配置",
        ],
        "choicesString": "扩大优质增量供给，实现供需动态平衡:::完善产权制度和要素市场化配置:::加快培育国际经济合作和竞争新优势:::建立更加有效的区域协调发展新机制",
        "answerString": "完善产权制度和要素市场化配置"
      }
    ],
    rank: {
      self: {
        "openId": "123456",
        "score": "15",
        "userName": "wjw",
        "rank": "4"
      },
      scoreVOS: [
        {
          "openId": "0123456789",
          "score": "29",
          "userName": "wjw6",
          "rank": "1"
        },
        {
          "openId": "012345678910",
          "score": "29",
          "userName": "wjw6",
          "rank": "2"
        },
        {
          "openId": "012345678",
          "score": "20",
          "userName": "wjw5",
          "rank": "3"
        },
        {
          "openId": "123456",
          "score": "15",
          "userName": "wjw",
          "rank": "4"
        },
        {
          "openId": "01234567",
          "score": "12",
          "userName": "wjw1",
          "rank": "5"
        },
        {
          "openId": "1234567",
          "score": "10",
          "userName": "wjw1",
          "rank": "6"
        }
      ]
    },
    score:0
  }
})