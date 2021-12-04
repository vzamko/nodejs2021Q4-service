const Board = require('./board.model');
const taskCleaner = require('./utils/task.cleaner');

const boards = new Map();

const getAll = () => [...boards.values()];

const getBoardById = (id) => {
  if (boards.has(id)) {
    return boards.get(id);
  }

  return null;
};

const createBoard = (data) => {
  const board = new Board({title: data.title, columns: data.columns});
  boards.set(board.id, board);

  return board;
};

const updateBoard = (id, data) => {
  let board = null;

  if (boards.has(id)) {
    board = boards.get(id);

    board.setProperty({...data});
  }

  return board;
};

const deleteBoard = (id) => {
  if (boards.has(id)) {
    boards.delete(id);
    taskCleaner(id);

    return true;
  }

  return false;
};

module.exports = { getAll, getBoardById, createBoard, updateBoard, deleteBoard };
