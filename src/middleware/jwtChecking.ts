import jwt from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET_KEY } from '../common/config';

const EXCLUDE_ROUTES = ['/login', '/doc', '/'];

export const jwtChecking = ( req: Request, res: Response, next: NextFunction ):void => {

  if (EXCLUDE_ROUTES.includes(req.path)) {
    next();
  } else {
    const header = req.header('Authorization');
    if (header) {
      const [type, token] = header.split(' ');  
      if (type !== 'Bearer' || !JWT_SECRET_KEY || !token ) {
        res.status(StatusCodes.UNAUTHORIZED)
          .send("You aren't autorized");
        return;
      } 
        try {
          jwt.verify(token, JWT_SECRET_KEY);
          next();
        } catch (error) {
          res.status(StatusCodes.UNAUTHORIZED)
            .send("Your token isn't valid");
        }
      
    } else {
      res.status(StatusCodes.UNAUTHORIZED)
        .send({ message: "Authorization header doesn't exist" });
    }
  }  
};
