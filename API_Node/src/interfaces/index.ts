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

export interface ITaskCreate {
  title: string;
  description: string;
  userId: string;
  completed: false;
}

export interface ITaskDelete {
  taskId: string;
}
