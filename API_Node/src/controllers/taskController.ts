import { Request, Response } from 'express';

import {
  ITaskCreate,
  ITaskDelete,
  ITaskEdit,
} from '../interfaces/index';
import taskService from '../services/taskService';

class taskController {
  async create(req: Request, res: Response) {
    const {
      id,
      title,
      description,
      userId,
      completed,
    }: ITaskCreate = req.body;

    const data = await taskService.create({
      id,
      title,
      description,
      userId,
      completed,
    });

    return res.status(201).json({
      data,
    });
  }

  async update(req: Request, res: Response) {
    const {       id,
        title,
        description,
        completed, }: ITaskEdit =
      req.body;

    const userId = req.user.id;

    const data = await taskService.update({
      id,
      title,
      description,
      completed,
    });

    return res.status(200).json({
      data,
    });
  }

  async readAll(req: Request, res: Response) {
    const data = await taskService.readAll();

    return res.status(200).json({
      data,
    });
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
