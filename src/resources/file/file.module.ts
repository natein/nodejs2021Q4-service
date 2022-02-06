import { Module } from '@nestjs/common';
import {
  FileControllerExpress,
  FileControllerFastify,
} from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import dotenv = require('dotenv');
// import { config } from 'dotenv';

@Module({
  controllers: [
    dotenv.config().parsed['FASTIFY_MODE'] === 'true'
      ? FileControllerFastify
      : FileControllerExpress,
  ],
  imports: [
    MulterModule.register({
      dest: './files',
    }),
  ],
})
export default class FileModule {}
