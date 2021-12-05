const Router = require('@koa/router');
const tasksService = require('./task.service');
const {uuidValidator, entityExistValidator} = require('../../common/utils/common.validator');
const {taskCreateValidator, taskUpdateValidator} = require('./utlis/task.validator');
const serverError = require('../../common/utils/serverError');

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

  try {
    const tasks = tasksService.getAll();
    ctx.body = tasks.map(task => (task.toResponse()));
  } catch (e) {
    serverError(ctx);
  }
});

router.get('/:id', ctx => {
  const {boardId, id} = ctx.params;

  if (uuidValidator(boardId, ctx) || uuidValidator(id, ctx)) {
    return;
  }

  if (entityExistValidator(boardId, 'board', ctx) || entityExistValidator(id, 'task', ctx)) {
    return;
  }

  try {
    ctx.body = tasksService.getTaskById(id).toResponse();
  } catch (e) {
    serverError(ctx);
  }
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

  try {
    task = tasksService.createTask(task);
    ctx.response.status = 201;
    ctx.body = task.toResponse();
  } catch (e) {
    serverError(ctx);
  }
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

  try {
    const task = tasksService.updateTask(id, ctx.request.body);
    ctx.response.status = 200;
    ctx.body = task.toResponse();
  } catch (e) {
    serverError(ctx);
  }
});

router.delete('/:id', ctx => {
  const {boardId, id} = ctx.params;

  if (uuidValidator(boardId, ctx) || uuidValidator(id, ctx)) {
    return;
  }

  if (entityExistValidator(boardId, 'board', ctx) || entityExistValidator(id, 'task', ctx)) {
    return;
  }

  try {
    tasksService.deleteTask(id);
    ctx.response.status = 204;
  } catch (e) {
    serverError(ctx);
  }
});

module.exports = router;
