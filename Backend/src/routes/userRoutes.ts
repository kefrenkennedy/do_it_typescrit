import { Router } from 'express';
import userController from '../controllers/userController';
import tokenMiddleware from '../middlewares/tokenMiddleware';

const userRoutes = Router();

userRoutes.post('/', userController.create);

userRoutes.patch(
  '/:userId',
  tokenMiddleware.user,
  userController.update
);

userRoutes.delete(
  '/:userId',
  tokenMiddleware.user,
  userController.delete
);

export default userRoutes;
