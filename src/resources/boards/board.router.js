const boardsService = require('./board.service');
const { errorHandler } = require('../../common/error-handler');

// GET /boards - get all boards

const getAllBoards = async (req, reply) => {
  try {
    return await boardsService.getAll();    
  } catch (err) {
    return errorHandler(err, reply);
  }
}

// GET /boards/:boardId - get the board by id

const getBoardById = async (req, reply) => {
  try {
    const {id} = req.params;
    return await boardsService.get(id);
  } catch (err) {
    return errorHandler(err, reply);     
  }
}

// POST /boards - create board

  const addNewBoard = async (req, reply) => {
    try {
      let {body} = req;
      if (typeof body === 'string') body = JSON.parse(body);
      const board = await boardsService.insert(body);
      return reply.status(201).send(board);
    } catch (err) {
      return errorHandler(err, reply);
    }
  }  

// PUT /boards/:boardId - update board

const updateBoardById = async (req, reply) => {
  try {
    const {id} = req.params;
    let {body} = req;
    if (typeof body === 'string') body = JSON.parse(body);
    const board = await boardsService.update(id, body);
    return reply.status(200).send(board);
  } catch (err) {
    return errorHandler(err, reply);
  }
}

// DELETE /boards/:boardId - delete board

const deleteBoardById = async (req, reply) => {
  try {
    const {id} = req.params;
    await boardsService.remove(id);
    return reply.status(204).send();
  } catch (err) {
    return errorHandler(err, reply);
  }
}
 
const boardRoutes = [
  {
    method: 'GET',
    url: '/boards',
    handler: getAllBoards
  },
  {
    method: 'POST',
    url: '/boards',
    handler: addNewBoard
  },  
  {
    method: 'GET',
    url: '/boards/:id',
    handler: getBoardById
  },
  {
    method: 'PUT',
    url: '/boards/:id',
    handler: updateBoardById
  },
  {
    method: 'DELETE',
    url: '/boards/:id',
    handler: deleteBoardById
  },
  
];
  
  module.exports = boardRoutes;
  