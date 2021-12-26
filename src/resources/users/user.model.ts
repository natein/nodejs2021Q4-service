import { v4 as uuid } from 'uuid';
import { IUser, IUserToResponse } from '../../common/types';

/**
 * User class.
 */
class User {
    id: string;

    name: string;

    login: string;

    password: string;   

  /**
   * User constructor.
   * @param id - instance id
   * @param name - user name
   * @param login - login
   * @param password - password
   */   
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return user data without password
   * @param user - User instance
   * @returns Return user identifier, name and login
   */
  static toResponse(user: IUser): IUserToResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
