//导入验证与加密方法
const untils = require('../../utils/util')
const md5 = require('../../utils/md5.js')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showpass: true
    },

    showpassword() {
        this.setData({
            showpass: !this.data.showpass
        })
    },

    //登录
    formSubmit(event) {
        let userlogin = (event.detail.value.userlogin).trim();
        let userpass = (event.detail.value.userpass).trim();
        if (userlogin == "" || userpass == "") {
            wx.showToast({
                title: '不能为空！',
            })
            return;
        }
        //验证手机号是否合法
        if (!untils.isPhone(userlogin)) {
            wx.showToast({
                title: '手机号不合法',
                icon: 'error',
                duration: 2000
            });
            return;
        }
        //数据库验证登录信息
        wx.cloud.callFunction({
            name: 'userinfo',
            data: {
                $url: 'userlogin',
                userlogin,
                userpass: md5.hexMD5(userpass)
            }
        }).then(res => {
            console.log(res);
            wx.setStorage({
                key: "userid",
                data: res.result[0]._id
            })
            wx.switchTab({
                url: '/pages/index/index',
            })
        }).catch(err => {
            wx.showToast({
                title: '用户名或密码错误',
                icon: 'error',
                duration: 2000
            })
        })
    },
    //跳转到用户注册页面
    userReg() {
        wx.navigateTo({
            url: '../userReg/userReg',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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