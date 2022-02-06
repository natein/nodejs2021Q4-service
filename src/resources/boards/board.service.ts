import { IBoard } from '../../common/types';
import * as boardsRepo from './board.repository';

/**
 * Get all boards
 * @returns Promise Array of Board objects.
 */
const getAll = ():Promise<IBoard[]> => boardsRepo.getAll();

/**
 * Get Board with specified identifier
 * @param id - Identifier of the board
 * @returns Promise Board object.
 */
const get = (id: string):Promise<IBoard | string> => boardsRepo.get(id);

/**
 * Insert Board to database.
 * @param board - Instance of Board class.
 * @returns Promise Board object.
 */
const insert = (board: IBoard):Promise<IBoard> => boardsRepo.insert(board);

/**
 * Update Board by identifier with new data.
 * @param id - Board identifier.
 * @param board - Instance of Board class.
 * @returns Promise updated Board object
 */
const update = (id: string, board: IBoard):Promise<IBoard | string> => boardsRepo.update(id, board);

/**
 * Delete Board with specified identifier
 * @param id - Board identifier.
 */
const remove = (id: string):Promise<string> => boardsRepo.remove(id);

export {
  getAll,
  get,
  insert,
  update,
  remove
};
