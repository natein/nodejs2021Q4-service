const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const db = {
  users: [],
  boards: [],
  tasks: [],
  cascadeUsersUpdate: (user) => {
    if (user) {
      db.tasks.forEach((item, idx) => {
        if (item.userId === user.id) {
          db.tasks[idx].userId = null;
        }
      });
    }
  },
  cascadeBoardsUpdate: (board) => {
    db.tasks = db.tasks.filter(item => item.boardId !== board.id);    
  },
  cascadeTasksUpdate: () => {},  
};

const tablesCascadeUpdate = {
  users: db.cascadeUsersUpdate,
  boards: db.cascadeBoardsUpdate,
  tasks: db.cascadeTasksUpdate
};

(() => {
  db.users.push(new User({name: "John Doe"}));
  db.users.push(new User({name: "Вася Пупкин"}));
  
  const user = new User({name: "natein"});
  db.users.push(user);
  
  const emptyBoard = new Board({title: "Доска без задач"});
  db.boards.push(emptyBoard);
  
  const board = new Board({title: "Разработка REST API"});
  board.addColumn("Todo");
  board.addColumn("Done");  
  db.boards.push(board);
  
  const task1 = new Task({ title: "Сделать PR", order: 0, userId: null,
    boardId: board.id, columnId: board.columns[0].id });
  const task2 = new Task({ title: "Подогнать под тесты", order: 0, userId: user.id,
    boardId: board.id, columnId: board.columns[1].id });  
  db.tasks.push(task1);
  db.tasks.push(task2);
})();

const getAll = (tableName) => db[tableName];

const getItem = (tableName, id) => {
  const items = db[tableName].filter(item => item.id === id);
  if(items.length === 1) return items[0];
  return null;
}

const insertItem = (tableName, item) => {
  const existingItem = getItem(tableName, item.id)
  if (!existingItem) {
    db[tableName].push(item);
  }
  return getItem(tableName, item.id);
}

const updateItem = async (tableName, id, item) => {
  const existingItem = getItem(tableName, id);
  if (existingItem) {
    const idx = db[tableName].indexOf(existingItem);
    db[tableName][idx] = {id, ...item };
  }    
  return getItem(tableName, id);
};

const deleteItem = (tableName, id) => {
  const existingItem = getItem(tableName, id);

  if (existingItem) {
    
    tablesCascadeUpdate[tableName](existingItem);

    const idx = db[tableName].indexOf(existingItem);

    db[tableName] = db[tableName].slice(0, idx)
      .concat(db[tableName].slice(idx+1));
    return existingItem;
  }
  return null;  
};

const getTasksByBoard = (boardId) => db.tasks.filter(item => item.boardId === boardId);

module.exports = {
  getAll,
  getItem,
  insertItem,
  updateItem,
  deleteItem,
  getTasksByBoard
};