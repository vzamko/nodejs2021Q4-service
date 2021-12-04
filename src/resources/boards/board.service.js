const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getBoardById = id => boardsRepo.getBoardById(id);
const createBoard = data => boardsRepo.createBoard(data);
const updateBoard = (id, data) => boardsRepo.updateBoard(id, data);
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoardById, createBoard, updateBoard, deleteBoard };
