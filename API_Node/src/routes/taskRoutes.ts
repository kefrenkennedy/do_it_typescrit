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

taskRoutes.get(
  '/',
  tokenMiddleware.user,
  taskController.listFiltered
);

taskRoutes.patch(
  '/',
  tokenMiddleware.user,
  taskController.completeTask
);

taskRoutes.delete(
  '/',
  tokenMiddleware.user,
  taskController.delete
);

export default taskRoutes;
