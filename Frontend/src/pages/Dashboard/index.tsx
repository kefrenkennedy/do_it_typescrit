import { useDisclosure } from "@chakra-ui/react";

import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";
import { useState, useEffect } from "react";
import { ModalTaskDetail } from "../../components/Modal/ModalTaskDetail";

import { TaskList } from "./TasksList";
import { FirstTask } from "./FirstTask";
import { NotFound } from "./NotFound";
import { Task } from "../../interfaces";



export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user, accessToken } = useAuth();
  const { tasks, loadTasks, notFound, taskNotFound } = useTasks();

  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);

  const {
    isOpen: isTaskDetailOpen,
    onOpen: onTaskDetailOpen,
    onClose: onTaskDetailClose,
  } = useDisclosure();

  useEffect(() => {
    loadTasks(user.id, accessToken).then((res) => setLoading(false));
  }, []);

  const handleClick = (task: Task) => {
    setSelectedTask(task);
    onTaskDetailOpen();
  };

  if (notFound) {
    return (
      <NotFound
        isTaskDetailOpen={isTaskDetailOpen}
        onTaskDetailClose={onTaskDetailClose}
        selectedTask={selectedTask}
        taskNotFound={taskNotFound}
      />
    );
  }

  return (
    <>
      {notFound ? (
        <NotFound
          isTaskDetailOpen={isTaskDetailOpen}
          onTaskDetailClose={onTaskDetailClose}
          selectedTask={selectedTask}
          taskNotFound={taskNotFound}
        />
      ) : (
        <>
          <ModalTaskDetail
            isOpen={isTaskDetailOpen}
            onClose={onTaskDetailClose}
            task={selectedTask}
          />
          {!loading && !tasks.length ? (
            <FirstTask />
          ) : (
            <TaskList
              handleClick={handleClick}
              loading={loading}
              tasks={tasks}
            />
          )}
        </>
      )}
    </>
  );
};
