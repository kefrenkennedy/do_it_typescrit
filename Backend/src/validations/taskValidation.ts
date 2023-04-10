import { body } from 'express-validator';

export const createTaskValidation = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ max: 100 })
    .withMessage('Title must at most 100 characters'),
  body('description')
    .isString()
    .withMessage('Description must be a string'),
];

export const updateTaskValidation = [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required')
      .isString()
      .withMessage('Title must be a string')
      .isLength({ max: 100 })
      .withMessage('Title must at most 100 characters'),
    body('description')
      .isString()
      .withMessage('Description must be a string'),
];
  

