import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const envPort = process.env['POSTGRES_PORT'];
let port = 5432;
if(envPort && !isNaN(parseInt(envPort))) port = parseInt(envPort);

const config: ConnectionOptions = {
  type: 'postgres',
  synchronize: process.env['DB_SYNC'] === 'true',
  migrationsRun: true,
  host: process.env['POSTGRES_HOST'],
  port,
  username: process.env['POSTGRES_USER'] || 'postgres',
  password: process.env['POSTGRES_PASSWORD'] || 'postgres',
  database: process.env['POSTGRES_DB'] || 'postgres',
  logging: true,
  entities: ['./src/entities/**/*.ts'],
  migrations: ['./src/migrations/**/*.ts'],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/migrations',
  },  
};

export default config;
