import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import CustomError from '../common/custom-error';
import { logger } from './logger';

const uncaughtExceptionHandler = (err: Error): void => {
  logger.error(`Encaught exception: ${err.message}`);
  process.exit(1);
};

const unhandledRejectionHandler = (err: Error): void => {
  logger.error(`Unhandled rejection: ${err.message}`);
  process.exit(1);
};

/*
const unhandledRejectionHandler = ( reason: any, promise: Promise<any>): void => {
  logger.error(`Unhandled rejection: ${ reason }, ${ promise }`);
  process.exit(1);
};
*/

const asyncErrorHandler = (callback: RequestHandler) => 
  async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
  try {
    return await callback(req, res, next);
  } catch (err) {
    return next(err);
  }
};

const errorHandler = (err: Error, _req: Request, res: Response, 
  next: NextFunction):unknown => {
  const { message } = err;

  logger.error(message);

  if (err instanceof CustomError) {
    const { statusCode } = err;

    return res.status(statusCode).send(message);
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  next();
  return null;
};

export {
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
  asyncErrorHandler,
  errorHandler
};
