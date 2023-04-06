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
import { User } from "../../interfaces";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { Input } from "../Form/input";

interface ModalUpdateUserProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  userId: string;
}

const updateUserSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email("Invalid email"),
  password: yup
    .string()
    .test(
      "passwordLowercase",
      "Password must contain at least one lowercase letter",
      (password?: string) => {
        return !password || /[a-z]/.test(password);
      }
    )
    .test(
      "passwordUppercase",
      "Password must contain at least one uppercase letter",
      (password?: string) => {
        return !password || /[A-Z]/.test(password);
      }
    )
    .test(
      "passwordNumber",
      "Password must contain at least one number",
      (password?: string) => {
        return !password || /\d/.test(password);
      }
    )
    .test(
      "passwordSymbol",
      "Password must contain at least one symbol",
      (password?: string) => {
        return !password || /[!@#$%^&*(),.?":{}|<>]/.test(password);
      }
    )
    .test(
      "passwordLength",
      "Password must have at least 8 characters",
      (password?: string) => {
        return !password || password.length >= 8;
      }
    ),
});

export const ModalUpdateUser = ({ isOpen, onClose }: ModalUpdateUserProps) => {
  const { user, accessToken } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<UserData>({
    resolver: yupResolver(updateUserSchema),
  });

  useEffect(() => {
    reset(user);
  }, []);

  const { updateUser } = useUser();

  const handleUpdateUser = (data: UserData) => {
    const updatedData = {
      updatedName: data.name,
      updatedEmail: data.email,
      updatedPassword: data.password,
      userId: user.id,
    };

    updateUser(updatedData)
      .then((res) => {
        localStorage.setItem(
          "@Doit:user",
          JSON.stringify({
            name: updatedData.updatedName,
            email: updatedData.updatedEmail,
            password: updatedData.updatedPassword,
            userId: updatedData.userId,
          })
        );

        onClose();
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleSubmit(handleUpdateUser)}
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
                label="Name"
                error={errors.name}
                {...register("name")}
                placeholder="Type the new name"
              />
              <Textarea
                label="Email"
                error={errors.email}
                {...register("email")}
                placeholder="Type the new email"
              />
              <Input
                label="Password"
                type="password"
                error={errors.password}
                {...register("password")}
                placeholder="Type the new password"
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
              onClick={handleSubmit(handleUpdateUser)}
            >
              Edit user
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
