import { Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SignUpInfo } from "./SignUpInfo";
import { SignUpForm } from "./SignUpForm";
import { GoBackButton } from "./GoBackButton";
import { api } from "../../services/api";
import { ModalSuccess } from "../../components/Modal/ModalSuccess";
import { ModalError } from "../../components/Modal/ModalError";
import { useHistory } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Password confirmation is required"),
});

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  confirm_password: string;
}

export const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const { createUser } = useUser();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();

  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  const [errorToast, setErrorToast] = useState("a");

  const handleSignUp = ({ name, email, password }: SignUpData) => {
    const data = {
      name,
      email,
      password,
      setLoading,
      onModalSuccessOpen,
      onModalErrorOpen,
      setErrorToast
    };
    createUser(data)
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const history = useHistory();

  return (
    <>
      <ModalSuccess
        buttonMessage="Go to Login now"
        message="Your registration was successful, let's get started!"
        onClick={() => {
          history.push("/");
        }}
        secondaryText="You can start by creating <b> your task lists </b> right now..."
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
      />
      <ModalError
        secondaryText="You can try again now by clicking the button above or wait a few minutes..."
        error={errorToast}
        isOpen={isModalErrorOpen}
        onClose={onModalErrorClose}
      />
      <Flex
        padding={["10px 15px", "10px 15px", "0px", "0px"]}
        alignItems="center"
        height={["auto", "auto", "100vh", "100vh"]}
        justifyContent="center"
        bgGradient={[
          "linear(to-b, purple.800 65%, white 35%)",
          "linear(to-b, purple.800 65%, white 35%)",
          "linear(to-l, purple.800 65%, white 35%)",
          "linear(to-l, purple.800 65%, white 35%)",
        ]}
        color="white"
      >
        <Flex
          w={["100%", "100%", "90%", "65%"]}
          justifyContent="center"
          flexDirection={["column", "column", "row", "row"]}
          alignItems="center"
        >
          {isWideVersion ? (
            <>
              <GoBackButton top="100" left="12" />
              <SignUpForm
                errors={errors}
                handleSignUp={handleSubmit(handleSignUp)}
                loading={loading}
                register={register}
              />
              <SignUpInfo />
            </>
          ) : (
            <>
              <GoBackButton top="100px" left="75vw" />
              <SignUpInfo />
              <SignUpForm
                errors={errors}
                handleSignUp={handleSubmit(handleSignUp)}
                loading={loading}
                register={register}
              />
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
