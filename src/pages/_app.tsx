import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'

import { Header } from '../components/Header'
import { queryClient } from "../services/queryClient"
import { AuthProvider } from '../hooks/useAuth'

import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={ queryClient }>
        <ChakraProvider theme={ theme }>
          <Header />

          <Component { ...pageProps } />
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default MyApp
