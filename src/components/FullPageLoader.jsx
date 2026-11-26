import { Center, Spinner, VStack } from '@chakra-ui/react';
import Logo from './Logo';

export default function FullPageLoader() {
  return (
    <Center minH="100vh" bg="polar.50" role="status" aria-label="Cargando">
      <VStack spacing={5}>
        <Logo size={44} />
        <Spinner color="brand.500" thickness="3px" />
      </VStack>
    </Center>
  );
}
