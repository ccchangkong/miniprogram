//index.js
//获取应用实例
const app = getApp()
const relationship = require('../../utils/relationship.min.js')
const refs = require('../../utils/data.js')
Page({
  data: {
    objList: [],
    textList: [],
    msg: '',
    result: '',
    resultReverse:'',
    ref: refs.ref,
    selfSex: 1,
    sexList: [
      { name: '男', value: 1, checked: true},
      { name: '女', value: 0 }
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  radioChange: function (e) {
    this.setData({
      selfSex: e.detail.value
    })
    this.allClaer()


  },
  tapItem(event) {

    let $el = event.target.dataset['item']
    if ((this.data.objList.length && (this.data.objList[this.data.objList.length - 1]['sex'] == $el['sex'] && ($el['name'] == '夫' || $el['name'] == '妻'))) || (!this.data.objList.length && (this.data.selfSex == $el['sex'] && ($el['name'] == '夫' || $el['name'] == '妻')))) {
      wx.showToast({
        title: '同性是算不出的哟',
        icon: 'none',
        duration: 1000
      })

    } else {
      this.data.objList.push($el)
      this.rel()
    }

    // if (this.data.objList.length){
    //   if (this.data.objList[this.data.objList.length - 1]['sex'] == $el['sex'] && ($el['name'] == '夫' || $el['name'] == '妻')){
    //     wx.showToast({
    //       title: '同性是算不出的哟',
    //       icon: 'none',
    //       duration: 1000
    //     })
    //   }else{
    //     this.data.objList.push($el)
    //     this.rel()
    //   }

    // }else{

    //   if (this.data.selfSex == $el['sex'] && ($el['name'] == '夫' || $el['name'] == '妻')) {
    //     wx.showToast({
    //       title: '同性是算不出的哟',
    //       icon: 'none',
    //       duration: 1000
    //     })
    //   }else{
    //     this.data.objList.push($el)
    //     this.rel()
    //   }
    // }

  },
  claer() {
    this.data.objList.pop()
    this.rel()
  },
  allClaer() {
    this.data.objList = []
    this.rel()
  },
  rel() {
    let textList = []
    let str = ''
    this.data.objList.forEach(el => {
      return textList.push(el.value)
    })
    str = textList.join('的')
    this.setData({
      msg: str,
      result: relationship({ text: str, sex: this.data.selfSex }),
      resultReverse: relationship({ text: str, sex: this.data.selfSex, reverse: true })
    })
  },
  onLoad: function () {
    // console.log(refs.ref)
    // this.setData({
    //   msg: relationship({ text: '儿子的爸爸的妈妈', sex: 1 })
    // })
  },
})
