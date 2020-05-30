//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        imgList: [
            'https://pic.downk.cc/item/5ed1f6e8c2a9a83be53487a7.jpg',
            'https://pic.downk.cc/item/5ed1f63bc2a9a83be533b743.jpg'
        ],
        koulingList: {
            tb: '$LhYa1rtUB3u$',
            jd: '￥vAZbYAvBaa%',
            mt: 'http://tb.v2b3.com/3LV6E',
            ele: '$Qpia1pmUz9y$'
        }
    },
    init() {
        let self = this
        self.setData({
        })
    },
    copyText(e) {
        console.log(e)
        let self = this
        wx.setClipboardData({
            data: self.data.koulingList[e.currentTarget.dataset.current],
            success: function () {
                wx.showToast({
                    title: '复制成功'
                })
            }
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
        let self = this
        this.init()

    }
})

