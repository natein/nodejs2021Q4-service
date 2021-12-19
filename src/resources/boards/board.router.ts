import express from 'express';
import * as boardsService  from './board.service';

const router = express.Router();

// GET /boards - get all boards

router.route('/')
  .get(async (_req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  });

// GET /boards/:boardId - get the board by id

router.route('/:boardId')
  .get(async (req, res) => {
    const {boardId} = req.params;
    try{
      const board = await boardsService.get(boardId);
      res.json(board);
    } catch {
      res.status(404).send('Board not found');
    }
  });

// POST /boards - create board

router.route('/')
  .post(async (req, res) => {
    const board = await boardsService.insert(req.body);
    res.status(201).json(board);
  });

// PUT /boards/:boardId - update board

router.route('/:boardId')
  .put(async (req, res) => {
    const {boardId} = req.params;
    res.json(await boardsService.update(boardId, req.body));
  });

// DELETE /boards/:boardId - delete board

router.route('/:boardId')
  .delete(async (req, res) => {
    const {boardId} = req.params;
    try {
      await boardsService.remove(boardId);
      res.status(204).send('The board has been deleted');
    } catch (error) {
      res.status(404).send('Board not found');
    }
  });

export { router };
