// pages/home/home.js
const db = wx.cloud.database();
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //轮播图数组
        swiperList: [],
        //成长项目数组
        growUpItemList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getSwiperList();
        this.getuserOPID();
    },

    // 获取用户openid
    async getuserOPID() {
        const {
            result: res2
        } = await wx.cloud.callFunction({
            name: "getopenid"
        })
        app.globalData.openid = res2.openid
    },

    //从云数据库获取轮播图
    async getSwiperList() {
        try {
            const {
                data: res
            } = await db.collection('swiper').get();

            this.setData({
                swiperList: res
            });
        } catch (error) {
            wx.showModal({
                title: '提示',
                content: '数据请求失败！',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
     
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})