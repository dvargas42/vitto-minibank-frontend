import { Stack, Text, StackProps } from '@chakra-ui/react'

interface BalanceProps extends StackProps {
  value: number;
}

export function Balance({ value, ...rest }: BalanceProps) {
  return (
    <Stack {...rest}>
      <Text
        fontSize="22"
        color="gray.500"
      >
        Seu saldo
      </Text>

      <Text
        fontSize="34"
        fontWeight="bold"
        color="gray.600"
      >
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency', currency: 'BRL'
        }).format(value)}
      </Text>
    </Stack>
  )
}