import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Progress,
  Text,
} from "@chakra-ui/react";
import { FaCheck, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";
import { theme } from "../../styles/theme";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
}

interface CardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export const Card = ({ task, onClick }: CardProps) => {
  const { deleteTask, completeTask, updateTask } = useTasks();
  const { accessToken, user } = useAuth();

  return (
    <>
      <Box
        cursor="pointer"
        _hover={{ transform: "translateY(-7px)", borderColor: "gray.100" }}
        transition="border 0.2s, ease 0s, transform 0.2"
        borderWidth="1px"
        borderColor="gray.50"
        boxShadow="base"
        padding="7"
        w={["80vw", "auto"]}
      >
        <Flex justifyContent="space-between">
          <Heading as="h1" size="md">
            {task.title}
          </Heading>
          <HStack spacing="4">
            <Center
              as="button"
              w="30px"
              h="30px"
              borderWidth="1px"
              borderRadius="5px"
              borderColor="gray.200"
              bgColor="white"
              onClick={() => updateTask}
            >
              <FaPencilAlt color={theme.colors.gray[300]} />
            </Center>
            <Center
              as="button"
              w="30px"
              h="30px"
              borderWidth="1px"
              borderRadius="5px"
              borderColor="gray.200"
              bgColor="white"
              onClick={() => deleteTask(task.id, accessToken)}
            >
              <FaTrash color={theme.colors.gray[300]} />
            </Center>
            <Center
              as="button"
              w="30px"
              h="30px"
              borderWidth="1px"
              borderRadius="5px"
              borderColor="gray.200"
              bgColor="white"
              onClick={() => completeTask(task.id, user.id, accessToken)}
            >
              <FaCheck color="gray.200" />
            </Center>
          </HStack>
        </Flex>
        <Box w="100%" mt="4" onClick={() => onClick(task)}>
          <Text>{task.description}</Text>
          <Progress
            colorScheme="purple"
            mt="2.5"
            value={task.completed ? 100 : 10}
          />
          <Text color="gray.200" mt="3">
            {task.createdAt}
          </Text>
        </Box>
      </Box>
    </>
  );
};
