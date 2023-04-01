import { Request, Response } from 'express';

import {
  ITaskCreate,
  ITaskDelete,
} from '../interfaces/index';

import taskService from '../services/taskService';

class taskController {
  async create(req: Request, res: Response) {
    const { id: userId } = req.user;

    const { title, description, completed }: ITaskCreate =
      req.body;

    console.log(userId);

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

  async delete(req: Request, res: Response) {
    const { taskId }: ITaskDelete = req.body;
    await taskService.delete({ taskId });

    return res
      .status(200)
      .json({ message: 'Task Deleted with Sucess' });
  }
}

export default new taskController();
