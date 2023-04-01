import { hash } from 'bcryptjs';
import {
  IUserCreate,
} from '../interfaces/index';
import prismaConnect from '../utils/databaseClient/index';
import {
  ConflitError,
  NotFoundError,
} from '../utils/error/index';
import authService from './authService';
import 'dotenv/config';

class userService {
  async create({ ip, name, email, password }: IUserCreate) {
    const verifyUserEmail =
      await prismaConnect.users.findUnique({
        where: { email },
      });

    if (verifyUserEmail) {
      throw new ConflitError(
        'this email is already registered'
      );
    }

    const hashedpassword = await hash(
      password.toString(),
      10
    );

    const user = await prismaConnect.users.create({
      data: {
        ip,
        name,
        email,
        password: hashedpassword,
      },
    });

    const accessToken = await authService.login(
      email,
      password,
      ip
    );

    await prismaConnect.userSessions.create({
      data: {
        userId: user.id,
        ip,
        type: 'user: create user',
      },
    });

    return {
      user,
      accessToken,
    };
  }
}

export default new userService();
