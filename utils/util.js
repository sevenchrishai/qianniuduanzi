function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function formatTimeMonthYear(date) {
    let newDate = new Date(date)
    let day = newDate.getDate()
    let monthYear = `${newDate.getMonth() + 1}月, ${newDate.getFullYear()}`
    return [day, monthYear]
}

const wxRequest = function (url, method, params, callBack) {
    wx.showLoading({
        title: '加载中',
        icon: "loading"
    })
    wx.request({
        url: url,
        method: method,
        data: params || {},
        header: {
            'content-type': 'application/json'
        },
        success: res => {
            wx.hideLoading()
            console.log('request success', res)
            callBack(res)
        },
        fail: err => {
            wx.hideLoading()
            console.log('request fail', err)
            wx.showToast({
                title: '加载错误',
                icon: 'none',
                duration: 1000
            })
        }
    })

}

module.exports = {
    formatTime: formatTime,
    wxRequest: wxRequest,
    formatTimeMonthYear: formatTimeMonthYear
}
