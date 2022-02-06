import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TasksService from './tasks.service';
import TasksController from './tasks.controller';
import TaskRepository from './tasks.repository';
import LoginModule from '../login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), LoginModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TypeOrmModule],
})
export default class TasksModule {}
