import { 
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Grid,
  HStack,
  Img
} from "@chakra-ui/react" 


interface PasswordModalProps {
  value: string;
  isOpen: boolean;
  onClose: () => void;
  handleInterceptionSignIn: () => void;
}

export function BankNoteModal({ isOpen, onClose, value, handleInterceptionSignIn }: PasswordModalProps) {
  const parseValue = Number(value)

  const notes100 = Math.floor(parseValue / 100)
  const notes50 = Math.floor((parseValue % 100) / 50)
  const notes20 = Math.floor(((parseValue % 100) % 50) / 20)
  const notes10 = Math.floor((((parseValue % 100) % 50) % 20) / 10)
  const notes05 = Math.floor(((((parseValue % 100) % 50) % 20) % 10) / 5)
  const notes02 = Math.floor((((((parseValue % 100) % 50) % 20) % 10) % 5) / 2)

  const withdrawTotal = notes100 * 100 + notes50 * 50 + notes20 * 20 + notes10 * 10 + notes05 * 5 + notes02 * 2

  function handleSignIn() {
    handleInterceptionSignIn()
    onClose()
  }

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered size="4xl">
        <ModalOverlay />
        <ModalContent alignItems="center">
          <ModalCloseButton />
          <ModalHeader
            fontSize="3xl"
            color="gray.600"
          >
            Valor máximo de saque: {withdrawTotal}
          </ModalHeader>
          <ModalBody pb={8} >
            <Grid gap={6}  gridTemplateColumns="repeat(2, 1fr)">
              {!!notes100 && ( 
              <HStack>
                <Text
                  fontWeight="bold"
                  fontSize="2xl"
                  color="gray.600"
                >
                  {notes100} de
                </Text>
                <Img width="80" src="/images/100-reais.png"/>
              </HStack>
              )}
              {!!notes50 && ( 
              <HStack>
                <Text fontWeight="bold" fontSize="2xl" color="gray.600">{notes50} de </Text>
                <Img width="80" src="/images/50-reais.png"/>
              </HStack>
              )}
              {!!notes20 && ( 
              <HStack>
                <Text fontWeight="bold" fontSize="2xl" color="gray.600">{notes20} de </Text>
                <Img width="80" src="/images/20-reais.png"/>
              </HStack>
              )}
              {!!notes10 && ( 
              <HStack>
                <Text fontWeight="bold" fontSize="2xl" color="gray.600">{notes10} de </Text>
                <Img width="80" src="/images/10-reais.png"/>
              </HStack>
              )}
              {!!notes05 && ( 
              <HStack>
                <Text fontWeight="bold" fontSize="2xl" color="gray.600">{notes05} de </Text>
                <Img width="80" src="/images/05-reais.png"/>
              </HStack>
              )}
              {!!notes02 && ( 
              <HStack>
                <Text fontWeight="bold" fontSize="2xl" color="gray.600">{notes02} de </Text>
                <Img width="80" src="/images/02-reais.png"/>
              </HStack>
              )}
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              size="lg"
              colorScheme="linkedin"
              mr={8}
              onClick={handleSignIn}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}