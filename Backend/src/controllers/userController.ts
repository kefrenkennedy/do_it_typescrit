import { Request, Response } from 'express';

import {
  IUserCreate,
  IUserUpdate,
} from '../interfaces/index';
import { excludeResponseMiddleware } from '../middlewares/excludeResponseMiddleware';
import userService from '../services/userService';
import { body, validationResult } from 'express-validator';

class userController {
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

    const { name, email, password }: IUserCreate = req.body;

    const ip = req.ip;

    const data = await userService.create({
      ip,
      name,
      email,
      password,
    });

    return res.status(201).json({
      data: excludeResponseMiddleware(data, ['password']),
    });
  }

  async readAll(req: Request, res: Response) {
    const data = await userService.readAll();

    return res.status(200).json({
      data: excludeResponseMiddleware(data, ['password']),
    });
  }

  async update(req: Request, res: Response) {
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

    const { name, email, password }: IUserUpdate = req.body;

    const userId = req.user.id;

    const data = await userService.update({
      userId,
      name,
      email,
      password,
    });

    return res.status(200).json({
      data: excludeResponseMiddleware(data, ['password']),
    });
  }

  async delete(req: Request, res: Response) {
    const userId = req.user.id;

    await userService.delete({ userId });
    return res
      .status(200)
      .json({ message: 'User Deleted with Sucess' });
  }
}

export default new userController();
