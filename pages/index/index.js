//获取应用实例 
const app = getApp()
const util = require('../../utils/util.js')
const apiKey = app.globalData.apiKey
const api = require('../api/api.js')
const jokeUrl = api.CSDNUrl+'/getJoke'
const singleJokerUrl = api.CSDNUrl+'/getSingleJoke'

Page({
    data: {
        // 页面配置
        winWidth: 0,
        winHeight: 0,
        // tab切换
        currentTab: 0,
        type: '',
        typeArr: ['','text','image','gif','video'],
        page: 1,
        pageSize: 10,
        hotDataList: [],
        textDataList: [],
        imageDataList: [],
        gifDataList: [],
        videoDataList: [],

    },
    // 滑动切换tab
    swiperChange: function (e) {
        console.log('滑动切换',e)
        var self = this;
        if (e.detail.current) {
            self.setData({
                currentTab: e.detail.current,
                type: self.data.typeArr[e.detail.current]
            });
        }
    },
    // 点击tab切换
    switchNav: function (e) {
        console.log('点击tab',e)
        var self = this;
        if (e.currentTarget.dataset.current) {
            if (this.data.currentTab == e.currentTarget.dataset.current) {
                return false;
            } else {
                self.setData({
                    currentTab: e.currentTarget.dataset.current,
                    type: self.data.typeArr[parseInt(e.currentTarget.dataset.current)]
                })
            }
        }
    },
    requestData: function(url, list) {
        let self = this
        let reqUrl = url+'?count='+self.data.pageSize+'&page='+self.data.page+'&type='+self.data.type
        app.fetchApi(reqUrl, res =>{
            self.setData({
                [list]: res.data.result
            })
        })
    },
    onLoad: function () {
        var self = this;
        // 获取系统信息
        // 高度自适应
        wx.getSystemInfo({
            success: function (res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR;
                console.log(clientWidth,clientHeight,rpxR,calc)
                self.setData({
                    winHeight: calc * 2
                });
            }
        });
        // https://api.apiopen.top/getJoke?page=1&count=2&type=video
        // https://api.apiopen.top/getSingleJoke?sid=28654780
        self.requestData(jokeUrl, 'hotDataList');
    }
}) 
