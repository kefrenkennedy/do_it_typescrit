import { Request, Response } from 'express';

import { IUserCreate } from '../interfaces/index';
import { excludeResponseMiddleware } from '../middlewares/excludeResponseMiddleware';
import userService from '../services/userService';

class userController {
  async create(req: Request, res: Response) {
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
}

export default new userController();
