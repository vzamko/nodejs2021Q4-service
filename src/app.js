const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');

const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(boardRouter.routes()).use(boardRouter.allowedMethods());

module.exports = app;
