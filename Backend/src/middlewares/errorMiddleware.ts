import { NextFunction, Request, Response } from 'express';
import { RequestErrors } from '../utils/error/index';

const errorMiddleware = (
  error: Error & Partial<RequestErrors>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message : any = error.message
    ? error.message
    : 'Internal Server Error';
  return res.status(statusCode).json({ message });
};

export default errorMiddleware;
