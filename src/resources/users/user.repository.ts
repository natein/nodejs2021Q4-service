import { getRepository } from 'typeorm';
import { IUser } from '../../common/types';
import User from'../../entities/user.model';

/**
 * Get all users
 * @returns Promise Array of User objects
 */
const getAll = async (): Promise<IUser[]> => {
  const userRepository = getRepository(User);
  return userRepository.find({where: {}});  
}

/**
 * Get user with specified identifier
 * @param id - User identifier
 * @returns Promise User object
 */
const get = async (id: string): Promise<IUser | 'NOT_FOUND'> => {
  const userRepository = getRepository(User);
  const res = await userRepository.findOne(id);
  if (res === undefined) return 'NOT_FOUND';
  return res;  
};

/**
 * Insert User to database
 * @param user - Instance of User
 * @returns Promise User object
 */
const insert = async (user: IUser): Promise<IUser> => {
  const userRepository = getRepository(User);
  const newUser = userRepository.create(user);
  const savedUser = userRepository.save(newUser);
  return savedUser;
}

/**
 * Update User by identifier with new data
 * @param id - User identifier
 * @param user - Instance of User
 * @returns Updated promise User object
 */
const update = async (id: string, user: IUser): Promise<IUser | 'NOT_FOUND'> => {
  const userRepository = getRepository(User);
  const res = await userRepository.findOne(id);
  if (res === undefined) return 'NOT_FOUND';
  const updatedRes = await userRepository.update(id, user);
  return updatedRes.raw;
};

/**
 * Delete user with specified identifier
 * @param id - User identifier
 */
const remove = async (id: string): Promise<'DELETED' | 'NOT_FOUND' > => {
  const userRepository = getRepository(User);
  const deletedRes = await userRepository.delete(id);
  if (deletedRes.affected) return 'DELETED';
  return 'NOT_FOUND';
};

export {
  getAll,
  get,
  remove,
  insert,
  update
};
