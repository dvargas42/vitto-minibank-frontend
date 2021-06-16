import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Flex, Stack, Button } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../../components/Form/Input'
import { Keyboard } from '../../components/Form/Keyboard'
import { useAuth } from "../../hooks/useAuth";
import { withSSRGuest } from "../../utils/withSSRGuest";

type SignInFormData = {
  cpf: string;
  password: string;
}

const SignInFormSchema = yup.object().shape({
  cpf: yup.string().required('CPF obrigatório').matches(/^[0-9]+$/, "Deve possuir apenas números"),
  password: yup.string().required('Senha obrigatória')
    .min(6, 'Exatamente 6 caracteres')
    .max(6, 'Exatamente 6 caracteres')
    .matches(/^[0-9]+$/, "Deve possuir apenas números"),
})

export default function SignIn() {
  const router = useRouter()
  const [typeField, setTypeField] = useState('CPF')

  const { signIn } = useAuth()
  

  const { register, handleSubmit, formState, getValues, setValue } = useForm({
    resolver: yupResolver(SignInFormSchema)
  })
  
  const { errors } = formState

  function handleRouter() {
    router.push('/users/create')
  }

  function handleClearFields() {
    setValue('cpf', '')
    setValue('password', '')
  }

  function handleSession(value: string) {
    if (typeField === 'CPF') {
      setValue('cpf', `${getValues('cpf')}${value}`)

    } else {
      setValue('password', `${getValues('password')}${value}`)
    }
  }

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await signIn(values)
  }

  return (
    <Flex
      height={"calc(100vh - 7rem)"}
      alignItems="center"
      justifyContent="center"
    >
      <Head> 
        <title>Session | Vitto</title>
      </Head>

      <Flex
        as="form"
        width="100%"
        maxWidth="1250px"
        justifyContent="space-between"
        borderRadius={8}
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="10" borderRadius="2xl" bgColor="gray.50" paddingX="8" paddingTop="8">
          <Input
            name="cpf"
            type="cpf"
            label="CPF"
            labelSize="1.5rem"
            labelColor="gray.500"
            fontSize="40"
            height="20"
            background="gray.400"
            {...register('cpf')}
            onClick={() => setTypeField('CPF')}
            error={errors.cpf}
          />
          
          <Input
            name="password"
            label="SENHA"
            labelSize="1.5rem"
            labelColor="gray.500"
            type="password"
            height="20"
            background="gray.400"
            fontSize="40"
            {...register('password')}
            onClick={() => setTypeField('')}
            error={errors.password}
          />

          <Button
            colorScheme="linkedin"
            height="150px"
            fontSize="32"
            borderRadius="2xl"
            onClick={() => handleRouter()}
            boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
          >
            Ainda não é cliente!
          </Button> 
        </Stack>
        <Keyboard
          formState={formState}
          handleValues={handleSession}
          handleClearValues={handleClearFields}
        />
      </Flex>
    </Flex>
  )
}
export const getServerSideProps = withSSRGuest(async(ctx) => {
  return {
    props: {}
  }
})