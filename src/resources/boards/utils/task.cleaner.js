const tasksService = require('../../tasks/task.service');

const taskCleaner = (boardId) => {
  const tasks = tasksService.getAll();

  tasks.forEach((task) => {
    if (task.boardId === boardId) {
      tasksService.deleteTask(task.id);
    }
  });
};

module.exports = taskCleaner;
