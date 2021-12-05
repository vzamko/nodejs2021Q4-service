const serverError = ctx => {
  ctx.response.status = 500;
  ctx.body = "Server inner error.";
}

module.exports = serverError;