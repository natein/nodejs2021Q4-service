const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const get = id => tasksRepo.get(id);
const insert = task => tasksRepo.insert(task);
const update = (id, task) => tasksRepo.update(id, task);
const remove = id => tasksRepo.remove(id);

module.exports = {
  getAll,
  get,
  insert,
  update,
  remove
};
