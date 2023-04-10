import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { LoginInfo } from "./LoginInfo";
import { LoginForm } from "./LoginForm";
import { toast } from "react-toastify";

const signInSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid Email"),
  password: yup.string().required("Password is required"),
});

export interface SignInData {
  email: string;
  password: string;
}

export const Login = () => {
  const [loading, setLoading] = useState(false);

  const { signIn, user, accessToken } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = (data: SignInData) => {
    setLoading(true);
    signIn(data)
      .then((_) => setLoading(false))
      .catch((err) => {
        const toastId = "my-toast-id";
        toast.error("Invalid Email or Password", {
          toastId,
          autoClose: 3000,
          closeOnClick: true,
        });
        setLoading(false);
      });
  };

  return (
    <>
      <Flex
        padding={["10px 15px", "10px 15px", "0px", "0px"]}
        alignItems="center"
        height={["auto", "auto", "100vh", "100vh"]}
        justifyContent="center"
        bgGradient={[
          "linear(to-b, purple.800 65%, white 35%)",
          "linear(to-b, purple.800 65%, white 35%)",
          "linear(to-r, purple.800 65%, white 35%)",
          "linear(to-r, purple.800 65%, white 35%)",
        ]}
        color="white"
      >
        <Flex
          w={["100%", "100%", "90%", "65%"]}
          justifyContent="center"
          flexDirection={["column", "column", "row", "row"]}
          alignItems="center"
        >
          <LoginInfo />
          <LoginForm
            errors={errors}
            handleSignIn={handleSubmit(handleSignIn)}
            loading={loading}
            register={register}
          />
        </Flex>
      </Flex>
    </>
  );
};
