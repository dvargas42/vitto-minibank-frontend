import { Button, Grid } from '@chakra-ui/react'
import { FormState, FieldValues } from 'react-hook-form'

interface KeyboardProps {
  handleValues: (value: string) => void;
  handleClearValues: () => void;
  formState: FormState<FieldValues>;
  onClick?: () => void;
}

export function Keyboard({ handleValues, handleClearValues, formState, onClick }: KeyboardProps) {
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <Grid gap={8} gridTemplateRows="repeat(3, 1fr)" gridTemplateColumns="repeat(3, 1fr)">
      {keys.map(item => (
        <Button
          key={item}
          type="button"
          height="28"
          width="40"
          borderRadius="xl"
          colorScheme="linkedin"
          fontSize="40"
          onClick={() => handleValues(String(item))}
          boxShadow="0px 4px 4px 0px rgba(6, 20, 45, 0.3);"
        >
          {item}
        </Button>
      ))}

      <Button
        type="button"
        height="28"
        width="40"
        borderRadius="xl"
        colorScheme="gray"
        color="gray.500"
        fontSize="3xl"
        onClick={() => handleClearValues()}
        boxShadow="0px 4px 4px 0px rgba(6, 20, 45, 0.3);"
      >
        Corrigir
      </Button>
      <Button
        type="button"
        height="28"
        width="40"
        borderRadius="xl"
        colorScheme="linkedin"
        fontSize="40"
        onClick={() => handleValues("0")}
        boxShadow="0px 4px 4px 0px rgba(6, 20, 45, 0.3);"
      >
        0
      </Button>
      <Button
        type="submit"
        height="28"
        width="40"
        borderRadius="xl"
        colorScheme="gray"
        color="gray.500"
        fontSize="3xl"
        boxShadow="0px 4px 4px 0px rgba(6, 20, 45, 0.3);"
        onClick={onClick}
        isLoading={formState.isSubmitting}
      >
        ok
      </Button>
    </Grid>
  )
}