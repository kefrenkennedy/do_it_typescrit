// src/interfaces.ts
export interface IUserCreate {
  ip: string;
  name: string;
  email: string;
  password: string;
}
export interface IUserSessions {
  userId: string;
  ip: string;
}

export interface ITaskComplete {
  taskId: string;
}

export interface ITaskCreate {
  title: string;
  description: string;
  userId: string;
  completed: false;
  createdAt: string;
}
export interface ITaskUpdate {
  title?: string;
  description?: string;
  taskId: string;
}

export interface ITaskDelete {
  taskId: string;
}
