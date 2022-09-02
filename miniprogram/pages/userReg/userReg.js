// pages/userReg/userReg.js
const untils = require('../../utils/util')
const md5 = require('../../utils/md5.js')
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index_school: 0,
        index_subject: 0,
        stagelist: [],
        schoolList: [{
            _id: "001",
            schoolName: '请选择学校'
        }],
        subjectList: [{
            _id: "001",
            subjectName: '请选择学科'
        }],
    },

    //取学段
    getStage() {
        db.collection("stage").get()
            .then(res => {
                console.log(res);
                this.setData({
                    stagelist: res.data
                })
            })
    },

    //取学校和学科
    async getSchool(option) {
        wx.showLoading({
            title: '数据加载中',
        })
        const stageId = option.detail.value;
        //取学校
        const {
            data: schoolRes
        } = await db.collection("schoolList").where({
            stageId,
        }).get();
        //重新选择时重置选择列表
        this.data.schoolList = [{
            _id: "001",
            schoolName: '请选择学校'
        }];
        this.setData({
            schoolList: this.data.schoolList.concat(schoolRes),
            index_school: 0
        });
        //取学科
        const {
            data: subjectRes
        } = await db.collection("subjectList").where({
            stageId,
        }).get();
        //重新选择时重置选择列表
        this.data.subjectList = [{
            _id: "001",
            subjectName: '请选择学科'
        }];
        this.setData({
            subjectList: this.data.subjectList.concat(subjectRes),
            index_subject: 0
        })
        wx.hideLoading();
    },
    //选择学科
    bindPickerChange_school(e) {
        this.setData({
            index_school: e.detail.value
        })
    },
    //选择学科
    bindPickerChange_subject(e) {
        this.setData({
            index_subject: e.detail.value
        })
    },

    //提交数据
   async  formSubmit(e) {
        wx.showLoading({
            title: '注册中...',
        })
        const RegInfo = e.detail.value;
        const stageId = RegInfo.stage;
        const schoolIndex = RegInfo.picker_school
        const subjectIndex = RegInfo.picker_subject
        const userName = RegInfo.userName.trim()
        const userLogin = RegInfo.userLogin.trim()
        const userPass1 = RegInfo.userPass1.trim()
        const userPass2 = RegInfo.userPass2.trim()

        if (stageId === "") {
            wx.showToast({
                title: '请选择学段！',
                icon: 'error',
                duration: 2000
            })
            return;
        }

        if (schoolIndex === "" || subjectIndex == "") {
            wx.showToast({
                title: '无学校和学科！',
                icon: 'error',
                duration: 2000
            })
            return;
        }
        //姓名验证
        if (!untils.isChineseName(userName)) {
            wx.showToast({
                title: '姓名至少两个汉字！',
                icon: 'error',
                duration: 2000
            });
            return;
        }
        //验证手机号是否合法
        if (!untils.isPhone(userLogin)) {
            wx.showToast({
                title: '手机号不合法',
                icon: 'error',
                duration: 2000
            });
            return;
        }
        //密码长度验证
        if (!untils.isSixNum(userPass1)) {
            wx.showToast({
                title: '至少6位字母和数字',
                icon: 'error',
                duration: 2000
            });
            return;
        }
        if (userPass1 != userPass2) {
            wx.showToast({
                title: '密码前后不一致',
                icon: 'error',
                duration: 2000
            });
            return;
        }
        const schoolId = this.data.schoolList[schoolIndex]._id;
        const subjectId = this.data.subjectList[subjectIndex]._id;
        const userPass=md5.hexMD5(userPass1);
        console.log("pass",userPass);
        //后台验证
       const {total:res}=await db.collection("user").where({
           userlogin:userLogin
        }).count();
        if(res>0){
            wx.hideLoading();
            wx.showToast({
              title: '手机号已注册！',
              icon: 'error',
              duration: 2000
            });            
            return;
        }else{
            //注册新用户
            db.collection("user").add({
                data:{
                    userName,
                    stageId,
                    schoolId,
                    subjectId,
                    userlogin:userLogin,
                    userpass:userPass,
                    regTime: db.serverDate()              
                }
            }).then(regRes=>{
                wx.hideLoading();
                wx.showToast({
                  title: '注册成功！',
                  icon:'success'
                })
                wx.navigateTo({
                  url: '../login/login',
                })                
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getStage()
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