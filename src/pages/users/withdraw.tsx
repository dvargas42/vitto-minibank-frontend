import { useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { useMutation } from "react-query";
import { SubmitHandler, useForm } from 'react-hook-form'
import { Flex, Stack, Spinner, useToast, useDisclosure } from "@chakra-ui/react";

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
import { BankNoteModal } from "../../components/BankNoteModal";
import { validBankNotes } from "../../utils/validBankNotes";

type SignInFormData = {
  withdraw: number;
  cpf: string;
}

type TransactionProps = {
  user_id: string;
  type: boolean;
  value: number;
  cpf: string;
}

const SignInFormSchema = yup.object().shape({
  withdraw: yup.string().required('Necessário informar valor!').matches(/^[0-9]+$/, "Deve possuir apenas números"),
  cpf: yup.string().required('CPF obrigatório'),
})

export default function Withdraw() {
  const [transaction, setTransaction] = useState<TransactionProps>()

  const {isOpen, onOpen, onClose} = useDisclosure()

  const toast = useToast()

  const [typeField, setTypeField] = useState('withdraw')

  const { user, handleBalanceUser } = useAuth()
  
  const createTransaction = useMutation(async (transaction: TransactionProps) => {
    const response = await api.post('transactions',  transaction )

    handleBalanceUser(response.data.balance)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('transaction')
    }
  })

  const { register, handleSubmit, formState, getValues, setValue, trigger } = useForm({
    resolver: yupResolver(SignInFormSchema)
  })
  
  const { errors,  } = formState

  function handleClearFields() {
    setValue('withdraw', '')
    setValue('cpf', '')
  }

  function handleSession(value: string) {
    if (typeField === 'withdraw') {
      setValue('withdraw', `${getValues('withdraw')}${value}`)

    } else {
      setValue('cpf', `${getValues('cpf')}${value}`)
    }
  }

  async function handleInterceptionSignIn() {
    await createTransaction.mutateAsync(transaction)
    
    Router.push('/users')

    setValue('withdraw', '')

    setValue('cpf', '')
  }

  const handleSignIn: SubmitHandler<SignInFormData> = async (value) => {
    const withdraw = validBankNotes(getValues('withdraw'))

    setValue('withdraw', `${withdraw}`)

    const transaction = { 
      user_id: user.id,
      type: false,
      value: withdraw,
      cpf: value.cpf,
    }
    setTransaction(transaction)
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
        <title>Saque | Vitto</title>
      </Head>

      <Flex
        flexDirection="row"
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
          <BankNoteModal
            isOpen={isOpen}
            onClose={onClose}
            value={getValues('withdraw')}
            handleInterceptionSignIn={handleInterceptionSignIn}
          />
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
                name="withdraw"
                label="Valor do saque"
                labelSize="22"
                labelColor="gray.500"
                fontSize="40"
                height="16"
                background="gray.400"
                onClick={() => setTypeField('withdraw')}
                {...register('withdraw')}
                error={errors.withdraw}
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
            onClick={onOpen}
          />
        </Flex>
        {/* <Keyboard
          formState={formState}
          handleValues={handleSession}
          handleClearValues={handleClearFields}
          onClick={onOpen}
        /> */}
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
