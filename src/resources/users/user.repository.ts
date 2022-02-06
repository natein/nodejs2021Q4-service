import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { IUser } from '../../common/types';
import User from'../../entities/user.model';

const SALT_ROUNDS  = 10;

/**
 * Return hash of password
 * @param login - login string
 * @returns hash promise
 */

const getHash = async (param: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(param, salt);
  return hash;
};

/**
 * Return users by login
 * @param login - login
 * @returns User object
 */
const getByLogin = async (login: string): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({ where: { login } });
};

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
  const { password } = user;
  user.password = await getHash(password);
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
  const { password } = user;
  user.password = await getHash(password); 
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
  getByLogin,
  getAll,
  get,
  remove,
  insert,
  update
};
