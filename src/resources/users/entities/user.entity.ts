import { randomUUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser, IUserToResponse } from '../../../interfaces/types';

/**
 * User class.
 */
@Entity({ name: 'user' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  login: string;

  @Column('varchar', { length: 100 })
  password: string;

  /**
   * User constructor.
   * @param id - instance id
   * @param name - user name
   * @param login - login
   * @param password - password
   */
  constructor({
    id = randomUUID(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
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
