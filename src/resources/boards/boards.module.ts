import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BoardsService from './boards.service';
import BoardsController from './boards.controller';
import BoardRepository from './boards.repository';
import LoginModule from '../login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository]), LoginModule],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [TypeOrmModule],
})
export default class BoardsModule {}
