const Router = require('@koa/router');
const usersService = require('./user.service');

const router = new Router({
  prefix: '/users'
});

router.get('/', ctx => {
  const users = usersService.getAll();

  ctx.body = users.map(user => (user.toResponse()));
});

router.get('/:id', ctx => {
  const {id} = ctx.params;

  ctx.body = usersService.getUserById(id).toResponse();
});

router.post('/', ctx => {
  let user = ctx.request.body;
  user = usersService.createUser(user);
  ctx.response.status = 201;
  ctx.body = user.toResponse();
});

router.put('/:id', ctx => {
  const {id} = ctx.params;

  const user = usersService.updateUser(id, ctx.request.body);

  ctx.response.status = 200;
  ctx.body = user.toResponse();
});

router.delete('/:id', ctx => {
  const {id} = ctx.params;

  usersService.deleteUser(id);

  ctx.response.status = 204;
});

module.exports = router;
