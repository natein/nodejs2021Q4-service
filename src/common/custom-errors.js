class NotFoundError extends Error {
  constructor(type, uuid) {
    super(`${type} id=${uuid} does not exist`);
    this.name = this.constructor.name;
    this.code = 404;
  }  
}

module.exports = { NotFoundError };
