import { body, validationResult } from 'express-validator';


export const loginValidation = [
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is a required field')
      .isString()
      .withMessage('Email must be a string')
      .isEmail()
      .withMessage('Invalid Email'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is a required field')
      .isString()
      .withMessage('Password must be a string'),
  ];