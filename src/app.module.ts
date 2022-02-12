import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import AppController from './app.controller';
import UsersModule from './resources/users/users.module';
import BoardsModule from './resources/boards/boards.module';
import TasksModule from './resources/tasks/tasks.module';
import LoginModule from './resources/login/login.module';
import FileModule from './resources/file/file.module';
import RequestLoggingInterceptor from './interceptors/logging.interceptor';
import CommonExceptionFilter from './filters/exception.filter';
import ormconfig from './configs/ormconfig';
import winstonConfig from './configs/winston.config';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TasksModule,
    LoginModule,
    FileModule,
    TypeOrmModule.forRoot(ormconfig),
    WinstonModule.forRoot(winstonConfig),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CommonExceptionFilter,
    },
  ],
})
export default class AppModule {}
