import { Grid, Heading, Image, Text } from "@chakra-ui/react";
import LogoSecondary from "../../assets/logo-secondary.png";

export const LoginInfo = () => (
  <Grid w={["100%", "100%", "90%", "50%"]} paddingRight="100px">
    <Image
      src={LogoSecondary}
      alt="doit"
      minWidth="100px"
      maxWidth="200px"
      w={["21vw", "15vw", "21vw", "15vw"]}
      /* boxSize={["120px", "120px", "150px", "150px"]} */
    />
    <Heading mt="4" as="h1">
      The easy, free,
    </Heading>
    <Text maxW="350px">
      Flexible and attractive way to manage
      <b> your projects on a single platform. </b>
    </Text>
  </Grid>
);
