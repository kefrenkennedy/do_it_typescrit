import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaClipboard, FaExclamation, FaTimes } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { Textarea } from "../Form/TextArea";
import * as yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";
import { Task } from "../../interfaces";
import { useEffect } from "react";

interface ModalUpdateTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

interface TaskData {
  title: string;
  description: string;
  taskId: string;
}

const updateTaskSchema = yup.object().shape({
  title: yup
    .string()
    .required("Required Field")
    .max(100, "aximum of 100 characters"),
  description: yup.string(),
});

export const ModalUpdateTask = ({
  isOpen,
  onClose,
  task,
}: ModalUpdateTaskProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<TaskData>({
    resolver: yupResolver(updateTaskSchema),
  });

  useEffect(() => {
    reset(task);
  }, []);

  const { user, accessToken } = useAuth();

  const { updateTask } = useTasks();

  const handleUpdateTask = (data: TaskData) => {
    updateTask(
      data.title,
      data.description,
      task.id,
      user.id,
      accessToken
    ).then((res) => onClose());
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleSubmit(handleUpdateTask)}
          padding="2"
          bg="white"
          color="gray.800"
        >
          <ModalHeader display="flex">
            <Center bg="purple.500" w="30px" h="30px" borderRadius="5px">
              <FaClipboard color={theme.colors.white} />
            </Center>
            <Text fontWeight="bold" ml="2">
              Edit
            </Text>
            <Center
              onClick={onClose}
              as="button"
              ml="auto"
              h="32px"
              w="32px"
              bg="red.600"
              fontSize="lg"
              borderRadius="md"
            >
              <FaTimes color={theme.colors.white} />
            </Center>
          </ModalHeader>

          <ModalBody textAlign="center">
            <VStack spacing="5">
              <Textarea
                label="Título"
                error={errors.title}
                {...register("title")}
                placeholder="Digite o título"
              />
              <Textarea
                label="Descrição"
                error={errors.description}
                {...register("description")}
                placeholder="Digite a descrição"
              />
            </VStack>
          </ModalBody>

          <ModalFooter flexDirection="column">
            <Button
              type="submit"
              bg="purple.500"
              color="white"
              w="100%"
              h="60px"
              _hover={{ bg: "purple.600" }}
              onClick={handleSubmit(handleUpdateTask)}
            >
              Edit task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
