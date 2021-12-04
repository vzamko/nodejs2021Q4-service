const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(boardRouter.routes()).use(boardRouter.allowedMethods());
app.use(taskRouter.routes()).use(taskRouter.allowedMethods());

module.exports = app;
