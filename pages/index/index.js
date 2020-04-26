//获取应用实例 
const app = getApp()
const util = require('../../utils/util.js')
const apiKey = app.globalData.apiKey
const api = require('../api/api.js')
const jokeUrl = api.CSDNUrl+'/getJoke'

Page({
    data: {
        // 页面配置
        winWidth: 0,
        winHeight: 0,
        // tab切换
        currentTab: 0,
        type: '',
        typeArr: ['','text','image','gif','video'],
        page: 1,
        pageSize: 10,
        hotDataList: [],
        textDataList: [],
        imageDataList: [],
        gifDataList: [],
        videoDataList: [],
        topNum: 0,
        floorstatus: false,
    },
    // 滑动切换tab
    swiperChange: function (e) {
        console.log('滑动切换',e)
        var self = this;
        if (e.detail.hasOwnProperty('current')) {
            self.setData({
                currentTab: e.detail.current,
                type: self.data.typeArr[e.detail.current],
            });
            switch (self.data.type) {
                case 'text':
                    if (self.data.textDataList.length == 0) {
                        self.setData({
                            page: 1
                        })
                        self.requestData('textDataList');
                    }
                    break
                case 'image':
                    if (self.data.imageDataList.length == 0) {
                        self.setData({
                            page: 1
                        })
                        self.requestData('imageDataList');
                    }
                    break
                case 'gif':
                    if (self.data.gifDataList.length == 0) {
                        self.setData({
                            page: 1
                        })
                        self.requestData('gifDataList');
                    }
                    break
                case 'video':
                    if (self.data.videoDataList.length == 0) {
                        self.setData({
                            page: 1
                        })
                        self.requestData('videoDataList');
                    }
                    break
                default:
                    if (self.data.hotDataList.length == 0) {
                        self.setData({
                            page: 1
                        })
                        self.requestData('hotDataList');
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
                    case 'text':
                        if (self.data.textDataList.length == 0) {
                            self.setData({
                                page: 1
                            })
                            self.requestData('textDataList');
                        }
                        break
                    case 'image':
                        if (self.data.imageDataList.length == 0) {
                            self.setData({
                                page: 1
                            })
                            self.requestData('imageDataList');
                        }
                        break
                    case 'gif':
                        if (self.data.gifDataList.length == 0) {
                            self.setData({
                                page: 1
                            })
                            self.requestData('gifDataList');
                        }
                        break
                    case 'video':
                        if (self.data.videoDataList.length == 0) {
                            self.setData({
                                page: 1
                            })
                            self.requestData('videoDataList');
                        }
                        break
                    default:
                        if (self.data.hotDataList.length == 0) {
                            self.setData({
                                page: 1
                            })
                            self.requestData('hotDataList');
                        }
                        break
                }
            }
        }
    },
    scrollToBottom(e) {
        let self = this
        switch (self.data.type) {
            case 'text':
                self.setData({
                    page: this.data.page + 1
                },() => {
                    self.requestMoreData('textDataList',self.data.textDataList)
                })
                break
            case 'image':
                self.setData({
                    page: this.data.page + 1
                },() => {
                    self.requestMoreData('imageDataList',self.data.imageDataList)
                })
                break
            case 'gif':
                self.setData({
                    page: this.data.page + 1
                },() => {
                    self.requestMoreData('gifDataList',self.data.gifDataList)
                })
                break
            case 'video':
                self.setData({
                    page: this.data.page + 1
                },() => {
                    self.requestMoreData('videoDataList',self.data.videoDataList)
                })
                break
            default:
                self.setData({
                    page: this.data.page + 1
                },() => {
                    self.requestMoreData('hotDataList',self.data.hotDataList)
                })
                break
        }
    },
    requestData: function(list) {
        let self = this
        let reqUrl = jokeUrl+'?count='+self.data.pageSize+'&page='+self.data.page+'&type='+self.data.type
        app.fetchApi(reqUrl, res =>{
            self.setData({
                [list]: res.data.result
            })
        })
    },
    requestMoreData: function(list, dataList) {
        let self = this
        let reqUrl = jokeUrl+'?count='+self.data.pageSize+'&page='+self.data.page+'&type='+self.data.type
        app.fetchApi(reqUrl, res =>{
            self.setData({
                [list]: dataList.concat(res.data.result)
            })
        })
    },
    refresh() {
        let self = this
        switch (self.data.type) {
            case 'text':
                self.setData({
                    page: 1
                },() => {
                    self.requestData('textDataList');
                })
                break
            case 'image':
                self.setData({
                    page: 1
                },() => {
                    self.requestData('imageDataList');
                })
                break
            case 'gif':
                self.setData({
                    page: 1
                },() => {
                    self.requestData('gifDataList');
                })
                break
            case 'video':
                self.setData({
                    page: 1
                },() => {
                    self.requestData('videoDataList');
                })
                break
            default:
                self.setData({
                    page: 1
                },() => {
                    self.requestData('hotDataList');
                })
                break
        }
    },
    // 获取滚动条当前位置
    scrolltoupper:function(e){
        let t =  e.detail.scrollTop;
        if (t > 600 && !this.data.floorstatus) {
            // 避免重复setData
            this.setData({
                floorstatus: true
            });
        }
        if(t <= 600 && this.data.floorstatus){
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
                console.log(clientWidth,clientHeight,rpxR,calc)
                self.setData({
                    winHeight: clientHeight
                });
            }
        });
        // https://api.apiopen.top/getJoke?page=1&count=2&type=video
        // https://api.apiopen.top/getSingleJoke?sid=28654780
        self.requestData('hotDataList');
    }
}) 
