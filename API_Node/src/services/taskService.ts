import {
  ITaskComplete,
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

  async listFiltered(userId: string, title: string) {
    const tasks = await prismaConnect.tasks.findMany({
      where: { userId },
    });

    const filteredTasks = tasks.map((task) => {
      if (
        task.title.includes(title) ||
        task.description.includes(title)
      ) {
        return task;
      }
    });

    return filteredTasks;
  }

  async completeTask({ taskId }: ITaskComplete) {
    const completedTask = await prismaConnect.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        completed: true,
      },
    });

    return completedTask;
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
