import { Avatar, Box, Button, Container, Flex, Link as ChakraLink, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import OfflineBanner from './OfflineBanner';
import PageFallback from './PageFallback';
import PageTransition from './PageTransition';
import TopProgress from './TopProgress';
import { EventsProvider } from '../context/EventsContext';
import { useAuth } from '../hooks/useAuth';
import { useEvents } from '../hooks/useEvents';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useReminders } from '../hooks/useReminders';
import { useSyncOnReconnect } from '../hooks/useSyncOnReconnect';

const links = [
  { to: '/app', label: 'Resumen', end: true },
  { to: '/app/eventos', label: 'Eventos', end: true },
  { to: '/app/calendario', label: 'Calendario' },
];

function AppShell() {
  const { user, logout } = useAuth();
  const { events, loading } = useEvents();
  const online = useOnlineStatus();
  const navigate = useNavigate();
  useReminders(events);
  useSyncOnReconnect();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Flex direction="column" minH="100vh">
      <ChakraLink href="#contenido" position="absolute" left="-9999px" _focus={{ left: 2, top: 2, zIndex: 20, bg: 'white', p: 2, borderRadius: 'md' }}>
        Saltar al contenido
      </ChakraLink>
      {loading && <TopProgress />}
      {!online && <OfflineBanner />}
      <Box as="header" position="sticky" top={0} zIndex={10} bg="rgba(181,216,236,0.88)" backdropFilter="blur(10px)">
        <Container maxW="5xl" py={3}>
          <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
            <ChakraLink as={Link} to="/app" _hover={{ textDecoration: 'none' }} aria-label="MyReminder, ir a mi agenda">
              <Logo />
            </ChakraLink>
            <Flex as="nav" gap={1} align="center" wrap="wrap" aria-label="Principal">
              {links.map((l) => (
                <Button key={l.to} as={NavLink} to={l.to} end={l.end} size="sm" variant="ghost"
                  _hover={{ bg: 'glacier.300' }} _activeLink={{ bg: 'white' }}>
                  {l.label}
                </Button>
              ))}
              <Button as={NavLink} to="/app/eventos/nuevo" size="sm" colorScheme="brand">Nuevo evento</Button>
              <Menu>
                <MenuButton as={Button} variant="ghost" size="sm" px={1} ml={1} aria-label="Menu de cuenta">
                  <Avatar size="sm" name={user.name} bg="glacier.900" color="white" />
                </MenuButton>
                <MenuList>
                  <Box px={3} py={2}>
                    <Text fontWeight="600">{user.name}</Text>
                    <Text fontSize="sm" color="gray.600">{user.email}</Text>
                  </Box>
                  <MenuItem onClick={handleLogout}>Cerrar sesion</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Container as="main" id="contenido" maxW="5xl" py={8} flex="1">
        <PageTransition>
          <Suspense fallback={<PageFallback />}><Outlet /></Suspense>
        </PageTransition>
      </Container>
      <Box as="footer" py={5} textAlign="center" bg="glacier.100">
        <Text fontSize="sm" color="glacier.800">MyReminder. Hecho para que nada se te pase.</Text>
      </Box>
    </Flex>
  );
}

export default function AppLayout() {
  const { user } = useAuth();
  return (
    <EventsProvider key={user.id} userId={user.id}>
      <AppShell />
    </EventsProvider>
  );
}
