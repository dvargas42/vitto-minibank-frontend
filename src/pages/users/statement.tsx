import { useState } from 'react';
import Head from 'next/head';
import { Flex, Stack, Table, Thead, Tr, Th, Tbody, Td, Spinner, useToast, Button } from '@chakra-ui/react'
import { format } from 'date-fns'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { withSSRAuth } from "../../utils/withSSRAuth"
import { Footer } from '../../components/Footer'
import { Balance } from '../../components/Balance'
import { api } from '../../services/axios/apiClient'
import { useAuth } from '../../hooks/useAuth'
import { Input } from '../../components/Form/Input'

type SignInFormData = {
  cpf: string;
}

interface TransactionProps {
  id: string;
  type: boolean;
  value: number;
  created_at: Date;
}

const SignInFormSchema = yup.object().shape({
  cpf: yup.string().required('CPF obrigatório').matches(/^[0-9]+$/, "Deve possuir apenas números"),
})

export default function Statement() {
  const [visibleTable, setVisibleTable] = useState(false)

  const toast = useToast()

  const { user } = useAuth()

  const { data, isLoading, error } = useQuery(['transactions'],
    async (): Promise<TransactionProps[]> => {
    const response = await api.get('transactions')

    return response.data.reverse()
  }, {
    staleTime: 1000 * 30, //30 seconds
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignInFormSchema)
  })
  
  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (value) => {
    if(value.cpf === user.cpf) {
      setVisibleTable(true)
    }
  }
    
  return isLoading ? (
      <Flex justifyContent="center" alignItems="center" height="calc(100vh - 7rem)">
      <Spinner
        thickness="6px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>

    ) : error ? (
    <Flex justifyContent="center">
      {toast({
        title: "Problema no servidor.",
        description: "Tente novamente mais tarde.",
        status: "error",
        duration: 2000,
        isClosable: true,
      })}
    </Flex>

    ) : (
    <Flex flexDirection="column" alignItems="center"> 
      <Head> 
        <title>Extrato | Vitto</title>
      </Head>
      
      <Flex
        height="calc(100vh - 14rem)"
        flexDirection="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          as="form"
          spacing="12"
          direction="row"
          width="100%"
          maxWidth={1250}
          marginTop="1rem"
          justifyContent="space-between"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4" width="100%">
            <Balance 
              value={user?.balance}
              direction="column"
              height="130px"
              width="100%"
              bgColor="gray.50"
              borderRadius="2xl"
              paddingY="6"
              paddingX="8"
              boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
            />
            <Stack spacing="10" height="100%" paddingX="10" paddingY="10" borderRadius="2xl" bgColor="gray.50"  >
              <Input
                name="cpf"
                label="CPF"
                type="cpf"
                labelSize="22"
                labelColor="gray.500"
                fontSize="40"
                height="16"
                background="gray.400"
                {...register('cpf')}
                error={errors.cpf}
              />

              <Button
                type="submit"
                colorScheme="linkedin"
                height="150px"
                fontSize="32"
                borderRadius="2xl"
                boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
              >
                Ok
              </Button> 
            </Stack>
          </Stack>

          <Table width="100%" bgColor="gray.50" colorScheme="facebook" borderRadius="2xl">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Valor</Th>
                <Th>Tipo</Th>
                <Th>Data</Th>
              </Tr>
            </Thead>

            <Tbody color="gray.700">
              {visibleTable ? (
                data.slice(0, 10).map((transaction, index) => (
                <Tr key={transaction.id}>
                  <Td >{index + 1}</Td>
                  <Td>{transaction.type ? transaction.value : `- ${transaction.value}`}</Td>
                  <Td>{transaction.type ? 'Depósito' : 'Saque'}</Td>
                  <Td>{format(new Date(transaction.created_at), 'dd MMM yyyy, hh:mm')}</Td>
                </Tr>
              ))) : (
                <Tr>
                  <Td>Digite o CPF</Td>
                  <Td>Digite o CPF</Td>
                  <Td>Digite o CPF</Td>
                  <Td>Digite o CPF</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Stack>
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