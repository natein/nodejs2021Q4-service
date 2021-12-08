// const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    id = uuidv4(),
    title = 'Task',
    order = 0,
    description = '',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
  
  assignUser(user) {
    this.userId = user.id;
  }
}

module.exports = Task;
