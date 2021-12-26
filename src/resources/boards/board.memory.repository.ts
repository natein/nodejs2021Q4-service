import { IBoard } from '../../common/types';
import * as DB from '../../common/db';
import Board from'./board.model';

/**
 * Get all boards
 * @returns Promise array of Board objects.
 */
const getAll = async (): Promise<IBoard[]> => DB.getAllBoards();

/**
 * Get Board with specified identifier
 * @param id - identifier of the board
 * @returns Promise Board object with specified identifier
 */
const get = async (id: string): Promise<IBoard> => {
  const board = await DB.getBoardById(id);
  if (!board) {
    throw new Error(`Board not found: id=${id}`);
  }
  return board;
};

/**
 * Insert Board to database.
 * @param board - instance of Board
 * @returns Promise Board object
 */
const insert = async (board: IBoard): Promise<IBoard> => {
  const newBoard = new Board(board);
  const insertedBoard = await DB.insertBoard(newBoard);
  if (!insertedBoard) {
    throw new Error(`Can't create board`);
  }    
  return insertedBoard;
}

/**
 * Update Board with specified identifier with new data.
 * @param id - Board identifier.
 * @param board - instance of Board
 * @returns Promise updated Board object with specified identifier
 */
const update = async (id: string, board: IBoard): Promise<IBoard> => {
  const item = await DB.updateBoard(id, board);
  if (!item) {
    throw new Error(`Can't update ${id} board`);
  }
  return item;
};

/**
 * Delete Board with specified identifier
 * @param id - board identifier
 */
const remove = async (id: string): Promise<void> => {
  if (!(await DB.deleteBoard(id))) {
    throw new Error(`Can't delete ${id} board`);
  }
};

export {
  getAll,
  get,
  remove,
  insert,
  update
};
