import { Box, Button, Container, Flex, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Logo from './Logo';
import PageFallback from './PageFallback';
import PageTransition from './PageTransition';
import { useAuth } from '../hooks/useAuth';

export default function PublicLayout() {
  const { user } = useAuth();
  return (
    <Flex direction="column" minH="100vh">
      <ChakraLink href="#contenido" position="absolute" left="-9999px" _focus={{ left: 2, top: 2, zIndex: 20, bg: 'white', p: 2, borderRadius: 'md' }}>
        Saltar al contenido
      </ChakraLink>
      <Box as="header" position="sticky" top={0} zIndex={10} bg="rgba(244,248,251,0.85)" backdropFilter="blur(10px)" borderBottomWidth="1px" borderColor="glacier.100">
        <Container maxW="6xl" py={3}>
          <Flex align="center" justify="space-between" gap={3}>
            <ChakraLink as={Link} to="/" _hover={{ textDecoration: 'none' }} aria-label="MyReminder, ir al inicio">
              <Logo />
            </ChakraLink>
            <Flex gap={2}>
              {user ? (
                <Button as={Link} to="/app" colorScheme="brand" size="sm">Ir a mi agenda</Button>
              ) : (
                <>
                  <Button as={Link} to="/login" variant="ghost" size="sm">Ver Agenda</Button>
                  <Button as={Link} to="/registro" colorScheme="brand" size="sm">Registrarse</Button>
                </>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Box as="main" id="contenido" flex="1">
        <PageTransition>
          <Suspense fallback={<PageFallback />}><Outlet /></Suspense>
        </PageTransition>
      </Box>
      <Box as="footer" py={6} bg="glacier.100" textAlign="center">
        <Text fontSize="sm" color="glacier.800">MyReminder. Lo importante, a tiempo.</Text>
      </Box>
    </Flex>
  );
}
