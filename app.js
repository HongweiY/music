const Koa = require('koa');
const path = require('path');

//const bodyParser = require('koa-bodyparser');
const formidable = require('koa-formidable')
const session = require('koa-session');
const musicRouter = require('./routers/music');
const userRouter = require('./routers/user');


//创建服务器
let app = new Koa();
let { appPort, viewDir, publicDir, uploadDir } = require('./config')
//开启服务器
app.listen(appPort, () => {

});

//模板渲染
const render = require('koa-art-template');
render(app, {
    debug: true,
    extname: '.html',
    root: viewDir,
});


//static
let rewriteUrl = require('./middleware/rewrite')
let error = require('./middleware/error');

app.use(error());
app.use(rewriteUrl(require('./rewriteurlConfig')));

 

//处理静态资源
app.use(require('koa-static')(publicDir));
//使用session
let store = {
    storage: {},
    set(key, session) {
        this.storage[key] = session;
    },
    get(key) {
        return this.storage[key];
    },
    destroy(key) {
        delete this.storage[key];
    }
};
//基于keys字符串进行签名的运算，保证数据不被修改
app.keys = ['ymfsder'];
app.use(session({ store: store }, app));

//中间体数据
// app.use(bodyParser());
app.use(formidable({
    uploadDir: uploadDir,
    keepExtensions: true,//保持后缀名
}));


//中间件使用

app.use(userRouter.routes())
app.use(musicRouter.routes())


//处理404 405
app.use(userRouter.allowedMethods());


