//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const apiKey = app.globalData.JHApiKey
const api = require('../api/api.js')
const jokeUrl = api.JHRandUrl

Page({
    data: {
        // 页面配置
        winWidth: 0,
        winHeight: 0,
        // tab切换
        currentTab: 0,
        type: '',
        typeArr: ['','pic'],
        textDataList: [],
        imageDataList: [],
    },
    // 滑动切换tab
    swiperChange: function (e) {
        console.log('滑动切换',e)
        var self = this;
        if (e.detail.current) {
            self.setData({
                currentTab: e.detail.current,
                type: self.data.typeArr[e.detail.current],
            });
            switch (self.data.type) {
                case 'pic':
                    if (self.data.imageDataList.length == 0) {
                        self.requestData('imageDataList');
                    }
                    break
                default:
                    if (self.data.textDataList.length == 0) {
                        self.requestData('textDataList');
                    }
                    break
            }
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
                switch (self.data.type) {
                    case 'pic':
                        if (self.data.imageDataList.length == 0) {
                            self.requestData('imageDataList');
                        }
                        break
                    default:
                        if (self.data.textDataList.length == 0) {
                            self.requestData('textDataList');
                        }
                        break
                }
            }
        }
    },
    requestData: function(list) {
        let self = this
        let reqUrl = jokeUrl+'?type='+self.data.type+'&key='+apiKey
        app.fetchApi(reqUrl, res =>{
            self.setData({
                [list]: res.data.result
            })
        })
    },
    refresh() {
        let self = this
        switch (self.data.type) {
            case 'pic':
                self.requestData('imageDataList');
                break
            default:
                self.requestData('textDataList');
                break
        }
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
                    winHeight: clientHeight
                });
            }
        });
        //https://v.juhe.cn/joke/randJoke.php?&key=5717fd14e8aa4ab4bc5e30180ce9372d&type=pic
        self.requestData('textDataList');
    }
})
