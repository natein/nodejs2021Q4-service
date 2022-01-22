import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as usersRepo from '../users/user.repository';
import { ICredentials }  from '../../common/types';
import { JWT_SECRET_KEY } from '../../common/config';

/**
 * Compare two hash
 * @param param - string to compare
 * @param hash - stored db hash 
 * @returns result of comparison promise
 */
const compareHash = async ( param: string, hash: string): Promise<boolean> => bcrypt.compare(param, hash);

/**
 * Get token from login & pasword
 * @param login - user login
 * @param password - user password
 * @returns jwt token or null promise
 */
export const getToken = async ({ login, password }: ICredentials): Promise<string | null> => {

  if (!JWT_SECRET_KEY) {
    return null;
  }

  const user = await usersRepo.getByLogin(login);

  if (!user) {
    return null;
  }

  const isEqual = await compareHash(password, user.password);

  if (!isEqual) {
    return null;
  }

  return jwt.sign({ userId: user.id, login }, JWT_SECRET_KEY);
};
