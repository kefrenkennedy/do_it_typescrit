// src/interfaces.ts
export interface IUserCreate {
  ip: string;
  nome: string;
  email: string;
  senha: string;
}

export interface IUserEdit {
  userId?: string;
  nome?: string;
  email?: string;
  senha?: string;
}

export interface IUserDelete {
  userId: string;
}

export interface IUserSessions {
  userId: string;
  ip: string;
}

export interface ITaskCreate {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: false;
}

export interface ITaskEdit {
  id: string;
  userId?: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface ITaskDelete {
  taskId: string;
}
