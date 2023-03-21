import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from "react-hook-form/dist/types";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { SignUpData } from ".";
import { Input } from "../../components/Form/input";

interface SignUpFormProps {
  handleSignUp: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<SignUpData>;
  loading: boolean;
}

export const SignUpForm = ({
  handleSignUp,
  errors,
  register,
  loading,
}: SignUpFormProps) => (
  <Grid
    onSubmit={handleSignUp}
    as="form"
    padding="30px 15px"
    border="3px solid"
    borderColor="gray.100"
    bg="white"
    color="gray.900"
    w={["100%", "100%", "40%", "40%"]}
    mt={["4", "4", "0"]}
  >
    <Heading size="lg">Bem vindo de volta!</Heading>
    <VStack mt="6" spacing="5">
      <Box w="100%">
        <Input
          placeholder="Digite seu nome"
          icon={FaUser}
          label="Nome"
          error={errors.name}
          {...register("name")}
        />
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
        label="Senha"
        error={errors.password}
        type="password"
        {...register("password")}
      />
      <Input
        placeholder="Confirme sua senha"
        icon={FaLock}
        error={errors.confirm_password}
        label="Confirmação de senha"
        type="password"
        {...register("confirm_password")}
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
);