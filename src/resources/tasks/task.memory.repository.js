const DB = require('../../common/db');
const Task = require('./task.model');
const { NotFoundError } = require('../../common/custom-errors');

const TABLE_NAME = 'tasks';

const getAll = async (boardId) => {
  const board = DB.getItem('boards', boardId);
  if(!board)
    throw new NotFoundError('Board', boardId);
  return DB.getTasksByBoard(boardId);
}

const get = async id => {
  const task = await DB.getItem(TABLE_NAME, id);
  if (!task) {
    throw new NotFoundError('Task', id);
  }
  return task;
};

const insert = async task => DB.insertItem(TABLE_NAME, new Task(task));

const update = async (id, task) => {
  const item = await DB.updateItem(TABLE_NAME, id, task);
  if (!item) {
    throw new Error(`Can't update ${id} task`);
  }
  return item;
};

const remove = async id => {
  if (!(await DB.deleteItem(TABLE_NAME, id))) {
    throw new Error(`Can't delete ${id} task`);
  }
};

module.exports = {
  getAll,
  get,
  remove,
  insert,
  update
};
