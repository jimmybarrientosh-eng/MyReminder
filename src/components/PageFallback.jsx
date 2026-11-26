import { Center, Spinner } from '@chakra-ui/react';

export default function PageFallback() {
  return (
    <Center minH="40vh" role="status" aria-label="Cargando pagina">
      <Spinner color="brand.500" thickness="3px" size="lg" />
    </Center>
  );
}
