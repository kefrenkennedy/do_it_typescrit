import { Request, Response } from 'express';
import authService from '../services/authService';

class authController {
  async login(req: Request, res: Response) {
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
