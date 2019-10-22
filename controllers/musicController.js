const musicModel = require('../models/music')
const path = require('path')
/**
 *处理上传歌曲的逻辑，编辑已经添加逻辑复用
 *
 * @param {*} ctx
 */
function optUpload(ctx) {
    let { title, singer, time } = ctx.request.body;
    let { file, fileLrc } = ctx.request.files;
    let saveMusicObj = {
        title, singer, time
    }
    saveMusicObj.fileLrc = 'non fileLrc';
    //歌词可选
    if (fileLrc) {
        saveMusicObj.fileLrc = '/public/upload' + path.parse(fileLrc.path).base;
    }
    if (!file) {
        ctx.throw('歌曲路径必填');
    }
    saveMusicObj.file = '/public/upload' + path.parse(file.path).base;
    saveMusicObj.uid =  ctx.session.user.id;;
    return saveMusicObj;
}
module.exports = {

    async addMusic(ctx, next) {
        // title,singer,time,file,file_lrc
        let saveMusicObj = optUpload(ctx);
        let result = await musicModel.addMusic(saveMusicObj);
        ctx.body = {
            code: '200',
            msg: result.message
        }
    },

    async updateMusic(ctx, next) {
        let updateMusicObj = optUpload(ctx);
        let { id } = ctx.request.body;
        Object.assign(updateMusicObj, { id });
        let updateResult = await musicModel.updateMusic(updateMusicObj);
        if (updateResult.affectedRows !== 1) {
            ctx.body = {
                code: '500',
                msg: updateResult.message
            }
            return;
        }
        ctx.body = {
            code: '200',
            msg: '更新成功'
        }
    },
    async deleteMusic(ctx, next) {
        let id = ctx.request.query.id;
        let deleteResult = await musicModel.deleteMusicByID(id);
        if (deleteResult.affectedRows === 0) {
            ctx.body = {
                code: '500',
                msg: updateResult.message
            }
            return;
        }
        ctx.body = {
            code: '200',
            msg: '删除成功'
        }
    },
    //页面编辑展示页面
    async editMusicPage(ctx, next) {
        let id = ctx.query.id;
        let musicResult = await musicModel.findMusicByID(id);
        if (musicResult.length === 0) {
            ctx.throw('参数错误');
            return;
        }
        let music = musicResult[0];
        ctx.render('edit', {
            music: music
        })
    },
    //用户歌曲页面
    async indexPage(ctx, next) {

        let uid =  ctx.session.user.id;
        console.log( ctx.session.user);
        let musicResults = await musicModel.findMusicByUID(uid);
        ctx.render('index', {
            musics: musicResults
        })

    },
   

}