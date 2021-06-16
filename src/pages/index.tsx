import { Flex, Button, Stack, Img } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { withSSRGuest } from '../utils/withSSRGuest'

export default function Home() {
  const router = useRouter()

  function handleRouter(value: boolean) {
    if (value) {
      router.push('/session')

    } else {
      router.push('/users/create')
    }
  }

  return (
    <Flex
    height={"calc(100vh - 7rem)"}
    alignItems="center"
    justifyContent="center"
  > 
    <Head> 
      <title>Home | Vitto</title>
    </Head>
    <Flex
      width="100%"
      maxWidth="1250px"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderRadius={8}
    >
      <Stack spacing="24">
        <Button
          type="submit"
          marginTop="6"
          colorScheme="linkedin"
          height="150px"
          width="400px"
          fontSize="30"
          borderRadius="2xl"
          onClick={() => handleRouter(true)}
          boxShadow="0px 4px 4px 0px rgba(6, 20, 45, 0.15);"
        >
          Acesso sem cartão
        </Button>
        <Button
          type="submit"
          marginTop="6"
          colorScheme="linkedin"
          height="150px"
          fontSize="30"
          borderRadius="2xl"
          onClick={() => handleRouter(false)}
          boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
        >
          Torne-se cliente
        </Button> 
      </Stack>
      <Img src="./images/hero.png" />
    </Flex>
  </Flex>
  )
}
export const getServerSideProps = withSSRGuest(async(ctx) => {
  return {
    props: {}
  }
})