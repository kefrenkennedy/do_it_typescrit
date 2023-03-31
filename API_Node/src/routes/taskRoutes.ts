import { NextFunction, Router } from 'express';
import taskController from '../controllers/taskController';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';

const userRoutes = Router();

userRoutes.post(
  '/',
  [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required')
      .isString()
      .withMessage('Nome precisa ser uma string.')
      .isLength({ max: 100 }),
    body('description')
      .isString()
      .withMessage('Email precisa ser uma string.'),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const response: any = [];

    errors.array().forEach((obj) => {
      if (obj.msg !== 'Invalid value') {
        response.push(obj.msg);
      }
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: response });
    }
    next();
  },
  taskController.create
);

userRoutes.get('/', taskController.readAll);

userRoutes.patch(
  '/',
  [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required')
      .isString()
      .withMessage('Nome precisa ser uma string.')
      .isLength({ max: 100 }),
    body('description')
      .isString()
      .withMessage('Email precisa ser uma string.'),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const response: any = [];

    errors.array().forEach((obj) => {
      if (obj.msg !== 'Invalid value') {
        response.push(obj.msg);
      }
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: response });
    }
    next();
  },
  tokenMiddleware.user,
  taskController.update
);

userRoutes.delete(
  '/',
  tokenMiddleware.user,
  taskController.delete
);

export default userRoutes;
