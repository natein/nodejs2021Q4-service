import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { StatusCodes } from 'http-status-codes';

import CustomError from './common/custom-error';

import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';

import { middlewareLogger } from './middleware/logger';
import { uncaughtExceptionHandler, unhandledRejectionHandler, errorHandler } 
  from './middleware/error-handlers';

const app = express();
const swaggerDocument = YAML.load(
  path.join(__dirname, '../doc/api.yaml')
);

app.use(express.json());

app.use(middlewareLogger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', [boardRouter, taskRouter]);

// load middleware 
app.all('*', () => {
  throw new CustomError(StatusCodes.BAD_REQUEST);
});

app.use(errorHandler);

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

// This code is for checking
// throw Error('Something went wrong!');
// Promise.reject(Error('Rejected!'));

export { app };
