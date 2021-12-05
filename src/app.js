const Koa = require('koa');
const { koaSwagger } = require('koa2-swagger-ui');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = new Koa();
const spec = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(bodyParser());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(boardRouter.routes()).use(boardRouter.allowedMethods());
app.use(taskRouter.routes()).use(taskRouter.allowedMethods());
app.use(
  koaSwagger({
    routePrefix: '/doc',
    swaggerOptions: {
      spec,
    },
  })
);

app.use((ctx) => {
  if (ctx.request.url === '/') {
    ctx.body = 'Service is running!';
  }
});

module.exports = app;
