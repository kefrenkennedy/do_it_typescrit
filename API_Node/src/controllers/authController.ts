import { Request, Response } from 'express';
import authService from '../services/authService';

class authController {
  async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    const ip = req.ip;

    const token = await authService.login(
      email,
      senha,
      ip
    );

    return res.json({ accessToken: token });
  }


}

export default new authController();
