const tasksService = require('./task.service');
const { errorHandler } = require('../../common/error-handler');

// GET boards/:boardId/tasks - get all tasks

const getAllTasks = async (req, reply) => {
  try {
    const {boardId} = req.params;
    return await tasksService.getAll(boardId);
  } catch (err) {
    return errorHandler(err, reply);
  }
}

// GET /boards/:boardId - get the board by id

const getTaskById = async (req, reply) => {
  try {
    const {id, boardId} = req.params;
    return  await tasksService.get(id, boardId);
  } catch (err) {
    return errorHandler(err, reply);     
  }
}
  
// POST boards/:boardId/tasks - create task  
  
const addNewTask = async (req, reply) => {
  try {
    const {boardId} = req.params;
    let {body} = req;
    if (typeof body === 'string') body = JSON.parse(body);
    req.body.boardId = boardId;
    const task = await tasksService.insert(body);
    return reply.status(201).send(task);
  } catch (err) {
    return errorHandler(err, reply);
  }
} 

// PUT boards/:boardId/tasks/:taskId - update task

const updateTaskById = async (req, reply) => {
  try {
    const {id} = req.params;
    let {body} = req;
    if (typeof body === 'string') body = JSON.parse(body);
    const task = await tasksService.update(id, body);
    return reply.status(200).send(task);
  } catch (err) {
    return errorHandler(err, reply);
  }
}
  
// DELETE boards/:boardId/tasks/:taskId - delete task

const deleteTaskById = async (req, reply) => {
  try {
    const {id} = req.params;
    await tasksService.remove(id);
    return reply.status(204).send();
  } catch (err) {
    return errorHandler(err, reply);
  }
}

const taskRoutes = [
  {
    method: 'GET',
    url: '/boards/:boardId/tasks',
    handler: getAllTasks
  },
  {
    method: 'POST',
    url: '/boards/:boardId/tasks',
    handler: addNewTask
  },  
  {
    method: 'GET',
    url: '/boards/:boardId/tasks/:id',
    handler: getTaskById
  },
  {
    method: 'PUT',
    url: '/boards/:boardId/tasks/:id',
    handler: updateTaskById
  },
  {
    method: 'DELETE',
    url: '/boards/:boardId/tasks/:id',
    handler: deleteTaskById
  }  
];
  
module.exports = taskRoutes;
