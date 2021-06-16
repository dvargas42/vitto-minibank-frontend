import { useState } from "react";
import Router from "next/router";
import  Head from "next/head";
import { useMutation } from "react-query";
import { SubmitHandler, useForm } from 'react-hook-form'
import { Flex, Stack, Spinner, useToast } from "@chakra-ui/react";

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../../components/Form/Input'
import { Footer } from '../../components/Footer'
import { Keyboard } from '../../components/Form/Keyboard'
import { Balance } from "../../components/Balance";

import { useAuth } from "../../hooks/useAuth";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { api } from "../../services/axios/apiClient";
import { queryClient } from "../../services/queryClient";

type SignInFormData = {
  deposit: number;
  cpf: string;
}

type TransactionProps = {
  user_id: string;
  type: boolean;
  value: number;
  cpf: string;
}

const SignInFormSchema = yup.object().shape({
  deposit: yup.string().required('Necessário informar valor!').matches(/^[0-9]+$/, "Deve possuir apenas números"),
  cpf: yup.string().required('CPF obrigatório'),
})

export default function Deposit() {
  const toast = useToast()

  const [typeField, setTypeField] = useState('deposit')

  const { user, handleBalanceUser } = useAuth()
  
  const createTransaction = useMutation(async (transaction: TransactionProps) => {
    const response = await api.post('transactions',  transaction )

    handleBalanceUser(response.data.balance)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('transaction')
    }
  })

  const { register, handleSubmit, formState, getValues, setValue } = useForm({
    resolver: yupResolver(SignInFormSchema)
  })
  
  const { errors } = formState

  function handleClearFields() {
    setValue('deposit', '')
    setValue('cpf', '')
  }

  function handleSession(value: string) {
    if (typeField === 'deposit') {
      setValue('deposit', `${getValues('deposit')}${value}`)

    } else {
      setValue('cpf', `${getValues('cpf')}${value}`)
    }
  }

  const handleSignIn: SubmitHandler<SignInFormData> = async (value) => {
    const transaction = { 
      user_id: user.id,
      type: true,
      value: Number(value.deposit),
      cpf: value.cpf,
    }

    await createTransaction.mutateAsync(transaction)
    Router.push('/users')
    setValue('deposit', '')
    setValue('cpf', '')
  }

  return createTransaction.isLoading ? (
    <Flex justifyContent="center" alignItems="center" height="calc(100vh - 7rem)">
      <Spinner
        thickness="6px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>

    ) : createTransaction.error ? (
    <Flex justifyContent="center">
      {toast({
        title: "Senha incorreta.",
        description: "Tente novamente mais tarde.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })}
    </Flex>

    ) : (
    <Flex flexDirection="column" alignItems="center" width="100%">
      <Head> 
        <title>Depósito | Vitto</title>
      </Head>

      <Flex
        flexDirection="column"
        height="calc(100vh - 14rem)"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          as="form"
          width="100%"
          maxWidth="1250px"
          justifyContent="space-between"
          borderRadius={8}
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="10" height="100%" marginRight="12">
            <Balance
              value={ user?.balance }
              direction="column"
              height="150px"
              bgColor="gray.50"
              borderRadius="2xl"
              paddingY="6"
              paddingX="10"
              boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
            />
            <Stack spacing="10" height="100%" paddingX="10" paddingY="10" borderRadius="2xl" bgColor="gray.50"  >
              <Input
                name="deposit"
                label="Valor do depósito"
                labelSize="22"
                labelColor="gray.500"
                fontSize="40"
                height="16"
                background="gray.400"
                onClick={() => setTypeField('deposit')}
                {...register('deposit')}
                error={errors.deposit}
              />
              <Input
                name="cpf"
                label="CPF"
                type="cpf"
                labelSize="22"
                labelColor="gray.500"
                fontSize="40"
                height="16"
                background="gray.400"
                onClick={() => setTypeField('')}
                {...register('cpf')}
                error={errors.cpf}
              />
            </Stack>
          </Stack>

          <Keyboard
            formState={formState}
            handleValues={handleSession}
            handleClearValues={handleClearFields}
          />
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  )
}
export const getServerSideProps = withSSRAuth(async(ctx) => {
  return {
    props: {}
  }
})
