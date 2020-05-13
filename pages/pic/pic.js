//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const apiKey = app.globalData.JDApiKey
const apiSign = app.globalData.JDshowapi_sign
const api = require('../api/api.js')
const jokeUrl = api.JDUrl + '/showapi/'//爬的别人的图片，然而做了防盗链，JD-GDX
// https://way.jd.com/jisuapi/channel?appkey=846ff9e774b8cbbb29bf536d4a04b06d
// https://way.jd.com/jisuapi/get?channel=娱乐&num=10&start=0&appkey=846ff9e774b8cbbb29bf536d4a04b06d

Page({
    data: {
        // 页面配置
        winWidth: 0,
        winHeight: 0,
        page: 1,
        pageSize: 10,
        textDataList: [],
        topNum: 0,
        floorstatus: false,
    },
    scrollToBottom(e) {
        let self = this
        self.setData({
            page: this.data.page + 1
        }, () => {
            self.requestMoreData()
        })
    },
    requestData: function () {
        let self = this
        //https://way.jd.com/showapi/wbxh?page=1&maxResult=20&showapi_sign=bd0592992b4d4050bfc927fe7a4db9f3&appkey=846ff9e774b8cbbb29bf536d4a04b06d
        let reqUrl = jokeUrl + 'wbxh?maxResult=' + self.data.pageSize + '&page=' + self.data.page + '&showapi_sign=' + apiSign + '&appkey=' + apiKey
        app.fetchApi(reqUrl, res => {
            self.setData({
                textDataList: res.data.result.showapi_res_body.contentlist
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
        self.requestData();
    }
})
