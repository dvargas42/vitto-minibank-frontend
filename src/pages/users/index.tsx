import Link from "next/link";
import Head  from "next/head";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { Button, Flex, Icon, Image, Stack, Heading } from "@chakra-ui/react";
import {
  RiArrowUpCircleLine,
  RiArrowDownCircleLine,
  RiWallet3Line,
  RiCloseCircleLine
} from 'react-icons/ri'

import { Balance } from "../../components/Balance";

import { useAuth } from "../../hooks/useAuth";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function User() {
  const { user, isAuthenticated } = useAuth()

  function handleSignOut() {
    destroyCookie(undefined, 'vittoauth.token')
        
    Router.push('/')
  }
  
  return !isAuthenticated ? (
    <Flex
      flexDirection="column"
      width="100%"
      height="calc(100vh - 7rem)"
      alignItems="center"
      justifyContent="center"
    >
      <Heading color="gray.600">Acesso não autorizado</Heading>
        <Button
            marginTop="8"
            paddingY="46"
            alignItems="center"
            borderRadius="full"
            fontSize="60"
            color="gray.500"
            boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
          >
            <Icon as={RiCloseCircleLine} />
          </Button>
    </Flex>
  ):(
    <Flex flexDirection="column" alignItems="center" width="100%">
      <Head> 
        <title>User | Vitto</title>
      </Head>
      
      <Flex
        flexDirection="column"
        height="calc(100vh - 14rem)"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          width="100%"
          maxWidth="1250px"
          justifyContent="space-between"
        >
          <Stack spacing="4" width="100%">
            <Balance 
              value={user.balance}
              direction="column"
              height="130px"
              bgColor="gray.50"
              borderRadius="2xl"
              paddingY="6"
              paddingX="8"
              boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
            />
            <Image src="./images/hero.png"/>
          </Stack>

          <Stack
            spacing={10}
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            width="100%"
            marginLeft="12"
          >
            <Link href="/users/withdraw" passHref>
              <Button
                type="button"
                colorScheme="linkedin"
                height="180px"
                fontSize="40"
                borderRadius="2xl"
                paddingX="8"
                //onClick={() => handleRouter(false)}
                boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
              >
                <Flex width="100%" justifyContent="space-between" alignItems="center">
                  <Flex marginRight="4" direction="column">
                    Saque
                  </Flex>

                  <Icon as={RiArrowDownCircleLine} marginLeft="16" fontSize="60"/>
                </Flex>
              </Button>
            </Link>

            <Link href="/users/deposit" passHref>
              <Button
                type="button"
                colorScheme="gray"
                height="180px"
                borderRadius="2xl"
                fontSize="40"
                color="gray.500"
                paddingX="8"
                //onClick={() => handleRouter(false)}
                boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
              >
                <Flex width="100%" justifyContent="space-between" alignItems="center">
                  <Flex marginRight="4" direction="column">
                    Deposito
                  </Flex>

                  <Icon as={RiArrowUpCircleLine} marginLeft="12" fontSize="60"/>
                </Flex>
              </Button>
            </Link>

            <Link href="/users/statement" passHref>
              <Button
                type="button"
                colorScheme="gray"
                height="180px"
                borderRadius="2xl"
                fontSize="40"
                color="gray.500"
                paddingX="8"
                //onClick={() => handleRouter(false)}
                boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
              >
                <Flex width="100%" justifyContent="space-between" alignItems="center">
                  <Flex marginRight="4" direction="column">
                    Extrato
                  </Flex>

                  <Icon as={RiWallet3Line} marginLeft="12" fontSize="60"/>
                </Flex>
              </Button> 
            </Link>
          </Stack>
        </Flex>
      </Flex>
      <Link href="/" passHref>
        <Button
          alignItems="center"
          height="6rem"
          width="6rem"
          fontSize="60"
          color="gray.500"
          borderRadius="full"
          boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
          onClick={handleSignOut}
        >
          <Icon as={RiCloseCircleLine} />
        </Button>
      </Link>
    </Flex>  
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
