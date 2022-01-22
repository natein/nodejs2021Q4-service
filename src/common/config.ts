import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const { 
  PORT, 
  NODE_ENV, 
  JWT_SECRET_KEY, 
  AUTH_MODE,
  LOGGING_LEVEL
} = process.env;
