import { body } from 'express-validator';

export const createUserValidation = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string'),
  body('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isString()
    .withMessage('Email must be a string')
    .isEmail()
    .withMessage('Invalid Email'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
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
    .isString()
    .withMessage('name must be a string'),
  body('email')
    .isString()
    .withMessage('Email must be a string')
    .isEmail()
    .withMessage('Invalid Email'),
  body('password')
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
