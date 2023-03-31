import { compareSync } from 'bcryptjs';
import prismaConnect from '../utils/databaseClient/index';
import { UnauthorizedError } from '../utils/error/index';
import jwt from 'jsonwebtoken';

class AuthService {
  async login(email: string, senha: string, ip: string) {
    const findUser = await prismaConnect.users.findUnique({
      where: { email },
    });

    if (!findUser || !findUser.isActive) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (!compareSync(senha, findUser.senha)) {
      await prismaConnect.userSessions.create({
        data: {
          UserId: findUser!.id,
          ip,
          type: 'user: login/wrong password',
        },
      });
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = jwt.sign(
      {
        id: findUser.id,
        email: findUser.email,
      },
      process.env['SECRET_KEY'] as string,
      { expiresIn: '72h', subject: findUser.id }
    );

    await prismaConnect.userSessions.create({
      data: {
        UserId: findUser.id,
        ip,
        type: 'user: login',
      },
    });

    return token;
  }
}

export default new AuthService();
