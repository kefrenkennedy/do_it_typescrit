import { NotFoundError } from 'utils/error';
import {
  ITaskComplete,
  ITaskCreate,
  ITaskDelete,
  ITaskUpdate,
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

  async readAllUsersTask() {
    const allTasks =
      await prismaConnect.tasks.findMany();
    if (!allTasks) {
      throw new NotFoundError('Tasks Not Found.');
    }
    return allTasks;
  }

  async list(userId: string) {
    const tasks = await prismaConnect.tasks.findMany({
      where: { userId },
    });

    return tasks;
  }

  async listFiltered(userId: string, title: string) {
    const filteredTasks =
      await prismaConnect.tasks.findMany({
        where: {
          userId,
          OR: [
            { title: { contains: title } },
            { description: { contains: title } },
          ],
        },
      });

    return filteredTasks;
  }

  async updateTask({
    taskId,
    title,
    description,
  }: ITaskUpdate) {
    const completedTask = await prismaConnect.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        title: title,
        description: description,
      },
    });

    return completedTask;
  }

  async completeTask({ taskId }: ITaskComplete) {
    const task = await prismaConnect.tasks.findUnique({
      where: {
        id: taskId,
      },
    });

    if (task?.completed === false) {
      const completedTask =
        await prismaConnect.tasks.update({
          where: {
            id: taskId,
          },
          data: {
            completed: true,
          },
        });

      return completedTask;
    }

    if (task?.completed === true) {
      const completedTask =
        await prismaConnect.tasks.update({
          where: {
            id: taskId,
          },
          data: {
            completed: false,
          },
        });

      return completedTask;
    }
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
