import {
  Heading,
  Flex,
  Text,
  Grid,
  Image,
  VStack,
  Button,
  Box,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import LogoSecondary from "../../assets/logo-secondary.png";
import { Input } from "../../components/Form/input.jsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const signInSchema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
});

interface SignInData {
  email: string;
  password: string;
}

export const Login = () => {
  const [loading, serLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn: SubmitHandler<SignInData> = (data) => console.log(data);

  return (
    <Flex
      padding="10px 15px"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-r, purple.800 65%, white 35%)"
      color="white"
    >
      <Flex
        w="100%"
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
      >
        <Grid w="100%" paddingRight="100px">
          <Image src={LogoSecondary} alt="doit" w="150px" />
          <Heading as="h1">O jeito fácil, grátis</Heading>
          <Text>
            Flexível e atrativo de gerenciar
            <b>seus projetos em uma única plataforma</b>
          </Text>
        </Grid>
        <Grid
          onSubmit={handleSubmit(handleSignIn)}
          as="form"
          mt="4"
          w="50%"
          padding="30px 15px"
          border="3px solid"
          borderColor="gray.100"
          bg="white"
          color="gray.900"
        >
          <Heading size="lg">Bem vindo de volta!</Heading>
          <VStack mt="6" spacing="5">
            <Box w="100%">
              <Input
                placeholder="Digite seu login"
                icon={FaEnvelope}
                label="Login"
                type="email"
                error={errors.email}
                {...register("email")}
              />
              {!errors.email && (
                <Text ml="1" mt="1" color="gray.300">
                  Exemplo: nome@email.com
                </Text>
              )}
            </Box>

            <Input
              placeholder="Digite sua senha"
              icon={FaLock}
              error={errors.password}
              type="password"
              {...register("password")}
            />
          </VStack>
          <VStack mt="4" spacing="5">
            <Button
              isLoading={loading}
              bg="purple.800"
              w="100%"
              color="white"
              h="60px"
              borderRadius="8px"
              _hover={{ background: "purple.900" }}
              type="submit"
            >
              Entrar
            </Button>
            <Text color="gray.400">Ainda não possui uma conta?</Text>
            <Button
              bg="gray.100"
              w="100%"
              color="gray.300"
              h="60px"
              borderRadius="8px"
              _hover={{ background: "gray.200" }}
            >
              Cadastrar
            </Button>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};
