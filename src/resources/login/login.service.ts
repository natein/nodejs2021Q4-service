import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../users/users.repository';
import User from '../users/entities/user.entity';

const compareHash = async (param: string, hash: string): Promise<boolean> =>
  bcrypt.compare(param, hash);

@Injectable()
export default class LoginService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<{ token: string }> {
    const jwtPayload = { userId: user.id, login: user.login };
    return { token: await this.jwtService.signAsync(jwtPayload) };
  }

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { login } });
    if (user) {
      const hashCompareRes = await compareHash(password, user.password);
      return hashCompareRes ? user : null;
    } else return null;
  }
}
