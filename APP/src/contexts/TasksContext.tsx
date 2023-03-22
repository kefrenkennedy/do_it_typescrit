import { createContext, ReactNode, useContext, useState } from "react";

interface TaskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext({});

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState([]);

  return <TaskContext.Provider value={{}}>{children}</TaskContext.Provider>;
};
