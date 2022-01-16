import { getRepository } from 'typeorm';
import { IBoard } from '../../common/types';
import Board from'../../entities/board.model';

/**
 * Get all boards
 * @returns Promise array of Board objects.
 */
const getAll = async (): Promise<IBoard[]> => {
  const boardRepository = getRepository(Board);
  return boardRepository.find({where: {}});  
};

/**
 * Get Board with specified identifier
 * @param id - identifier of the board
 * @returns Promise Board object with specified identifier
 */
const get = async (id: string): Promise<IBoard | 'NOT_FOUND'> => {
  const boardRepository = getRepository(Board);
  const res = await boardRepository.findOne(id);
  if (res === undefined) return 'NOT_FOUND';
  return res;  
};

/**
 * Insert Board to database.
 * @param board - instance of Board
 * @returns Promise Board object
 */
const insert = async (board: IBoard): Promise<IBoard> => {
  const boardRepository = getRepository(Board);
  const insertedBoard = boardRepository.create(board);
  return boardRepository.save(insertedBoard);
}

/**
 * Update Board with specified identifier with new data.
 * @param id - Board identifier.
 * @param board - instance of Board
 * @returns Promise updated Board object with specified identifier
 */
const update = async (id: string, board: IBoard): Promise<IBoard | 'NOT_FOUND'> => {
  const boardRepository = getRepository(Board);
  const foundBoard = await boardRepository.findOne({id});
  if (foundBoard) {
      return boardRepository.save({...foundBoard, ...board});
  }
  return 'NOT_FOUND';
};

/**
 * Delete Board with specified identifier
 * @param id - board identifier
 */
const remove = async (id: string): Promise<'DELETED' | 'NOT_FOUND' > => {  
  const boardRepository = getRepository(Board);
  const res = await boardRepository.findOne(id);
  if (res === undefined) return 'NOT_FOUND';
  await boardRepository.delete({id});
  return 'DELETED';
};

export {
  getAll,
  get,
  remove,
  insert,
  update
};
