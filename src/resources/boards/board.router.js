const Router = require('@koa/router');
const boardsService = require('./board.service');

const router = new Router({
  prefix: '/boards'
});

router.get('/', ctx => {
  const boards = boardsService.getAll();

  ctx.body = boards.map(board => (board.toResponse()));
});

router.get('/:id', ctx => {
  const {id} = ctx.params;

  if (boardsService.getBoardById(id)) {
    ctx.body = boardsService.getBoardById(id).toResponse();

    return;
  }

  ctx.response.status = 404;
  ctx.body = "Board not found.";
});

router.post('/', ctx => {
  let board = ctx.request.body;
  board = boardsService.createBoard(board);

  ctx.response.status = 201;
  ctx.body = board.toResponse();
});

router.put('/:id', ctx => {
  const {id} = ctx.params;

  const board = boardsService.updateBoard(id, ctx.request.body);

  ctx.response.status = 200;
  ctx.body = board.toResponse();
});

router.delete('/:id', ctx => {
  const {id} = ctx.params;

  boardsService.deleteBoard(id);

  ctx.response.status = 204;
});

module.exports = router;
