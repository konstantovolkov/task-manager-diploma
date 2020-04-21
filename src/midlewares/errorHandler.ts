import HttpException from '../utils/HttpException';

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode).send({
    message: err.message
  });
};
