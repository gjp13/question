// pages/question/question.js
const app = getApp()
var interval = 4 * 1000
var total_micro_second = interval


function countdown(that) {
  that.setData({
    clock: dateformat(total_micro_second)
  })

  if ((total_micro_second <= 0 || 0) && that.data.index < that.data.questions.length) {
    that.setData({
      index: that.data.index+1,
      finishFlag: true
    });
    var question = that.data.question
    total_micro_second = interval
    if (question.answer.length == 1){
      for (var i=0; i < question.choices.length; ++i) {
        if (that.data.selected == question.choices[i].value) {
          question.choices[i].checked = true
          if (!app.in_array(that.data.selected, question.answer)) {
            question.choices[i].flag = 'choiceRed'
          }
          break
        }
      }
      if (that.data.selected == question.answer){
        that.setData({
          score: that.data.score + 10
        })
      }
    }
    else{
      var flag = true
      var item
      console.log(that.data.selected)
      for (item in that.data.selected) {   
        console.log(question.choices.length)
        for (var i=0; i < question.choices.length; ++i) {
          console.log(item + ' ' + question.choices[i].value)
          if (that.data.selected[item] == question.choices[i].value) {
            console.log('1')
            question.choices[i].checked = true
            if (!app.in_array(that.data.selected[item], question.answer)) {
              flag = false
              question.choices[i].flag = 'choiceRed'
            }
          }
        }  
      }
      if (flag && that.data.selected.length == question.answer.length){
        that.setData({
          score: that.data.score + 10//that.data.question.score
        })
      }
    }
    that.setData({
      selected : '',
      question : question
    })
    console.log(that.data.question.choices)
    return
    
  }
  else if (that.data.index == that.data.questions.length){
    return
  }
  setTimeout(function () {
    total_micro_second -= 10
    countdown(that)
  }
    , 10)
}

function dateformat(micro_second) {
  var second = Math.floor(micro_second / 1000)
  return second
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clock: '',
    questions: app.globalData.questions,
    index: 0,
    score: 0,
    question: app.globalData.questions[0],
    finishFlag: false,
    selected:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    countdown(this)
  },

  nextQuestion: function (options) {
    if (this.data.index < this.data.questions.length){
      this.setData({
        question: this.data.questions[this.data.index],
        finishFlag: false
      })
      
      this.onLoad()
    }
    else{
      console.log(this.data.score)
      /*wx.request({
        url: '#',
        data: {
          score: this.data.score
        },
        success: function (res) {
        }
      })*/
      app.globalData.score = this.data.score
      console.log(app.globalData.score)
      wx.redirectTo({
        url: '../result/result'
      })
    }
  },
  radioChange: function (e) {
    this.setData({
      selected: e.detail.value
    })
  },
  checkboxChange: function (e) {
    this.setData({
      selected: e.detail.value
    })
  },
  submit: function () {
    total_micro_second=0
  }
})