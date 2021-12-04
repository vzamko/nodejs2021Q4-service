const Task = require('./task.model');

const tasks = new Map();

const getAll = () => [...tasks.values()];

const getTaskById = (id) => {
  if (tasks.has(id)) {
    return tasks.get(id);
  }

  return null;
};

const createTask = (data) => {
  const task = new Task({
    title: data.title,
    order: data.order,
    description: data.description,
    userId: data.userId,
    boardId: data.boardId,
    columnId: data.columnId
  });
  tasks.set(task.id, task);

  return task;
};

const updateTask = (id, data) => {
  let task = null;

  if (tasks.has(id)) {
    task = tasks.get(id);

    task.setProperty({...data});
  }

  return task;
};

const deleteTask = (id) => {
  if (tasks.has(id)) {
    tasks.delete(id);

    return true;
  }

  return false;
};

module.exports = { getAll, getTaskById, createTask, updateTask, deleteTask };
