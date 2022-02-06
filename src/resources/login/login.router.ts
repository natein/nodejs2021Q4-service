import express, { Request, Response, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';
import * as loginService from './login.service';

export const router = express.Router();

router.route('/').post(async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const { login, password } = req.body;
    const token = await loginService.getToken({login, password});
    if (token) {
      res.status(StatusCodes.OK).send({token});
    } else {
      res.status(StatusCodes.FORBIDDEN).send('Wrong login or password');
    }
  } catch (error) {
    next(error);
  }
});
