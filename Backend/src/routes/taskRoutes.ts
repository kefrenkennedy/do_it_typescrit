import { Router } from 'express';
import taskController from '../controllers/taskController';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import {
  completeTaskValidation,
  createTaskValidation,
  updateTaskValidation,
} from 'validations/taskValidation';

const taskRoutes = Router();

taskRoutes.post(
  '/',
  tokenMiddleware.user,
  createTaskValidation,
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
  '/:taskId',
  tokenMiddleware.user,
  updateTaskValidation,
  taskController.updateTask
);

taskRoutes.patch(
  '/:taskId/complete',
  tokenMiddleware.user,
  completeTaskValidation,
  taskController.completeTask
);

taskRoutes.delete(
  '/:taskId',
  tokenMiddleware.user,
  taskController.delete
);

export default taskRoutes;
