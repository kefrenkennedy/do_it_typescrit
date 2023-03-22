import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FaExclamation } from "react-icons/fa";
import { theme } from "../../styles/theme";

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
}

export const ModalError = ({ isOpen, onClose, error }: ModalErrorProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FaExclamation color={theme.colors.red["500"]} /> Oops!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Ocorreu algum erro! {error}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="red.500"
              color="white"
              w="100%"
              _hover={{ bg: "red.600" }}
              onClick={onClose}
            >
              Tentar novamente
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      ;
    </>
  );
};
