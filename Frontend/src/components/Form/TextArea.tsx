import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea as ChakraTextarea,
    TextareaProps as ChakraTextareaProps,
    InputLeftElement,
    InputGroup,
  } from "@chakra-ui/react";
  
  import { FaExclamation } from "react-icons/fa";
  
  import {
    useState,
    useEffect,
    useCallback,
    useRef,
    ForwardRefRenderFunction,
    forwardRef,
  } from "react";
  
  import { IconType } from "react-icons/lib";
  import { FieldError, FieldErrors } from "react-hook-form";
  
  interface InputProps extends ChakraTextareaProps {
    name: string;
    label?: string;
    error?: any;
    icon?: IconType;
  }
  
  type inputVariationOptions = {
    [key: string]: string;
  };
  
  const inputVariation: inputVariationOptions = {
    error: "red.500",
    default: "gray.200",
    focus: "purple.800",
    filled: "green.500",
  };
  
  const TextareaBase: ForwardRefRenderFunction<HTMLTextAreaElement, InputProps> = (
    { name, error = null, icon: Icon, label, ...rest },
    ref
  ) => {
    const [value, setValue] = useState("");
    const [variation, setVariation] = useState("default");
  
    useEffect(() => {
      if (error) {
        return setVariation("error");
      }
    }, [error]);
  
    const handleInputFocus = useCallback(() => {
      if (!error) {
        setVariation("focus");
      }
    }, [error]);
  
    const handleInputBlur = useCallback(() => {
      if (value.length > 1 && !error) {
        return setVariation("filled");
      }
    }, [error, value]);
  
    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel color="gray.400">{label}</FormLabel>}
        <InputGroup flexDirection="column">
          {Icon && (
            <InputLeftElement color={inputVariation[variation]} mt="2.5">
              <Icon />
            </InputLeftElement>
          )}
  
          <ChakraTextarea
            name={name}
            bg="gray.50"
            color={inputVariation[variation]}
            onChangeCapture={(e) => setValue(e.currentTarget.value)}
            borderColor={inputVariation[variation]}
            onFocus={handleInputFocus}
            onBlurCapture={handleInputBlur}
            minW="184px"
            variant="outline"
            _hover={{ bgColor: "gray.100" }}
            _placeholder={{ color: "gray.300" }}
            _focus={{
              bg: "gray.100"
            }}
            size="lg"
            h="60px"
            ref={ref}
            {...rest}
          />
  
          {!!error && (
            <FormErrorMessage color="red.500"> {error.message} </FormErrorMessage>
          )}
        </InputGroup>
      </FormControl>
    );
  };
  
  export const Textarea = forwardRef(TextareaBase);
  