import { NextFunction, Router } from 'express';
import userController from '../controllers/userController';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';

const userRoutes = Router();

userRoutes.post(
  '/',
  [
    body('nome')
      .not()
      .isEmpty()
      .withMessage('nome é um campo obrigatório.')
      .isString()
      .withMessage('Nome precisa ser uma string.'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('email é um campo obrigatório.')
      .isString()
      .withMessage('Email precisa ser uma string.')
      .isEmail()
      .withMessage('Email Invalido.'),
    body('senha')
      .not()
      .isEmpty()
      .withMessage('senha é um campo obrigatório.')
      .isString()
      .isLength({ min: 8 })
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/,
        'i'
      )
      .withMessage(
        'Senha precisa ter no mínimo 8 caracteres e conter pelo menos 1 letra maiúscula, 1 minúscula, 1 símbolo e 1 número'
      ),
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
  userController.create
);

userRoutes.get('/', userController.readAll);

userRoutes.patch(
  '/',
  [
    body('nome')
      .optional()
      .isString()
      .withMessage('Nome precisa ser uma string.'),
    body('email')
      .optional()
      .isString()
      .withMessage('Email precisa ser uma string.')
      .isEmail()
      .withMessage('Email inválido.'),
    body('senha')
      .optional()
      .isString()
      .isLength({ min: 8 })
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/,
        'i'
      )
      .withMessage(
        'Senha precisa ter no mínimo 8 caracteres e conter pelo menos 1 letra maiúscula, 1 minúscula, 1 símbolo e 1 número'
      ),
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
  userController.update
);

userRoutes.delete(
  '/',
  tokenMiddleware.user,
  userController.delete
);

export default userRoutes;
