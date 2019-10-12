const Router = require('koa-router');
const userController = require('../controllers/userController')

let userRouter = new Router();
userRouter.get('/user/register', userController.registerPage)
    .get('/user/login', userController.loginPage)
    .post('/user/checkUsername', userController.checkUsername)
    .post('/user/register', userController.register)
    .post('/user/login',userController.login)


module.exports = userRouter;
