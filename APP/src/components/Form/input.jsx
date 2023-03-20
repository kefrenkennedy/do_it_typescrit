import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";

import { FaExclamation } from "react-icons/fa";

import { useState, useEffect, useCallback, useRef } from "react";

export const Input = () => {
  return (
    <FormControl>
      <FormLabel>Label</FormLabel>

      <InputGroup flexDirection="column">
        <InputLeftElement mt="2.5">
          <FaExclamation />
        </InputLeftElement>
        <ChakraInput placeholder="Email" />

        <FormErrorMessage>Erro</FormErrorMessage>
      </InputGroup>
    </FormControl>
  );
};
