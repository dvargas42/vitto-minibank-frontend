import Link from "next/link"
import Router from "next/router"
import { Button, Icon, Stack } from '@chakra-ui/react'
import { RiCloseCircleLine, RiHomeSmileLine } from 'react-icons/ri'
import { destroyCookie } from "nookies"

export function Footer() {
  function handleSignOut() {
    destroyCookie(undefined, 'vittoauth.token')
        
    Router.push('/')
  }

  return (
    <Stack as="footer" direction="row" spacing="12">
      <Link href="/users" passHref>
        <Button
          alignItems="center"
          height="6rem"
          width="6rem"
          fontSize="60"
          color="gray.500"
          borderRadius="full"
          boxShadow="0px 6px 6px 0px rgba(6, 20, 45, 0.15);"
        >
          <Icon as={RiHomeSmileLine} />
        </Button>
      </Link>

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
    </Stack>
  )
}