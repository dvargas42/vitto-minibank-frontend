import { Flex, Img, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'

export function Header() {
  const { user } = useAuth()

  return (
    <Flex
      height="28"
      alignItems="center"
      justifyContent="center"
      bgColor="gray.50"
      boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
    >
      <Flex
        width="100%"
        maxWidth="1250px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex flexDirection="column" alignItems="center">
          <Img src="/images/logo.png" width={36} />

         <Text
            fontFamily="heading"
            fontSize="26px"
            fontWeight="bold"
            color="gray.500"
            lineHeight="26px"
          >
            MINI BANK
          </Text>
        </Flex>
        <Text
          fontFamily="heading"
          fontSize="30px"
          fontWeight="bold"
          color="gray.500"
        >
          Olá{!!user ? `, ${ user.name }`: ', visitante'}!
        </Text>
        
      </Flex>
    </Flex>
  )
}