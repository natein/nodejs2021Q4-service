import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PG_UNIQUE_VIOLATION } from '@drdgvhbh/postgres-error-codes';
import * as bcrypt from 'bcryptjs';
import User from './entities/user.entity';
import UserRepository from './users.repository';
import UserDto from './dto/user.dto';
import { IUserToResponse } from '../../interfaces/types';

const SALT_ROUNDS = 10;

const getHash = async (param: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(param, salt);
  return hash;
};

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getByLogin(login: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { login } });
  }

  async create(userDto: UserDto): Promise<IUserToResponse> {
    const { password } = userDto;
    const user = this.userRepository.create(userDto);
    user.password = await getHash(password);
    try {
      await this.userRepository.save(user);
    } catch (err) {
      if (err.code === PG_UNIQUE_VIOLATION) {
        throw new ConflictException('User with this login already exists');
      }
    }
    return User.toResponse(user);
  }

  async findAll(): Promise<IUserToResponse[]> {
    const users = await this.userRepository.find();
    return users.map((user) => User.toResponse(user));
  }

  async findOne(id: string): Promise<IUserToResponse> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return User.toResponse(user);
  }

  async update(id: string, userDto: UserDto): Promise<IUserToResponse> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, userDto);
    const { password } = userDto;
    user.password = await getHash(password);
    try {
      await this.userRepository.save(user);
    } catch (err) {
      if (err.code === PG_UNIQUE_VIOLATION) {
        throw new ConflictException('User with this login already exists');
      }
    }
    return User.toResponse(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
