const Router = require('koa-router');
const musicController = require('../controllers/musicController')
let musicRouter = new Router();
//添加音乐
musicRouter.post('/music/add',musicController.addMusic)
    .post('/music/update',musicController.updateMusic)
    .get('/music/index', async ctx => {
        ctx.render('index');
    })
    .get('/music/add', async ctx => {
        ctx.render('add');
    })
    .get('/music/edit', async ctx => {
        ctx.render('edit');
    })

module.exports = musicRouter;
