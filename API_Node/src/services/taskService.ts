import {
  ITaskCreate,
  ITaskDelete,
} from '../interfaces/index';
import prismaConnect from '../utils/databaseClient/index';

import 'dotenv/config';

class taskService {
  async create({
    userId,
    title,
    description,
  }: ITaskCreate) {
    const task = await prismaConnect.tasks.create({
      data: {
        title,
        description,
        completed: false,
        userId,
      },
    });

    return task;
  }

  async list(userId: string) {
    const tasks = await prismaConnect.tasks.findMany({
      where: { userId },
    });

    return tasks;
  }

  async delete({ taskId }: ITaskDelete) {
    await prismaConnect.tasks.delete({
      where: {
        id: taskId,
      },
    });

    return { response: 'task deleted with success.' };
  }
}

export default new taskService();
