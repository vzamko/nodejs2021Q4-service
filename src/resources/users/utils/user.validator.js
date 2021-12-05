const userCreateValidator = (data, ctx) => {
  if (!data.name || !data.login || !data.password) {
    ctx.response.status = 400;
    ctx.body = "Some fields are missing.";

    return true;
  }

  if (typeof data.name !== "string" || typeof data.login !== "string" || typeof data.password !== "string") {
    ctx.response.status = 400;
    ctx.body = "All fields must be string.";

    return true;
  }

  return false;
}

const userUpdateValidator = (data, ctx) => {
  if (data.name && typeof data.name !== "string") {
    ctx.response.status = 400;
    ctx.body = "Name must be string";

    return true;
  }

  if (data.login && typeof data.login !== "string") {
    ctx.response.status = 400;
    ctx.body = "Login must be string";

    return true;
  }

  if (data.password && typeof data.password !== "string") {
    ctx.response.status = 400;
    ctx.body = "Password must be string";

    return true;
  }

  return false;
}

module.exports = {userCreateValidator, userUpdateValidator};