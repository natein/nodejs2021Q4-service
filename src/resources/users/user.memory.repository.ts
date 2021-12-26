import { IUser } from '../../common/types';
import * as DB from '../../common/db';
import User from'./user.model';

/**
 * Get all users
 * @returns Promise Array of User objects
 */
const getAll = async (): Promise<IUser[]> => DB.getAllUsers();

/**
 * Get user with specified identifier
 * @param id - User identifier
 * @returns Promise User object
 */
const get = async (id: string): Promise<IUser> => {
  const user = await DB.getUserById(id);
  if (!user) {
    throw new Error(`User not found: id=${id}`);
  }
  return user;
};

/**
 * Insert User to database
 * @param user - Instance of User
 * @returns Promise User object
 */
const insert = async (user: IUser): Promise<IUser> => {
  const newUser = new User(user);
  const insertedUser = await DB.insertUser(newUser);
  if (!insertedUser) {
    throw new Error(`Can't create user`);
  }  
  return insertedUser;
}

/**
 * Update User by identifier with new data
 * @param id - User identifier
 * @param user - Instance of User
 * @returns Updated promise User object
 */
const update = async (id: string, user: IUser): Promise<IUser> => {
  const item = await DB.updateUser(id, user);
  if (!item) {
    throw new Error(`Can't update ${id} user`);
  }
  return item;
};

/**
 * Delete user with specified identifier
 * @param id - User identifier
 */
const remove = async (id: string): Promise<void> => {
  if (!(await DB.deleteUser(id))) {
    throw new Error(`Can't delete ${id} user`);
  }
};

export {
  getAll,
  get,
  remove,
  insert,
  update
};
