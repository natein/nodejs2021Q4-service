const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const insert = board => boardsRepo.insert(board);
const update = (id, board) => boardsRepo.update(id, board);
const remove = id => boardsRepo.remove(id);

module.exports = {
  getAll,
  get,
  insert,
  update,
  remove
};
