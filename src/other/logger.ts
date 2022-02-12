import * as winston from 'winston';
import winstonConfig from '../configs/winston.config';

const logger = winston.createLogger(winstonConfig);

export const logDebugInfo = (message: string): void => {
  logger.debug(message);
};

export const logErrors = (comment: string, error: Error): void => {
  logger.error(`${comment}: ${error.name} ${error.message}`);
};
