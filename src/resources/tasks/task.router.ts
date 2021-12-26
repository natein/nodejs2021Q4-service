import express from 'express';
import * as tasksService  from './task.service';

const router = express.Router();

// GET boards/:boardId/tasks - get all tasks

router.route('/:boardId/tasks')
  .get(async (req, res) => {
    const {boardId} = req.params;
    const tasks = await tasksService.getAll(boardId);
    res.json(tasks);
  });

// GET /boards/:boardId - get the board by id

router.route('/:boardId/tasks/:id')
  .get(async (req, res) => {
    const {id} = req.params;
    try{
      const task = await tasksService.get(id);
      res.json(task);
    } catch {
      res.status(404).send('Task not found');
    }  
  });
  
// POST boards/:boardId/tasks - create task  
  
router.route('/:boardId/tasks')
  .post(async (req, res) => {
    const {boardId} = req.params;
    if (boardId) {
      req.body.boardId = boardId;
    }
    const task = await tasksService.insert(req.body);
    res.status(201).json(task);
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
      res.status(204).send('The task has been deleted');
    } catch (error) {
      res.status(404).send('Board not found');
    }
  });

export { router };
