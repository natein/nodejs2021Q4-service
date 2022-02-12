import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from './config';

const envPort = config.POSTGRES_PORT;
let port = 5432;
if (envPort && !isNaN(parseInt(envPort))) port = parseInt(envPort);

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: port,
  username: config.POSTGRES_USER || 'postgres',
  password: config.POSTGRES_PASSWORD || 'postgres',
  database: config.POSTGRES_DB || 'postgres',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../**/*-migration{.ts,.js}`],
  migrationsRun: true,
  synchronize: config.DB_SYNC === 'true',
  logging: config.DB_LOGGING === 'true',
};

export default ormconfig;
