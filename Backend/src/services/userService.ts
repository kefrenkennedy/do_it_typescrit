import { hash } from 'bcryptjs';
import {
  IUserCreate,
  IUserDelete,
  IUserUpdate,
} from '../interfaces/index';
import prismaConnect from '../utils/databaseClient/index';
import {
  ConflitError,
  NotFoundError,
} from '../utils/error/index';
import authService from './authService';
import 'dotenv/config';
import { warnEnvConflicts } from '@prisma/client/runtime';

function isEmailValid(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

class userService {
  async create({ ip, name, email, password }: IUserCreate) {
    const verifyUserEmail =
      await prismaConnect.users.findUnique({
        where: { email },
      });

    if (!isEmailValid(email)) {
      throw new Error('Invalid email');
    }

    if (verifyUserEmail) {
      throw new ConflitError(
        'This email is already registered'
      );
    }

    const hashedPassword = await hash(
      password.toString(),
      10
    );

    const user = await prismaConnect.users.create({
      data: {
        ip,
        name,
        email,
        password: hashedPassword,
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

  async readAll() {
    const AllUsers = await prismaConnect.users.findMany();
    if (!AllUsers) {
      throw new NotFoundError('No User Found.');
    }
    return AllUsers;
  }

  async update({
    name,
    email,
    password,
    userId,
  }: IUserUpdate) {
    const id = userId;

    if (password) {
      const hashedPassword = await hash(
        password.toString(),
        10
      );

      const updatedUser = await prismaConnect.users.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return { updatedUser };
    }

    const updatedUser = await prismaConnect.users.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });

    return { updatedUser };
  }

  async delete({ userId }: IUserDelete) {
    const user = await prismaConnect.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found.');
    }
    await prismaConnect.users.delete({
      where: {
        id: userId,
      },
    });

    return { response: 'User deleted with success.' };
  }
}

export default new userService();
