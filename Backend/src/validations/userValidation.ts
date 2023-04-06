import { body } from 'express-validator';

export const createUserValidation = [
  body('name')
    .if((value: any) => value !== '')
    .isString()
    .withMessage('name must be a string'),
  body('email')
    .if((value: any) => value !== '')
    .isString()
    .withMessage('Email must be a string')
    .isEmail()
    .withMessage('Invalid Email'),
  body('password')
    .if((value: any) => value !== '')
    .isString()
    .isLength({ min: 8 })
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/,
      'i'
    )
    .withMessage(
      'Password must have at least 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol, and 1 number.'
    ),
];

export const updateUserValidation = [
  body('name')
    .if((value: any) => value !== '')
    .isString()
    .withMessage('name must be a string'),
  body('email')
    .if((value: any) => value !== '')
    .isString()
    .withMessage('Email must be a string')
    .isEmail()
    .withMessage('Invalid Email'),
  body('password')
    .optional()
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 8 })
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/,
      'i'
    )
    .withMessage(
      'Password must have at least 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol, and 1 number.'
    ),
];
