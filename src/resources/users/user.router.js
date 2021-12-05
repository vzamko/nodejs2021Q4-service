const Router = require('@koa/router');
const usersService = require('./user.service');
const {
  uuidValidator,
  entityExistValidator,
} = require('../../common/utils/common.validator');
const {
  userCreateValidator,
  userUpdateValidator,
} = require('./utils/user.validator');
const serverError = require('../../common/utils/serverError');

const router = new Router({
  prefix: '/users',
});

router.get('/', (ctx) => {
  const users = usersService.getAll();

  ctx.body = users.map((user) => user.toResponse());
});

router.get('/:id', (ctx) => {
  const { id } = ctx.params;

  if (uuidValidator(id, ctx)) {
    return;
  }

  if (entityExistValidator(id, 'user', ctx)) {
    return;
  }

  try {
    ctx.body = usersService.getUserById(id).toResponse();
  } catch (e) {
    serverError(ctx);
  }
});

router.post('/', (ctx) => {
  let user = ctx.request.body;

  if (userCreateValidator(user, ctx)) {
    return;
  }

  try {
    user = usersService.createUser(user);
    ctx.response.status = 201;
    ctx.body = user.toResponse();
  } catch (e) {
    serverError(ctx);
  }
});

router.put('/:id', (ctx) => {
  const { id } = ctx.params;

  if (uuidValidator(id, ctx)) {
    return;
  }

  if (entityExistValidator(id, 'user', ctx)) {
    return;
  }

  if (userUpdateValidator(ctx.request.body, ctx)) {
    return;
  }

  try {
    const user = usersService.updateUser(id, ctx.request.body);
    ctx.response.status = 200;
    ctx.body = user.toResponse();
  } catch (e) {
    serverError(ctx);
  }
});

router.delete('/:id', (ctx) => {
  const { id } = ctx.params;

  if (uuidValidator(id, ctx)) {
    return;
  }

  if (entityExistValidator(id, 'user', ctx)) {
    return;
  }

  try {
    usersService.deleteUser(id);
    ctx.response.status = 204;
  } catch (e) {
    serverError(ctx);
  }
});

module.exports = router;
