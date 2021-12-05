const Router = require('@koa/router');
const tasksService = require('./task.service');
const {uuidValidator, entityExistValidator} = require('../../common/utils/common.validator');
const {taskCreateValidator, taskUpdateValidator} = require('./utlis/task.validator');

const router = new Router({
  prefix: '/boards/:boardId/tasks'
});

router.get('/', ctx => {
  const {boardId} = ctx.params;

  if (uuidValidator(boardId, ctx)) {
    return;
  }

  if (entityExistValidator(boardId, 'board', ctx)) {
    return;
  }

  const tasks = tasksService.getAll();

  ctx.body = tasks.map(task => (task.toResponse()));
});

router.get('/:id', ctx => {
  const {boardId, id} = ctx.params;

  if (uuidValidator(boardId, ctx) || uuidValidator(id, ctx)) {
    return;
  }

  if (entityExistValidator(boardId, 'board', ctx) || entityExistValidator(id, 'task', ctx)) {
    return;
  }

  ctx.body = tasksService.getTaskById(id).toResponse();
});

router.post('/', ctx => {
  const {boardId} = ctx.params;

  if (uuidValidator(boardId, ctx)) {
    return;
  }

  if (entityExistValidator(boardId, 'board', ctx)) {
    return;
  }

  let task = ctx.request.body;
  task.boardId = boardId;

  if (taskCreateValidator(task, ctx)) {
    return;
  }

  task = tasksService.createTask(task);

  ctx.response.status = 201;
  ctx.body = task.toResponse();
});

router.put('/:id', ctx => {
  const {boardId, id} = ctx.params;

  if (uuidValidator(boardId, ctx) || uuidValidator(id, ctx)) {
    return;
  }

  if (entityExistValidator(boardId, 'board', ctx) || entityExistValidator(id, 'task', ctx)) {
    return;
  }

  ctx.request.body.boardId = boardId;

  if (taskUpdateValidator(ctx.request.body.boardId, ctx)) {
    return;
  }

  const task = tasksService.updateTask(id, ctx.request.body);

  ctx.response.status = 200;
  ctx.body = task.toResponse();
});

router.delete('/:id', ctx => {
  const {boardId, id} = ctx.params;

  if (uuidValidator(boardId, ctx) || uuidValidator(id, ctx)) {
    return;
  }

  if (entityExistValidator(boardId, 'board', ctx) || entityExistValidator(id, 'task', ctx)) {
    return;
  }

  tasksService.deleteTask(id);

  ctx.response.status = 204;
});

module.exports = router;
