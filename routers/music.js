const Router = require('koa-router');
const musicController = require('../controllers/musicController');
let musicRouter = new Router();
//添加音乐
musicRouter.post('/music/addMusic', musicController.addMusic)
    .put('/music/update', musicController.updateMusic)
    .delete('/music/delete', musicController.deleteMusic)
    .get('/music/index',musicController.indexPage)
    .get('/music/add', async ctx => {
        ctx.render('add');
    })
    .get('/music/edit', musicController.editMusicPage);

module.exports = musicRouter
