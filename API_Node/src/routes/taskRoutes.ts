import { Router } from 'express';
import taskController from '../controllers/taskController';
import tokenMiddleware from '../middlewares/tokenMiddleware';

const taskRoutes = Router();

taskRoutes.post(
  '/',
  tokenMiddleware.user,
  taskController.create
);

taskRoutes.get(
  '/',
  tokenMiddleware.user,
  taskController.list
);

taskRoutes.delete(
  '/',
  tokenMiddleware.user,
  taskController.delete
);

export default taskRoutes;
