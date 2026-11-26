import { Button, Heading, Text } from '@chakra-ui/react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  useDocumentTitle('No encontrada');
  return (
    <>
      <Heading as="h1" size="lg" mb={2}>Esta pagina se perdio</Heading>
      <Text mb={4}>La direccion no existe o fue movida. Volvamos a lo importante.</Text>
      <Button as={Link} to="/" colorScheme="brand">Ir al inicio</Button>
    </>
  );
}
