import { utilities } from 'nest-winston';
import * as winston from 'winston';
import * as config from './config';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
};

const getCurrentLevel = (level: string | undefined): string => {
  let curLevel = '';
  Object.entries(logLevels).forEach(([key, value]) => {
    if (value.toString() === level) curLevel = key;
  });
  return curLevel || 'info';
};

const level = getCurrentLevel(config.LOGGING_LEVEL);

export default {
  transports: [
    new winston.transports.File({
      dirname: './log/',
      filename: 'all.log',
      level: level,
      format: winston.format.json(),
    }),
    new winston.transports.File({
      dirname: './log/',
      filename: 'errors.log',
      level: 'error',
      format: winston.format.json(),
      handleExceptions: true,
    }),
    new winston.transports.Console({
      level: 'error',
      stderrLevels: ['error'],
      format: winston.format.uncolorize(),
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    utilities.format.nestLike(),
  ),
  exitOnError: true,
};
