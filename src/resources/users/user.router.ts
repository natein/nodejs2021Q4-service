import express, { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import User from '../../entities/user.model';
import * as usersService  from './user.service';
import { asyncErrorHandler } from '../../middleware/error-handlers';

const router = express.Router();

// GET /users - get all users (remove password from response)

router.route('/')
  .get(async (_req, res) => {
    const users = await usersService.getAll();
    if (users) 
      res.json(users.map(User.toResponse));
  });

// GET /users/:userId - get the user by id 
// (remove password from response)

  router.route('/:id').get(
    asyncErrorHandler(async (req: Request, res: Response) => {
      const {id} = req.params;
      if(id) {
        const user = await usersService.get(id);
        if(user !== 'NOT_FOUND')
          res.json(User.toResponse(user as User));
        else res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found'});
      }
    })
  );  
  
// POST /users - create user  
  
router.route('/')
  .post(async (req, res) => {
    const user = await usersService.insert(req.body);
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  });

// PUT /users/:userId - update user  

router.route('/:id')
  .put(async (req, res) => {
    const {id} = req.params;
    res.json(await usersService.update(id, req.body));    
  });
  
// DELETE /users/:userId - delete user
  
router.route('/:id')  
  .delete(async (req, res) => {
    const {id} = req.params;
    res.json(await usersService.remove(id));
  });

export { router };
