const User = require('./user.model');
const userCleaner = require('./utils/user.cleaner');

const users = new Map();

const getAll = () => [...users.values()];

const getUserById = (id) => {
  if (users.has(id)) {
    return users.get(id);
  }

  return null;
};

const createUser = (data) => {
  const user = new User({
    name: data.name,
    login: data.login,
    password: data.password,
  });

  users.set(user.id, user);

  return user;
};

const updateUser = (id, data) => {
  let user = null;

  if (users.has(id)) {
    user = users.get(id);

    user.setProperty({ ...data });
  }

  return user;
};

const deleteUser = (id) => {
  if (users.has(id)) {
    users.delete(id);
    userCleaner(id);

    return true;
  }

  return false;
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
