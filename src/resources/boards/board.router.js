const Router = require('@koa/router');
const boardsService = require('./board.service');
const {uuidValidator, entityExistValidator} = require('../../common/utils/common.validator');
const {boardCreateValidator, boardUpdateValidator} = require('./utils/board.validator');
const serverError = require('../../common/utils/serverError');

const router = new Router({
  prefix: '/boards'
});

router.get('/', ctx => {
  try {
    const boards = boardsService.getAll();
    ctx.body = boards.map(board => (board.toResponse()));
  } catch (e) {
    serverError(ctx);
  }
});

router.get('/:id', ctx => {
  const {id} = ctx.params;

  if (uuidValidator(id, ctx)) {
    return;
  }

  if (entityExistValidator(id, 'board', ctx)) {
    return;
  }

  try {
    ctx.body = boardsService.getBoardById(id).toResponse();
  } catch (e) {
    serverError(ctx);
  }
});

router.post('/', ctx => {
  let board = ctx.request.body;

  if (boardCreateValidator(board, ctx)) {
    return;
  }

  try {
    board = boardsService.createBoard(board);
    ctx.response.status = 201;
    ctx.body = board.toResponse();
  } catch (e) {
    serverError(ctx);
  }
});

router.put('/:id', ctx => {
  const {id} = ctx.params;

  if (uuidValidator(id, ctx)) {
    return;
  }

  if (entityExistValidator(id, 'board', ctx)) {
    return;
  }

  if (boardUpdateValidator(ctx.request.body, ctx)) {
    return;
  }

  try {
    const board = boardsService.updateBoard(id, ctx.request.body);
    ctx.response.status = 200;
    ctx.body = board.toResponse();
  } catch (e) {
    serverError(ctx);
  }
});

router.delete('/:id', ctx => {
  const {id} = ctx.params;

  if (uuidValidator(id, ctx)) {
    return;
  }

  if (entityExistValidator(id, 'board', ctx)) {
    return;
  }

  try {
    boardsService.deleteBoard(id);
    ctx.response.status = 204;
  } catch (e) {
    serverError(ctx);
  }
});

module.exports = router;
