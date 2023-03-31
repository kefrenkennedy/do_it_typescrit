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
    padding="40px 25px"
    border="3px solid"
    borderColor="gray.100"
    bg="white"
    color="gray.900"
  >
    <Heading size="lg">Create your account</Heading>
    <VStack mt="1" spacing="5">
      <Box w="100%">
        <Input
          placeholder="Type your name"
          icon={FaUser}
          label="Name"
          error={errors.name}
          {...register("name")}
        />
        <Input
          placeholder="Type your best Email"
          icon={FaEnvelope}
          label="Email"
          type="email"
          error={errors.email}
          {...register("email")}
        />
        {!errors.email && (
          <Text ml="1" mt="1" color="gray.300">
            Example: name@email.com
          </Text>
        )}
      </Box>

      <Input
        placeholder="Type your Password"
        icon={FaLock}
        label="Password"
        error={errors.password}
        type="password"
        {...register("password")}
      />
      <Input
        placeholder="Confirm Password"
        icon={FaLock}
        error={errors.confirm_password}
        label="Confirm your Password"
        type="password"
        {...register("confirm_password")}
      />
    </VStack>

    <Button
      mt="4"
      isLoading={loading}
      bg="purple.800"
      w="100%"
      color="white"
      borderRadius="8px"
      _hover={{ background: "purple.900" }}
      type="submit"
      h="40px"
    >
      Register
    </Button>
  </Grid>
);
