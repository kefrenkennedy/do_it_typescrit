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
} from "@chakra-ui/react";
import { FaExclamation, FaTimes } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

interface ModalDeleteUserProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalDeleteUser = ({ isOpen, onClose }: ModalDeleteUserProps) => {
  const { deleteUser } = useUser();
  const { user, accessToken } = useAuth();

  const handleDeleteUser = () => {
    const data = { userId: user.id, accessToken: accessToken };
    deleteUser(data);
    localStorage.clear();
    location.reload();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="gray.800">
          <ModalHeader display="flex">
            <Center bg="red.500" w="30px" h="30px" borderRadius="5px">
              <FaExclamation color={theme.colors.white} />
            </Center>
            <Text> Delete Account</Text>
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

          <ModalBody textAlign="center" color="gray.400">
            <Text>
              Are you sure that you want to <b>delete your account?</b>
            </Text>
          </ModalBody>

          <ModalFooter display="column">
            <Button
              bg="red.600"
              color="white"
              w="100%"
              h="60px"
              _hover={{ bg: "red.700" }}
              onClick={handleDeleteUser}
            >
              Delete Account
            </Button>
            <Text textAlign="center" mt="4">
              All your data will be deleted...
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
