//获取应用实例
const app = getApp()
const api = require('../api/api.js')
const meiziListUrl = api.GANKUrl;
Page({
    data: {
        dataList: [],
        page: 1,
        pageSize: 1,
    },
    requestData: function () {
        let self = this
        //https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/10
        let reqUrl = meiziListUrl + '/page/' + self.data.page + '/count/' + self.data.pageSize
        // let reqUrl = 'https://gank.io/images/6e57b254da79416bbe58248b570ea85f'
        console.log(`时间：${new Date()}`)
        app.fetchApi(reqUrl, res => {
            self.setData({
                dataList: res.data.data || []
            })
        })
    },
    previewImage(e) {
        console.log(e)
        wx.previewImage({
            urls: [e.currentTarget.dataset.current]
        })
    },
    onLoad() {
        let self = this;
        self.requestData();
    }
})

