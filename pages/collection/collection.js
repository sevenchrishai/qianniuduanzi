//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        activityContent: "",
        meituanContent: "",
        elmeContent: "",
        req: []
    },
    init() {
        let self = this
        self.setData({
            activityContent: `618快要到啦~
每天都可以领红包呢
复制这条信息
$LhYa1rtUB3u$，
到【手机淘宝】就可以领啦
<每天可以领三次哦>
ps. 听说第一天领的都是大红包哦`,
            meituanContent: `~ 美团外卖券 ~
点击链接领取
http://tb.v2b3.com/3LV6E
也可扫码领取
<可每天领一次>`,
            elmeContent: `~ 饿了么外卖券 ~
复制这条口令，$Qpia1pmUz9y$，
到【手机淘宝】即可查看
也可扫码领取
<可每天领一次>`,
        })
    },
    onLoad() {
        let self = this
        this.init()

    }
})

