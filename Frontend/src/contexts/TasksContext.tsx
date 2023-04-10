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
  createdAt?: string;
}

interface TaskContextData {
  tasks: Task[];
  createTask: (data: Omit<Task, "id">, accessToken: string) => Promise<void>;
  loadTasks: (userId: string, accessToken: string) => Promise<void>;
  searchTask: (taskTitle: string, accessToken: string) => Promise<void>;
  updateTask: (
    updatedTitle: string,
    updatedDescription: string,
    taskId: string,
    userId: string,
    accessToken: string
  ) => Promise<void>;
  completeTask: (
    taskId: string,
    userId: string,
    accessToken: string
  ) => Promise<void>;
  deleteTask: (taskId: string, accessToken: string) => Promise<void>;
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

  const createTask = useCallback(
    async (data: Omit<Task, "id">, accessToken: string) => {
      api
        .post("dashboard/task", data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res: AxiosResponse<Task>) => {
          setTasks((oldTasks) => [...oldTasks, res.data]);
        })
        .catch((err) => console.log(err));
    },
    []
  );

  const loadTasks = useCallback(async (userId: string, accessToken: string) => {
    try {
      const response = await api.get("/dashboard/task", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const searchTask = useCallback(
    async (taskTitle: string, accessToken: string) => {
      const response = await api.get("/dashboard/task/search", {
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

  const deleteTask = useCallback(
    async (taskId: string, accessToken: string) => {
      await api
        .delete(`/dashboard/task/${taskId}`, {
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
    async (
      updatedTitle: string,
      updatedDescription: string,
      taskId: string,
      userId: string,
      accessToken: string
    ) => {
      const updatedFields: { title?: string; description?: string } = {};
      if (updatedTitle) {
        updatedFields.title = updatedTitle;
      }
      if (updatedDescription) {
        updatedFields.description = updatedDescription;
      }
      await api
        .patch(
          `/dashboard/task/${taskId}`,
          { ...updatedFields, userId },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((res) => {
          const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
              return {
                ...task,
                title: updatedFields.title ?? task.title,
                description: updatedFields.description ?? task.description,
              };
            }
            return task;
          });
          setTasks(updatedTasks);
        })
        .catch((err) => console.log(err));
    },
    [tasks]
  );

  const completeTask = useCallback(
    async (taskId: string, userId: string, accessToken: string) => {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        await api
          .patch(
            `/dashboard/task/complete/${taskId}`,
            { completed: !task.completed, userId },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            const filteredTasks = tasks.filter((task) => task.id != taskId);

            setTasks([
              ...filteredTasks,
              { ...task, completed: !task.completed },
            ]);
          })
          .catch((err) => console.log(err));
      }
    },
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        loadTasks,
        searchTask,
        updateTask,
        completeTask,
        deleteTask,
        notFound,
        taskNotFound,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, useTasks };
