const DB = require('../../common/db');
const Board = require('./board.model');
const { NotFoundError } = require('../../common/custom-errors');

const TABLE_NAME = 'boards';

const getAll = async () => DB.getAll(TABLE_NAME);

const get = async id => {
  const board = await DB.getItem(TABLE_NAME, id);
  if (!board) {
    throw new NotFoundError('Board', id);
  }
  return board;
};

const insert = async board => DB.insertItem(TABLE_NAME, new Board(board));

const update = async (id, board) => {
  const item = await DB.updateItem(TABLE_NAME, id, board);
  if (!item) {
    throw new Error(`Can't update ${id} board`);
  }
  return item;
};

const remove = async id => {
  if (!(await DB.deleteItem(TABLE_NAME, id))) {
    throw new Error(`Can't delete ${id} board`);
  }
};

module.exports = {
  getAll,
  get,
  remove,
  insert,
  update
};
