//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const apiKey = app.globalData.JDApiKey
const apiSign = app.globalData.JDshowapi_sign
const api = require('../api/api.js')
const jokeUrl = api.JDUrl + '/showapi/';    //爬的别人的图片，然而做了防盗链，JD-GDX
const newsChannelUrl = api.JDUrl + '/jisuapi/channel';
const newsListUrl = api.JDUrl + '/jisuapi/get';
// https://way.jd.com/jisuapi/channel?appkey=846ff9e774b8cbbb29bf536d4a04b06d
// https://way.jd.com/jisuapi/get?channel=娱乐&num=10&start=0&appkey=846ff9e774b8cbbb29bf536d4a04b06d

Page({
    data: {
        // 页面配置
        winWidth: 0,
        winHeight: 0,
        currentTab: 0, // tab切换
        page: 1,
        pageSize: 10,
        textDataList: [],
        topNum: 0,
        floorstatus: false,
        newsList0: [],
        newsList1: [],
        newsList2: [],
        newsList3: [],
        newsList4: [],
        newsList5: [],
        newsList6: [],
        newsList7: [],
        newsList8: [],
        newsList9: [],
        newsList10: [],
        newsList11: [],
        newsList12: [],
        newsList13: [],
        newsList14: [],
        newsList15: [],
        newsList16: [],
        currentChannel: '',
        newsChannelList: []
    },
    scrollToBottom(e) {
        let self = this
        self.setData({
            page: this.data.page + 1
        }, () => {
            self.requestMoreData()
        })
    },
    requestChannelData: function() {
        let self = this
        if (wx.getStorageSync('newsChannelList') && wx.getStorageSync('newsChannelList').length > 0) {
            self.setData({
                newsChannelList: wx.getStorageSync('newsChannelList')
            })
            return
        }
        // https://way.jd.com/jisuapi/channel?appkey=846ff9e774b8cbbb29bf536d4a04b06d
        let reqUrl = newsChannelUrl + '?appkey=' + apiKey
        app.fetchApi(reqUrl, res => {
            self.setData({
                newsChannelList: res.data.result.result
            })
            wx.setStorageSync('newsChannelList', self.data.newsChannelList)
        })
    },
    requestData: function () {
        let self = this
        //https://way.jd.com/showapi/wbxh?page=1&maxResult=20&showapi_sign=bd0592992b4d4050bfc927fe7a4db9f3&appkey=846ff9e774b8cbbb29bf536d4a04b06d
        // let reqUrl = jokeUrl + 'wbxh?maxResult=' + self.data.pageSize + '&page=' + self.data.page + '&showapi_sign=' + apiSign + '&appkey=' + apiKey
        //https://way.jd.com/jisuapi/get?channel=娱乐&num=10&start=0&appkey=846ff9e774b8cbbb29bf536d4a04b06d
        let reqUrl = newsListUrl + '?channel='+ self.data.currentChannel +'&num=' + self.data.pageSize + '&start=' + self.data.page + '&appkey=' + apiKey
        let newsList = `newsList${self.data.currentTab}`;
        app.fetchApi(reqUrl, res => {
            self.setData({
                [newsList]: res.data.result.result.list
            })
        })
    },
    requestMoreData: function () {
        let self = this
        //https://way.jd.com/showapi/wbxh?page=1&maxResult=20&showapi_sign=bd0592992b4d4050bfc927fe7a4db9f3&appkey=846ff9e774b8cbbb29bf536d4a04b06d
        let reqUrl = jokeUrl + 'wbxh?maxResult=' + self.data.pageSize + '&page=' + self.data.page + '&showapi_sign=' + apiSign + '&appkey=' + apiKey
        app.fetchApi(reqUrl, res => {
            self.setData({
                textDataList: self.data.textDataList.concat(res.data.result.showapi_res_body.contentlist)
            })
        })
    },
    refresh() {
        let self = this
        self.setData({
            page: 1
        }, () => {
            self.requestData('textDataList');
        })
    },
    // 获取滚动条当前位置
    scrolltoupper: function (e) {
        let t = e.detail.scrollTop;
        if (t > 600 && !this.data.floorstatus) {
            // 避免重复setData
            this.setData({
                floorstatus: true
            });
        }
        if (t <= 600 && this.data.floorstatus) {
            this.setData({
                floorstatus: false
            });
        }
    },
    toTop(e) {
        // wx.pageScrollTo({
        //     scrollTop: 10,
        // })
        this.setData({
            topNum: 0
        })
    },
    // 滑动切换tab
    swiperChange(e) {
        console.log('滑动切换',e)
        let self = this
        if (e.detail.hasOwnProperty('current')) {
            self.setData({
                currentTab: e.detail.current,
                currentChannel: self.data.newsChannelList[parseInt(e.detail.current)]
            });
            if (self.data[`newsList${e.detail.current}`].length == 0) {
                self.requestData();
            }
        }
    },
    // 点击tab切换
    switchNav: function (e) {
        console.log('点击tab',e)
        var self = this;
        if (e.currentTarget.dataset.hasOwnProperty('current')) {
            if (self.data.currentTab == e.currentTarget.dataset.current) {
                return false;
            } else {
                self.setData({
                    currentTab: e.currentTarget.dataset.current,
                    currentChannel: self.data.newsChannelList[parseInt(e.currentTarget.dataset.current)]
                })
            }
        }
    },
    previewImage(e) {
        console.log(e)
        wx.previewImage({
            urls: [e.currentTarget.dataset.current]
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
                console.log(clientWidth, clientHeight, rpxR, calc)
                self.setData({
                    winHeight: clientHeight
                });
            }
        });
        self.requestChannelData();
        self.requestData();
    }
})
