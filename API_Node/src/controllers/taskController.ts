import { Request, Response } from 'express';

import {
  ITaskComplete,
  ITaskCreate,
  ITaskDelete,
} from '../interfaces/index';

import taskService from '../services/taskService';
import prismaConnect from 'utils/databaseClient';

class taskController {
  async create(req: Request, res: Response) {
    const { id: userId } = req.user;

    const { title, description, completed }: ITaskCreate =
      req.body;

    const data = await taskService.create({
      title,
      description,
      userId,
      completed,
    });

    return res.status(201).json(data);
  }

  async list(req: Request, res: Response) {
    const { id: userId } = req.user;

    const data = await taskService.list(userId);

    return res.status(201).json(data);
  }

  async listFiltered(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { title } = req.body;

    const data = await taskService.listFiltered(
      userId,
      title
    );

    return res.status(201).json(data);
  }

  async completeTask(req: Request, res: Response) {
    const taskId = req.params.taskId
    await taskService.completeTask({ taskId });

    return res
      .status(200)
      .json({ message: 'completed task successfully' });
  }

  async delete(req: Request, res: Response) {
    const { taskId }: ITaskDelete = req.body;
    await taskService.delete({ taskId });

    return res
      .status(200)
      .json({ message: 'Task Deleted with Sucess' });
  }
}

export default new taskController();
