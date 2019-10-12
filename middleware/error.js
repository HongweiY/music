module.exports = (option) => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            ctx.render('error', { msg: e.message })
        }
    }
}
