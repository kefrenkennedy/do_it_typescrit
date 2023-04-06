import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Text,
  theme,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { ModalDeleteUser } from "../Modal/ModalDeleteUser";
import { ModalUpdateUser } from "../Modal/ModalUpdateUser";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu = ({ isOpen, onClose }: MenuProps) => {
  const { user, signOut } = useAuth();

  const {
    isOpen: isOpenDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdate,
    onClose: onCloseUpdate,
    onOpen: onOpenUpdate,
  } = useDisclosure();

  return (
    <>
      <ModalDeleteUser isOpen={isOpenDelete} onClose={onCloseDelete} />

      <ModalUpdateUser isOpen={isOpenUpdate} onClose={onCloseUpdate} />

      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay mt={["13vh", "8vh"]} />
        <DrawerContent ml="auto" mt="80px" w={["450px", "350px"]}>
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor="gray.50"
            color="gray.400"
          >
            {user.name}
          </DrawerHeader>
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor="gray.50"
            color="gray.400"
          >
            {user.email}
          </DrawerHeader>
          <DrawerBody
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Button
              bg="purple.500"
              color="white"
              paddingX="16"
              h="40px"
              mb="10px"
              borderRadius="8px"
              onClick={() => onOpenUpdate()}
              mt={["4", "4", "0"]}
              _hover={{ bg: "purple.600" }}
            >
              Edit Data
            </Button>
            <Flex
              mb="10px"
              align="center"
              onClick={signOut}
              _hover={{ cursor: "pointer" }}
            >
              <Center
                w="60px"
                h="60px"
                bg="red.600"
                fontSize="2xl"
                borderRadius="md"
              >
                <FiLogOut color={theme.colors.white} />
              </Center>
              <Box ml="4">
                <Heading as="h2" fontSize="lg">
                  Logout
                </Heading>
                <Text color="gray.300" fontSize="small">
                  Logout now
                </Text>
              </Box>
            </Flex>
            <Flex
              align="center"
              onClick={() => onOpenDelete()}
              _hover={{ cursor: "pointer" }}
            >
              <Center
                w="60px"
                h="50px"
                bg="red.600"
                fontSize="2xl"
                borderRadius="md"
              >
                <FaTrash color={theme.colors.white} />
              </Center>
              <Box ml="4">
                <Heading as="h2" fontSize="lg">
                  Delete Account
                </Heading>
                <Text color="gray.300" fontSize="small">
                  Delete now
                </Text>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
