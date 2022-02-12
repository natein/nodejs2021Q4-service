import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersService from './users.service';
import UsersController from './users.controller';
import UserRepository from './users.repository';
import LoginModule from '../login/login.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => LoginModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export default class UsersModule {}
