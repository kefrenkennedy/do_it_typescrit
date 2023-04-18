import { body, validationResult } from 'express-validator';


export const loginValidation = [
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is a required field')
      .isEmail()
      .withMessage('Invalid Email'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is a required field')
  ];