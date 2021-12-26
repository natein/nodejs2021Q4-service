import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import CustomError from '../common/custom-error';
import { logger } from './logger';

const uncaughtExceptionHandler = (err: Error) => {
  logger.error(`Encaught exception: ${err.message}`);
};

const unhandledRejectionHandler = (err: Error) => {
  logger.error(`Unhandled rejection: ${err.message}`);
};

const asyncErrorHandler = (callback: RequestHandler) => 
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await callback(req, res, next);
  } catch (err) {
    return next(err);
  }
};

const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
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
