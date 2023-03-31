import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaForward } from "react-icons/fa";
import LogoSecondary from "../../assets/logo-secondary.png";
import { theme } from "../../styles/theme";

export const SignUpInfo = () => (
  <Grid
    mb={["40px", "0px"]}
    w={["100%", "100%", "90%", "50%"]}
    paddingLeft={["10px", "10px", "150px"]}
  >
    <Image
      src={LogoSecondary}
      alt="doit"
      mb={["50px", "50px"]}
      minWidth="100px"
      maxWidth="200px"
      w={["21vw", "15vw", "21vw", "15vw"]}
      /*       boxSize={["120px", "120px", "150px", "150px"]} */
    />
    <VStack mt={["10px", "0"]} spacing="14" mb="50px">
      <Flex w="100%">
        <Center borderRadius="5px" bg="white" w="50px" h="50px">
          <FaForward color={theme.colors.purple["800"]} size={25} />
        </Center>
        <Box ml="4">
          <Heading size="lg"> Agility </Heading>
          <Text>
            Speed up your projects quickly <br /> and with great performance
          </Text>
        </Box>
      </Flex>
      <Flex w="100%">
        <Center borderRadius="5px" bg="white" w="50px" h="50px">
          <FaForward color={theme.colors.purple["800"]} size={25} />
        </Center>
        <Box ml="4">
          <Heading size="lg"> Simplicity </Heading>
          <Text>
            Store your projects in a <br /> highly user-friendly interface.
          </Text>
        </Box>
      </Flex>
    </VStack>
  </Grid>
);
