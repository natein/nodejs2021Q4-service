import { Request, Response } from 'express';
import expressWinston from 'express-winston';
import { createLogger, format, transports } from 'winston';
import { LOGGING_LEVEL } from '../common/config';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
};

const { combine, timestamp, printf } = format;

const consoleFormat = printf(({ level, message, timestamp: time }) => 
  `${time} ${level}: ${message}`);

const messageFormat = (req: Request, res: Response) => {
  const { method, url, query, params, body } = req; 
  const { statusCode } = res;

  return `${method} ${url} query = ${JSON.stringify(
    query)}, params=${JSON.stringify(params)} body = ${JSON.stringify(body)} - ${statusCode}`;
};

const getCurrentLevel = (level: string | undefined): string => {
  let curLevel: string = '';
  Object.entries(logLevels).forEach(([key, value]) => {
    if(value.toString() === level) curLevel = key;
  });
  return curLevel ? curLevel : 'info'; 
};

const options = {
  level: getCurrentLevel(LOGGING_LEVEL),
  levels: logLevels,
  transports: [
    new transports.File({
      filename: './logs/errors.log',
      level: 'error',
      format: format.json()
    }),
    new transports.File({
      filename: './logs/all.log',
      format: format.printf(
        info => `${new Date().toISOString()} ${info.message}`
      )
    }),
    new transports.Console({
      format: combine(timestamp(), consoleFormat)
    })
  ],
  msg: messageFormat,
  colorize: true
};

const middlewareLogger = expressWinston.logger(options);
const logger = createLogger(options);

export { middlewareLogger, logger };
