import { NextFunction, Router } from 'express';
import authController from '../controllers/authController';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';

const authRotes = Router();

authRotes.post(
  '/',
  [
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email é um campo obrigatório')
      .isString()
      .withMessage('Email precisa ser uma string')
      .isEmail()
      .withMessage('Email inválido.'),
    body('senha')
      .not()
      .isEmpty()
      .withMessage('senha é um campo obrigatório.')
      .isString()
      .withMessage('A senha precisa ser uma string.'),
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
  authController.login
);

export default authRotes;
