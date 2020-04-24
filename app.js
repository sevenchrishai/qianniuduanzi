//app.js
App({
    // 全局数据对象(整个应用程序共享)
    globalData: {
        userInfo: null,
        JHApiKey: '5717fd14e8aa4ab4bc5e30180ce9372d',
        JDApiKey: '846ff9e774b8cbbb29bf536d4a04b06d',
    },
    // 应用程序全局方法
    fetchApi(api_url, callback) {
        wx.showLoading({
            title: "加载中",
            icon: "loading"
        })
        wx.request({
            url: api_url,
            data: {},
            header: {'Content-Type': 'application/json'},
            success(res) {
                wx.hideLoading()
                console.log('request success', res)
                callback(res)
            },
            fail(e) {
                wx.hideLoading()
                console.log('request fail', e)
                wx.showToast({
                    title: '加载错误',
                    icon: 'none',
                    duration: 1000
                })
            }
        })
    },

    // 生命周期方法
    onLaunch: function () {
        // 应用程序启动时触发一次
        console.log('App Launch')
    },

    onShow: function () {
        // 当应用程序进入前台显示状态时触发
        console.log('App Show')
    },

    onHide: function () {
        // 当应用程序进入后台状态时触发
        console.log('App Hide')
    }
})