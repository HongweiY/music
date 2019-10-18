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
    saveMusicObj.uid = 1;
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
    }
}