import HttpException from '../utils/HttpException';

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message = 'Server probled occured :(' } = error;

  res.status(statusCode).send(message);
};
