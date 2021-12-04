const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getTaskById = id => tasksRepo.getTaskById(id);
const createTask = data => tasksRepo.createTask(data);
const updateTask = (id, data) => tasksRepo.updateTask(id, data);
const deleteTask = id => tasksRepo.deleteTask(id);

module.exports = { getAll, getTaskById, createTask, updateTask, deleteTask };
