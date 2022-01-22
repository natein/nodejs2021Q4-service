import express from 'express';
import StatusCodes from 'http-status-codes';
import * as boardsService  from './board.service';
import { asyncErrorHandler } from '../../middleware/error-handlers';

const router = express.Router();

// GET /boards - get all boards

router.route('/')
  .get(async (_req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  });

// GET /boards/:boardId - get the board by id

router.route('/:boardId').get(
  asyncErrorHandler(async (req, res) => {
    const {boardId} = req.params;
    if (boardId) {
      const board = await boardsService.get(boardId);
      if(board === 'NOT_FOUND')
        res.status(StatusCodes.NOT_FOUND).send('Board not found');
      else res.json(board);
    }
  })
);

// POST /boards - create board

router.route('/')
  .post(async (req, res) => {
    const board = await boardsService.insert(req.body);
    res.status(StatusCodes.CREATED).json(board);
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
      res.status(StatusCodes.NO_CONTENT).send('The board has been deleted');
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).send('Board not found');
    }
  });

export { router };
