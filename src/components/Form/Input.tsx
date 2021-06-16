import { ElementType, forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'
import { 
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  as?: ElementType;
  mask?: string;
  name: string;
  label?: string;
  labelSize?: string;
  labelColor?: string;
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  as,
  mask,
  name, 
  label,
  labelSize,
  labelColor,
  error = null, 
  ...rest 
}, ref ) => {

  return( 
  <FormControl isInvalid={!!error}>
    {!!label && 
    <FormLabel
      htmlFor={name}
      fontWeight="normal"
      fontSize={labelSize}
      color={labelColor}
    >
      {label}
    </FormLabel>}

    <ChakraInput
      as={as}
      mask={mask}
      name={name}
      id={name}
      borderRadius="xl"
      focusBorderColor="blue.400"
      variant="filled"
      color="gray.700"
      _hover={{
        backgroundColor: 'gray.500'
      }}
      ref={ref}
      {...rest}
    />
    {!!error && (
      <FormErrorMessage>
        {error.message}
      </FormErrorMessage>
    )}
  </FormControl>

  )
}

export const Input = forwardRef(InputBase)