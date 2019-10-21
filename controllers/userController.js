const userModel = require('../models/user')
const captchapng = require('captchapng2');
module.exports = {
    registerPage: async (ctx, next) => {
        // let users = await userModel.getUsers();
        // console.log(users);
        ctx.render('register');
    },
    loginPage: async (ctx, next) => {
        ctx.render('login');
    },
    //检查用户名能否使用
    checkUsername: async (ctx, next) => {
        let { username } = ctx.request.body;
        let users = await userModel.checkUsername(username);
        console.log(users)
        if (users.length === 0) {
            ctx.body = { code: 200, msg: '可以使用' };
            return;
        }
        ctx.body = { code: 403, msg: '系统中已存在' };
    },
    //执行注册
    register: async (ctx, next) => {
        let { username, password, email } = ctx.request.body;
        let users = await userModel.checkUsername(username);
        if (users.length !== 0) {
            ctx.body = { code: 403, msg: '用户名已存在' };
            return;
        }
        //异常处理
        try {
            let result = await userModel.register(username, password, email);
            if (result.affectedRows === 1) {
                ctx.body = { code: "200", msg: '注册成功' };
                return;
            }
            ctx.body = { code: "500", msg: result.message };
        } catch (e) {
            ctx.throw(e.message)
        }

    },
    //用户登录
    login: async (ctx, next) => {
        let { username, password } = ctx.request.body;
        let users = await userModel.login(username);
        if (users.length === 0) {
            ctx.body = { code: 403, msg: '用户名不存在' };
            return;
        }
        //执行登录逻辑
        let user = await userModel.login(username);
        if (user[0].password !== password) {
            ctx.body = { code: 403, msg: '用户名或者密码错误' };
            return;
        }
        ctx.body = { code: 200, msg: '登录成功' };
        ctx.session.user = user[0];
    },
    /**
     *获取验证码
     * @param {*} ctx
     * @param {*} next
     */
    getPic(ctx, next) {
        let rand = parseInt(Math.random() * 9000 + 1000);
        let png = new captchapng(80, 30, rand); // width,height, numeric captcha
        ctx.body=png.getBuffer();
    }

}

