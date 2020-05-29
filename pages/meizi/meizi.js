//获取应用实例
const app = getApp()
const api = require('../api/api.js')
const util = require('../../utils/util.js')
const meiziListUrl = api.GANKUrl;
Page({
    data: {
        winHeight: 0,
        dataList: [],
        firstData: null,
        page: 1,
        pageSize: 10
    },
    requestData: function () {
        let self = this
        //https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/10（数量最小是10）
        let reqUrl = meiziListUrl + '/page/' + self.data.page + '/count/' + self.data.pageSize
        app.fetchApi(reqUrl, res => {
            if (res.data.data && res.data.data.length > 0) {
                res.data.data.map((item) => {
                    item.date = util.formatTimeMonthYear(item.createdAt)[0]
                    item.monthYear = util.formatTimeMonthYear(item.createdAt)[1]
                })
                self.setData({
                    dataList: res.data.data,
                    firstData: res.data.data && res.data.data.length ? res.data.data[0] : null
                })
            }
        })
    },
    previewImage(e) {
        console.log(e)
        wx.previewImage({
            urls: [e.currentTarget.dataset.current]
        })
    },
    moreBtn(e) {
        wx.navigateTo({
            url: '/pages/my/my',
            success:(res)=>{
                console.log(res)
            },
            fail:(err)=>{
                console.log(err)
            }
        })
    },
    onLoad() {
        let self = this;
        // 获取系统信息
        // 高度自适应
        wx.getSystemInfo({
            success: function (res) {
                self.setData({
                    winHeight: res.windowHeight
                });
            }
        });
        self.requestData();
    }
})

