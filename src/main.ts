import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as path from 'path';
import * as YAML from 'yamljs';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import AppModule from './app.module';
import * as config from './configs/config';
import { SwaggerModule } from '@nestjs/swagger';
import ValidationException from './other/dto-validator';
import * as logger from './other/logger';

process.on('uncaughtException', (err) => {
  logger.logErrors('Uncaught Exception', err);
});

process.on('unhandledRejection', (_, promise) => {
  promise.catch((err) => {
    logger.logErrors('Unhandled rejection', err);
    process.exit(1);
  });
});

async function bootstrap() {
  const { PORT, USE_FASTIFY } = config;

  const app =
    USE_FASTIFY === 'true'
      ? await NestFactory.create<NestFastifyApplication>(
          AppModule,
          new FastifyAdapter({ ignoreTrailingSlash: true }),
        )
      : await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const document = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new ValidationException(errors);
      },
    }),
  );

  const mess = `Running on port ${PORT} by ${
    USE_FASTIFY === 'true' ? 'Fastify' : 'Express'
  }`;
  await app.listen(+PORT, () => console.log(mess));
}

bootstrap();
