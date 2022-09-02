// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: 'ykedumyself-e0ait'
})
const TcbRouter = require('tcb-router')
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const app = new TcbRouter({
        event
    })

    //取用户openid
    app.router('getUserOpenId', async (ctx, next) => {
        const wxContext = cloud.getWXContext()
        let UserOpenId = wxContext.OPENID
        ctx.body = UserOpenId
    })
    //判断当天是否上传了位置

    //返回用户登录信息
    app.router('userlogin', async (ctx, next) => {
        let userlist = await db.collection('user')
            .where({
                userlogin: event.userlogin,
                userpass: event.userpass
            })
            .get()
            .then(res => {
                return res.data
            })

        ctx.body = userlist
    })

    //返回值
    return app.serve()
}