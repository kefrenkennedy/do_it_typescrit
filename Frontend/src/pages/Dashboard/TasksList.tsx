import { Box, Grid } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { CardSkeleton } from "../../components/Skeleton/CardSkeleton";
import { useTasks } from "../../contexts/TasksContext";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskData {
  data: Task;
}

interface TaskListProps {
  loading: boolean;
  tasks: Task[];
  handleClick: (task: Task) => void;
}

export const TaskList = ({ loading, tasks, handleClick }: TaskListProps) => {
  const { searchTask } = useTasks();

  return (
    <>
      <Box>
        <Header />
        <SearchBox />
        <Grid
          mb="50px"
          w="100%"
          templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
          gap={10}
          paddingX="8"
          mt="8"
        >
          {loading ? (
            <CardSkeleton repeatCount={6} />
          ) : (
            tasks.map((task) => <Card task={task} onClick={handleClick} />)
          )}
        </Grid>
      </Box>
    </>
  );
};
