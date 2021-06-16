import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../components/Form/Input"
import { useMutation } from "react-query";
import { api } from "../../services/axios/apiClient";
import { queryClient } from "../../services/queryClient";

type CreateUserFormData = {
  name: string;
  cpf: string;
  password: string;
  password_confirmation: string;
}

type UserProps = {
  name: string;
  cpf: string;
  password: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),

  cpf: yup.string().required('CPF obrigatório').matches(/^[0-9]+$/, "Deve possuir apenas números"),

  password: yup.string().required('Senha obrigatória')
    .min(6, 'Exatamente 6 caracteres')
    .max(6, 'Exatamente 6 caracteres')
    .matches(/^[0-9]+$/, "Deve possuir apenas números"),

  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

export default function UserCreate() {
  const router = useRouter()

  const createUser = useMutation(async (user: UserProps) => {
    const response = await api.post('users', user )

    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const { register, handleSubmit, formState} = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) =>{
    await createUser.mutateAsync(values)

    router.push('/session')
  }
  
  return (
    <Box>
      <Head> 
        <title>Cadastro | Vitto</title>
      </Head>

      <Flex 
        height="calc(100vh - 10rem)"
        width="100%"
        maxWidth={1250}
        alignItems="center"
        marginX="auto"
      >
        <Box flex="1" flexDirection="column">
          <Box
            as="form"
            flex="1"
            borderRadius="2xl"
            backgroundColor="gray.50"
            padding="10"
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Heading fontWeight="bold" color="gray.500">Cadastro</Heading>

            <Divider marginY="6" borderColor="gray.700" />

            <VStack spacing="12">
              <SimpleGrid minChildWidth="240px" spacing="10" width="100%">
                <Input
                  name="name"
                  label="Nome Completo"
                  labelSize="1.5rem"
                  labelColor="gray.500"
                  fontSize="40"
                  height="20"
                  background="gray.400"
                  error={errors.name}
                  {...register('name')}
                />
                <Input
                  // as={InputMask}
                  // mask="***.***.***-**"
                  name="cpf"
                  label="CPF"
                  type="cpf"
                  labelSize="1.5rem"
                  labelColor="gray.500"
                  fontSize="40"
                  height="20"
                  background="gray.400"
                  error={errors.cpf}
                  {...register('cpf')}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing="10" width="100%">
                <Input
                  name="password"
                  label="Senha"
                  type="password"
                  labelSize="1.5rem"
                  labelColor="gray.500"
                  fontSize="40"
                  height="20"
                  background="gray.400"
                  error={errors.password}
                  {...register('password')}
                />
                <Input
                  name="password_confirmation"
                  label="Confimação de senha"
                  type="password"
                  labelSize="1.5rem"
                  labelColor="gray.500"
                  fontSize="40"
                  height="20"
                  background="gray.400"
                  error={errors.password_confirmation}
                  {...register('password_confirmation')}
                />
              </SimpleGrid>
            </VStack>

            <Flex marginTop="20" justifyContent="flex-end">
              <HStack spacing="10" width="100%">
                <Link href="/" passHref>
                  <Button
                    as="a"
                    height="130px"
                    width="100%"
                    fontSize="32"
                    borderRadius="2xl"
                    colorScheme="linkedin"
                  >
                    Voltar
                  </Button>
                </Link>

                <Button
                  type="submit"
                  height="130px"
                  width="100%"
                  fontSize="32"
                  borderRadius="2xl"
                  colorScheme="linkedin"
                  //onClick={() => handleRouter()}
                  boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
                  isLoading={formState.isSubmitting}
                >
                  Cadastrar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}