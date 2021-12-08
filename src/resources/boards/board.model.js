const { v4: uuidv4 } = require('uuid');

class Board {
  constructor({
    id = uuidv4(),
    title = 'Board',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  addColumn(title) {
    const id = uuidv4();
    const order = Math.max(this.columns.map(item => item.order)) + 1;
    this.columns.push({id, title, order});
  }
}

module.exports = Board;
