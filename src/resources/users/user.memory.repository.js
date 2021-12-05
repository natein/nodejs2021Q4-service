const DB = require('../../common/db');
const User = require('./user.model');
const { NotFoundError } = require('../../common/custom-errors');

const TABLE_NAME = 'users';

const getAll = async () => DB.getAll(TABLE_NAME);

const get = async id => {
  const user = await DB.getItem(TABLE_NAME, id);
  if (!user) {
    throw new NotFoundError('User', id);
  }
  return user;
};

const insert = async user => DB.insertItem(TABLE_NAME, new User(user));

const update = async (id, user) => {
  const item = await DB.updateItem(TABLE_NAME, id, user);
  if (!item) {
    throw new Error(`Can't update ${id} user`);
  }
  return item;
};

const remove = async id => {
  if (!(await DB.deleteItem(TABLE_NAME, id))) {
    throw new Error(`Can't delete ${id} user`);
  }
};

module.exports = {
  getAll,
  get,
  remove,
  insert,
  update
};
