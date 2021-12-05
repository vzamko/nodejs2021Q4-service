const { validate } = require("uuid");
const usersService = require('../../resources/users/user.service');
const boardsService = require('../../resources/boards/board.service');
const tasksService = require('../../resources/tasks/task.service');

const _setMessage = (entityType, id) => `${entityType  } with ID ${  id  } does not exist.`

const uuidValidator = (uuid, ctx) => {
  if (uuid && !validate(uuid)) {
    ctx.response.status = 400;
    ctx.body = "UUID is not valid";

    return true;
  }

  return false;
}

const entityExistValidator = (id, entityType, ctx) => {
  switch (entityType) {
    case 'user':
      if (!usersService.getUserById(id)) {
        ctx.response.status = 404;
        ctx.body = _setMessage(entityType, id);

        return true;
      }

      return false;

    case 'board':
      if (!boardsService.getBoardById(id)) {
        ctx.response.status = 404;
        ctx.body = _setMessage(entityType, id);

        return true;
      }

      return false;

    case 'task':
      if (!tasksService.getTaskById(id)) {
        ctx.response.status = 404;
        ctx.body = _setMessage(entityType, id);

        return true;
      }

      return false;

    default:
      ctx.response.status = 500;
      ctx.body = "Server internal error";

      return true;
  }
}

const columnExistValidator = (boardId, columnId, ctx) => {
  if (!boardsService.getBoardById(boardId)) {
    ctx.response.status = 404;
    ctx.body = _setMessage('board', boardId);

    return true;
  }

  if (boardsService.getBoardById(boardId)) {
    const board = boardsService.getBoardById(boardId);

    board.columns.forEach(column => column.id !== columnId);
  }

  return true;
}

module.exports = {uuidValidator, entityExistValidator, columnExistValidator}