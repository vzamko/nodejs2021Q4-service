const Router = require('@koa/router');
const tasksService = require('./task.service');

const router = new Router({
  prefix: '/boards/:boardId/tasks'
});

router.get('/', ctx => {
  const tasks = tasksService.getAll();

  ctx.body = tasks.map(task => (task.toResponse()));
});

router.get('/:id', ctx => {
  const {id} = ctx.params;

  if (tasksService.getTaskById(id)) {
    ctx.body = tasksService.getTaskById(id).toResponse();

    return;
  }

  ctx.response.status = 404;
  ctx.body = "Board not found.";
});

router.post('/', ctx => {
  const {boardId} = ctx.params;

  let task = ctx.request.body;
  task.boardId = boardId;
  task = tasksService.createTask(task);

  ctx.response.status = 201;
  ctx.body = task.toResponse();
});

router.put('/:id', ctx => {
  const {boardId, id} = ctx.params;

  ctx.request.body.boardId = boardId;
  const task = tasksService.updateTask(id, ctx.request.body);

  ctx.response.status = 200;
  ctx.body = task.toResponse();
});

router.delete('/:id', ctx => {
  const {id} = ctx.params;

  tasksService.deleteTask(id);

  ctx.response.status = 204;
});

module.exports = router;
