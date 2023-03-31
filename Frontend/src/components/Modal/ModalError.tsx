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

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
  secondaryText: string;
}

export const ModalError = ({
  isOpen,
  onClose,
  error,
  secondaryText,
}: ModalErrorProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="gray.800">
          <ModalHeader display="flex">
            <Center bg="red.500" w="30px" h="30px" borderRadius="5px">
              <FaExclamation color={theme.colors.white} />
            </Center>
            <Text> Oops!</Text>
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
              Ocorreu algum erro! <b>{error}</b>
            </Text>
          </ModalBody>

          <ModalFooter display="column">
            <Button
              bg="red.600"
              color="white"
              w="100%"
              h="60px"
              _hover={{ bg: "red.700" }}
              onClick={onClose}
            >
              Tentar novamente
            </Button>
            <Text textAlign="center" mt="4">
              <Box dangerouslySetInnerHTML={{ __html: secondaryText }} />
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
