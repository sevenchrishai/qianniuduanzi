//获取应用实例 
var app = getApp()
var apiKey = '5717fd14e8aa4ab4bc5e30180ce9372d';
const random_url = require('../../config').randomUrl;
const newest_url = require('../../config').newestPicUrl;
Page({
  data: {
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    type: 'pic',
    page: 1,
    pagesize: 10,
    req: []
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    if (that.data.currentTab == 1) {
      that.toRequestN()
    } else {
      that.toRequestR()
    }
  },
  // 点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (that.data.currentTab == 1) {
      that.toRequestN()
    } else {
      that.toRequestR()
    }
  },
  toRequestR: function () {
    var that = this;
    console.log(random_url);
    wx.showLoading({
      title: '加载中',
      icon: "loading"
    })
    wx.request({
      url: random_url + "?type=" + that.data.type + "&key=" + apiKey,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (result) {
        wx.hideLoading();
        console.log('request success', result)
        var data = result.data;
        that.setData({
          req: data.result

        });

      },
      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)

      }
    })
  },
  toRequestN: function () {
    var that = this;
    console.log(newest_url);
    wx.showLoading({
      title: '加载中',
      icon: "loading"
    })
    wx.request({
      url: newest_url + "?page=" + that.data.page + "&pagesize=" + that.data.pagesize + "&key=" + apiKey,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (result) {
        wx.hideLoading();
        console.log('request success', result)
        var data = result.data;
        that.setData({
          req: data.result

        });

      },
      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)

      }
    })
  },
  onLoad: function () {
    var that = this;
    // 获取系统信息 
    // 高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        console.log(clientWidth)
        console.log(clientHeight)
        console.log(rpxR)
        console.log(calc)
        that.setData({
          winHeight: calc * 4
        });
      }
    });
    that.toRequestR();
  }
}) 
