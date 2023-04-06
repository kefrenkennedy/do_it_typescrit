import { Router } from 'express';
import userController from '../controllers/userController';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import {
  createUserValidation,
  updateUserValidation,
} from '../validations/userValidation';

const userRoutes = Router();

userRoutes.post(
  '/',
  createUserValidation,
  userController.create
);

userRoutes.get('/', userController.readAll);

userRoutes.patch(
  '/:userId',
  tokenMiddleware.user,
  updateUserValidation,
  userController.update
);

userRoutes.delete(
  '/:userId',
  tokenMiddleware.user,
  userController.delete
);

export default userRoutes;
