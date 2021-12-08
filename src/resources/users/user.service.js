const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const insert = user => usersRepo.insert(user);
const update = (id, user) => usersRepo.update(id, user);
const remove = id => usersRepo.remove(id);

module.exports = {
  getAll,
  get,
  insert,
  update,
  remove
};
