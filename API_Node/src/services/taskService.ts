import {
  ITaskCreate,
  ITaskDelete,
  ITaskEdit,
} from '../interfaces/index';
import prismaConnect from '../utils/databaseClient/index';
import { NotFoundError } from '../utils/error/index';

import 'dotenv/config';

class taskService {
  async create({ title, description }: ITaskCreate) {
    const task = await prismaConnect.tasks.create({
      data: {
        title,
        description,
      },
    });

    return {
      task,
    };
  }

  async readAll() {
    const AllTasks = await prismaConnect.tasks.findMany();
    if (!AllTasks) {
      throw new NotFoundError('No Task Found');
    }
    return AllTasks;
  }

  async update({ id, title, description, completed }: ITaskEdit) {
    const updateTask = await prismaConnect.tasks.update({
      where: {
        id,
      },
      data: {
        title,
          description,
        completed,
      },
    });

    return { updateTask };
  }

  async delete({ taskId }: ITaskDelete) {
    const task = await prismaConnect.tasks.findUnique({
      where: { id: taskId },
    });

    if (!task?.isActive) {
      throw new NotFoundError('Task not found');
    }

    await prismaConnect.tasks.delete({
      where: {
        id: taskId,
      },
    });

    return { response: 'task deleted with success.' };
  }
}

export default new taskService();
