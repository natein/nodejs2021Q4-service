import express, { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import * as tasksService  from './task.service';
import { asyncErrorHandler } from '../../middleware/error-handlers';

const router = express.Router();

// GET boards/:boardId/tasks - get all tasks

router.route('/:boardId/tasks')
  .get(async (req, res) => {
    const {boardId} = req.params;
    const tasks = await tasksService.getAll(boardId);
    res.json(tasks);
  });

// GET /boards/:boardId - get the board by id

router.route('/:boardId/tasks/:id').get(
  asyncErrorHandler(async (req: Request, res: Response) => {
    const {boardId, id} = req.params;
    if (id && boardId) {
      const task = await tasksService.get(boardId, id);
      if(task === 'NOT_FOUND')
        res.status(StatusCodes.NOT_FOUND).send('Task not found');
      else res.json(task);
    }
  })
);
  
// POST boards/:boardId/tasks - create task  
  
router.route('/:boardId/tasks')
  .post(async (req, res) => {
    const {boardId} = req.params;
    if (boardId) {
      req.body.boardId = boardId;
    }
    const task = await tasksService.insert(req.body);
    res.status(StatusCodes.CREATED).json(task);
  });

// PUT boards/:boardId/tasks/:taskId - update task

router.route('/:boardId/tasks/:id')
  .put(async (req, res) => {
    const {id} = req.params;
    res.json(await tasksService.update(id, req.body));    
  });
  
// DELETE boards/:boardId/tasks/:taskId - delete task
  
router.route('/:boardId/tasks/:id')  
  .delete(async (req, res) => {
    const {id} = req.params;
    try {
      await tasksService.remove(id);
      res.status(StatusCodes.NO_CONTENT).send('The task has been deleted');
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send('Board not found');
    }
  });

export { router };
