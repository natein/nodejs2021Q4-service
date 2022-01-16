import { IUser } from '../../common/types';
import * as usersRepo from './user.repository';

/**
 * Get all users
 * @returns Promise Array of User objects
 */
const getAll = ():Promise<IUser[]> => usersRepo.getAll();

/**
 * Get User with specified identifier
 * @param id - User identifier
 * @returns Promise User object
 */
const get = (id: string):Promise<IUser|string> => usersRepo.get(id);

/**
 * Insert User to database
 * @param user - Instance of User class
 * @returns Promise User object
 */
const insert = (user: IUser):Promise<IUser> => usersRepo.insert(user);

/**
 * Update User by identifier with new data.
 * @param id - User identifier.
 * @param user - Instance of User class.
 * @returns Updated promise User object
 */
const update = (id: string, user: IUser):Promise<IUser|string> => usersRepo.update(id, user);

/**
 * Delete user with specified identifier
 * @param  id - User identifier.
 * @returns Message about deletion
 */
const remove = (id: string):Promise<string> => usersRepo.remove(id);

export {
  getAll,
  get,
  insert,
  update,
  remove
};
