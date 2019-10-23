module.exports = async (ctx, next) => {
    if (ctx.url.startsWith('/user')) {
        await next();
        return
    }

    if (!ctx.session.user) {
        ctx.render('notLogin');
        return;
    }
    await next();
}