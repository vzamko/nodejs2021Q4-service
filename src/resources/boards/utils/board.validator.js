const boardCreateValidator = (data, ctx) => {
  if (!data.title || !data.columns) {
    ctx.response.status = 400;
    ctx.body = 'Some fields are missing.';

    return true;
  }

  if (
    typeof data.title !== 'string' ||
    (!Array.isArray(data.columns) && data.columns.length === 0)
  ) {
    ctx.response.status = 400;
    ctx.body = 'Some of fields must wrong type or empty.';

    return true;
  }

  data.columns.forEach((column) => {
    if (!column.title) {
      ctx.response.status = 400;
      ctx.body = 'Some fields of column are missing.';

      return true;
    }

    if (typeof column.title !== 'string' || typeof column.order !== 'number') {
      ctx.response.status = 400;
      ctx.body = 'Some of fields must wrong type.';

      return true;
    }

    return false;
  });

  return false;
};

const boardUpdateValidator = (data, ctx) => {
  if (data.title && typeof data.title !== 'string') {
    ctx.response.status = 400;
    ctx.body = 'Title must be string';

    return true;
  }

  if (
    data.columns &&
    !Array.isArray(data.columns) &&
    data.columns.length === 0
  ) {
    ctx.response.status = 400;
    ctx.body = 'Column must be array';

    return true;
  }

  data.columns.forEach((column) => {
    if (!column.title) {
      ctx.response.status = 400;
      ctx.body = 'Some fields of column are missing.';

      return true;
    }

    if (typeof column.title !== 'string' || typeof column.order !== 'number') {
      ctx.response.status = 400;
      ctx.body = 'Some of fields must wrong type.';

      return true;
    }

    return false;
  });

  return false;
};

module.exports = { boardCreateValidator, boardUpdateValidator };
