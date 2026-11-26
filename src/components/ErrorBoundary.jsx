import { Component } from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <Box minH="100vh" display="grid" placeItems="center" p={6} textAlign="center" bg="polar.50">
        <Box>
          <Heading size="lg" mb={2}>Algo salio mal</Heading>
          <Text color="gray.600" mb={5}>Recarga la pagina para continuar. Si el problema sigue, vuelve a iniciar sesion.</Text>
          <Button colorScheme="brand" onClick={() => window.location.reload()}>Recargar</Button>
        </Box>
      </Box>
    );
  }
}
