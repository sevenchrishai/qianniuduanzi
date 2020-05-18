//获取应用实例
const app = getApp()
const api = require('../api/api.js')
const util = require('../../utils/util.js')
const meiziListUrl = api.GANKUrl;
Page({
    data: {
        dataList: [],
        page: 1,
        pageSize: 10,
        imgList: []
    },
    requestData: function () {
        let self = this
        //https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/10（数量最小是10）
        let reqUrl = meiziListUrl + '/page/' + self.data.page + '/count/' + self.data.pageSize
        app.fetchApi(reqUrl, res => {
            if (res.data.data && res.data.data.length > 0) {
                let imgList = []
                res.data.data.map((item) => {
                    item.date = util.formatTimeMonthYear(item.createdAt)[0]
                    item.monthYear = util.formatTimeMonthYear(item.createdAt)[1]
                    imgList.push(item.url)
                })
                self.setData({
                    dataList: res.data.data,
                    imgList
                })
            }
        })
    },
    requestMoreData: function () {
        let self = this
        let reqUrl = meiziListUrl + '/page/' + self.data.page + '/count/' + self.data.pageSize
        app.fetchApi(reqUrl, res => {
            if (res.data.data && res.data.data.length > 0) {
                let imgList = []
                res.data.data.map((item) => {
                    item.date = util.formatTimeMonthYear(item.createdAt)[0]
                    item.monthYear = util.formatTimeMonthYear(item.createdAt)[1]
                    imgList.push(item.url)
                })
                self.setData({
                    dataList: self.data.dataList.concat(res.data.data),
                    imgList: self.data.imgList.concat(imgList)
                })
            }
        })
    },
    onReachBottom() {
        let self = this
        self.setData({
            page: this.data.page + 1
        },() => {
            self.requestMoreData()
        })
    },
    previewImage(e) {
        console.log(e)
        let self = this
        wx.previewImage({
            current: e.currentTarget.dataset.current,
            urls: self.data.imgList
        })
    },
    onLoad() {
        let self = this;
        self.requestData();
    }
})

