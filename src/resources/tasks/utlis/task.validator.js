const taskCreateValidator = (data, ctx) => {
  if (!data.title || !data.description) {
    ctx.response.status = 400;
    ctx.body = 'Some fields are missing.';

    return true;
  }

  if (
    typeof data.title !== 'string' ||
    typeof data.order !== 'number' ||
    typeof data.description !== 'string'
  ) {
    ctx.response.status = 400;
    ctx.body = 'Some field is wrong.';

    return true;
  }

  return false;
};

const taskUpdateValidator = (data, ctx) => {
  if (data.title && typeof data.title !== 'string') {
    ctx.response.status = 400;
    ctx.body = 'Title must be string';

    return true;
  }

  if (data.description && typeof data.description !== 'string') {
    ctx.response.status = 400;
    ctx.body = 'Description must be string';

    return true;
  }

  return false;
};

module.exports = { taskCreateValidator, taskUpdateValidator };
