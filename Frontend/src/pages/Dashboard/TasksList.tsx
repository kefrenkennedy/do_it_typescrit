import { Box, Grid } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { CardSkeleton } from "../../components/Skeleton/CardSkeleton";
import { useTasks } from "../../contexts/TasksContext";
import { Task } from "../../interfaces";



interface TaskListProps {
  loading: boolean;
  tasks: Task[];
  handleClick: (task: Task) => void;
}

export const TaskList = ({ loading, tasks, handleClick }: TaskListProps) => {
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
