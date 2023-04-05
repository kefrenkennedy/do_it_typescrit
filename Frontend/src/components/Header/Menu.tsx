import {
  Box,
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

  return (
    <>
      <ModalDeleteUser isOpen={isOpenDelete} onClose={onCloseDelete} />
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
          <DrawerBody>
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
