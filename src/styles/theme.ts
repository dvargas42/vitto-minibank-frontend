import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  font: {
    heading: 'Roboto',
    body: 'Roboto,'
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.300',
        color: 'gray.700,'
      }
    }
  }
})