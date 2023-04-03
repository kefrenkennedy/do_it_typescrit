import { AxiosResponse } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import { api } from "../services/api";

interface TaskProviderProps {
  children: ReactNode;
}

interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
}

interface TaskContextData {
  tasks: Task[];
  createTask: (data: Omit<Task, "id">, accessToken: string) => Promise<void>;
  loadTasks: (userId: string, accessToken: string) => Promise<void>;
  deleteTask: (taskId: string, accessToken: string) => Promise<void>;
  updateTask: (
    taskId: string,
    userId: string,
    accessToken: string
  ) => Promise<void>;
  searchTask: (taskTitle: string, accessToken: string) => Promise<void>;
  notFound: boolean;
  taskNotFound: string;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [taskNotFound, setTaskNotFound] = useState("");

  const loadTasks = useCallback(async (userId: string, accessToken: string) => {
    try {
      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createTask = useCallback(
    async (data: Omit<Task, "id">, accessToken: string) => {
      api
        .post("dashboard", data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res: AxiosResponse<Task>) => {
          setTasks((oldTasks) => [...oldTasks, res.data]);
        })
        .catch((err) => console.log(err));
    },
    []
  );

  const deleteTask = useCallback(
    async (taskId: string, accessToken: string) => {
      await api
        .delete(`/dashboard/${taskId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((_) => {
          const filteredTasks = tasks.filter((task) => task.id != taskId);
          setTasks(filteredTasks);
        })
        .catch((err) => console.log(err));
    },
    [tasks]
  );

  const updateTask = useCallback(
    async (taskId: string, userId: string, accessToken: string) => {
      await api
        .patch(
          `/dashboard/${taskId}`,
          { completed: true, userId },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((res) => {
          const filteredTasks = tasks.filter((task) => task.id != taskId);
          const task = tasks.find((task) => task.id === taskId);

          if (task) {
            task.completed = true;
            setTasks([...filteredTasks, task]);
          }
        })
        .catch((err) => console.log(err));
    },
    [tasks]
  );

  const searchTask = useCallback(
    async (taskTitle: string, accessToken: string) => {
      const response = await api.get("/dashboard", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const tasks: Task[] = [];

      const filteredTasks = response.data.map((task: Task) => {
        if (
          task.title.includes(taskTitle) ||
          task.description.includes(taskTitle)
        ) {
          tasks.push(task);
          setNotFound(false);
          return setTasks(tasks);
        }

        if (!tasks.length) {
          setTaskNotFound(taskTitle);
          return setNotFound(true);
        }
      });

      return filteredTasks;
    },
    []
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        loadTasks,
        deleteTask,
        updateTask,
        searchTask,
        notFound,
        taskNotFound,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, useTasks };
