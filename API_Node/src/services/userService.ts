import { hash } from 'bcryptjs';
import {
  IUserCreate,
  IUserDelete,
  IUserEdit,
} from '../interfaces/index';
import prismaConnect from '../utils/databaseClient/index';
import {
  ConflitError,
  NotFoundError,
} from '../utils/error/index';
import authService from './authService';
import 'dotenv/config';

class userService {
  async create({
    ip,
    nome,
    email,
    senha,
  }: IUserCreate) {
    const verifyUserEmail =
      await prismaConnect.users.findUnique({
        where: { email },
      });

    if (verifyUserEmail) {
      throw new ConflitError(
        'this email is already registered'
      );
    }

    const hashedSenha = await hash(senha.toString(), 10);

    const user = await prismaConnect.users.create({
      data: {
        ip,
        nome,
        email,
        senha: hashedSenha,
        isActive: true,
      },
    });

    const accessToken = await authService.login(
      email,
      senha,
      ip
    );

    await prismaConnect.userSessions.create({
      data: {
        UserId: user.id,
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
    userId,
    nome,
    email,
    senha,

  }: IUserEdit) {
    const id = userId;

    const updateUser = await prismaConnect.users.update({
      where: {
        id,
      },
      data: {
        nome,
        email,
        senha,
      },
    });

    return { updateUser };
  }

  async delete({ userId }: IUserDelete) {
    const user = await prismaConnect.users.findUnique({
      where: { id: userId },
    });

    if (!user?.isActive) {
      throw new NotFoundError('User not found.');
    }

    await prismaConnect.users.update({
      where: {
        id: userId,
      },
      data: {
        isActive: false,
      },
    });

    return { response: 'User deleted with success.' };
  }
}

export default new userService();
