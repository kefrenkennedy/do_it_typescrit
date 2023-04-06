import { Request, Response } from 'express';
import authService from '../services/authService';
import { validationResult } from 'express-validator';

class authController {
  async login(req: Request, res: Response) {
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

    const { email, password } = req.body;

    const ip = req.ip;

    const { token, user } = await authService.login(
      email,
      password,
      ip
    );

    return res.json({ accessToken: token, user });
  }
}

export default new authController();
