const tasksService = require('../../tasks/task.service');

const userCleaner = (userId) => {
  const tasks = tasksService.getAll();

  tasks.forEach(task => {
    if (task.userId === userId) {
      const taskData = task;
      taskData.userId = null;

      tasksService.updateTask(taskData.id, taskData);
    }
  });
};

module.exports = userCleaner;