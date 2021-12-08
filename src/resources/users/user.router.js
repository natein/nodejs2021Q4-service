const User = require('./user.model');
const usersService = require('./user.service');
const { errorHandler } = require('../../common/error-handler');

// GET /users - get all users (remove password from response)

const getAllUsers = async (req, reply) => {
  try {
    const users = await usersService.getAll();
    return users.map(User.toResponse);
  } catch (err) {
    return errorHandler(err, reply);
  }
}

// GET /users/:userId - get the user by id 
// (remove password from response)

const getUserById = async (req, reply) => {
  try {
    const {id} = req.params;
    const user = await usersService.get(id);
    return User.toResponse(user);
  } catch (err) {
    return errorHandler(err, reply);     
  }
}

// POST /users - create user

const addNewUser = async (req, reply) => {
  try {
    let {body} = req;
    if (typeof body === 'string') body = JSON.parse(body);
    const user = await usersService.insert(body);
    return reply.status(201).send(User.toResponse(user));
  } catch (err) {
    return errorHandler(err, reply);
  }
}  

// PUT /users/:userId - update user

const updateUserById = async (req, reply) => {
  try {
    const {id} = req.params;
    let {body} = req;
    if (typeof body === 'string') body = JSON.parse(body);
    const user = await usersService.update(id, body);
    return reply.status(200).send(user);
  } catch (err) {
    return errorHandler(err, reply);
  }
}

// DELETE /users/:userId - delete user

const deleteUserById = async (req, reply) => {
  try {
    const {id} = req.params;
    await usersService.remove(id);
    return reply.status(204).send();
  } catch (err) {
    return errorHandler(err, reply);
  }
}

const userRoutes = [
  {
    method: 'GET',
    url: '/users',
    handler: getAllUsers
  },
  {
    method: 'POST',
    url: '/users',
    handler: addNewUser
  },  
  {
    method: 'GET',
    url: '/users/:id',
    handler: getUserById
  },
  {
    method: 'PUT',
    url: '/users/:id',
    handler: updateUserById
  },
  {
    method: 'DELETE',
    url: '/users/:id',
    handler: deleteUserById
  },
  
];

module.exports = userRoutes;
