import { Request, Response } from 'express';

import { ITaskCreate } from '../interfaces/index';

import taskService from '../services/taskService';

import { validationResult } from 'express-validator';

function formatDate(date: Date): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate().toString().padStart(2, '0');
  const monthName = months[date.getMonth()];
  const year = date.getFullYear().toString();

  return `${day} ${monthName} ${year}`;
}

class taskController {
  async create(req: Request, res: Response) {
    const errors = validationResult(req);

    const response: any = [];

    errors.array().forEach((obj) => {
      if (obj.msg !== 'Invalid value') {
        response.push(obj.msg);
      }
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: response });
    }

    const { id: userId } = req.user;

    const { title, description, completed }: ITaskCreate =
      req.body;

    const createdAt = formatDate(new Date());

    const data = await taskService.create({
      title,
      description,
      userId,
      completed,
      createdAt,
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
    const errors = validationResult(req);

    const response: any = [];

    errors.array().forEach((obj) => {
      if (obj.msg !== 'Invalid value') {
        response.push(obj.msg);
      }
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: response });
    }

    const taskId = req.params.taskId;

    await taskService.completeTask({ taskId });

    return res
      .status(200)
      .json({ message: 'completed task successfully' });
  }

  async updateTask(req: Request, res: Response) {
    const errors = validationResult(req);

    const response: any = [];

    errors.array().forEach((obj) => {
      if (obj.msg !== 'Invalid value') {
        response.push(obj.msg);
      }
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: response });
    }

    const taskId = req.params.taskId;

    const { title, description } = req.body;

    await taskService.updateTask({
      taskId,
      title,
      description,
    });

    return res
      .status(200)
      .json({ message: 'task updated successfully' });
  }

  async delete(req: Request, res: Response) {
    const taskId = req.params.taskId;

    await taskService.delete({ taskId });

    return res
      .status(200)
      .json({ message: 'Task Deleted with Sucess' });
  }
}

export default new taskController();
