import { Avatar, Badge, Box, Button, Flex, IconButton, Link as ChakraLink, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Switch, Text, useColorMode } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { CalendarIcon, ListIcon, LogoutIcon, MoonIcon, OverviewIcon, PlusIcon, SunIcon, TodayIcon } from './NavIcons';
import Logo from './Logo';
import OfflineBanner from './OfflineBanner';
import PageFallback from './PageFallback';
import PageTransition from './PageTransition';
import TopProgress from './TopProgress';
import { EventsProvider } from '../context/EventsContext';
import { useAuth } from '../hooks/useAuth';
import { useEvents } from '../hooks/useEvents';
import { useNow } from '../hooks/useNow';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useReminders } from '../hooks/useReminders';
import { useSyncOnReconnect } from '../hooks/useSyncOnReconnect';
import { getTodayProgress } from '../utils/today';

const NAV = [
  { to: '/app', label: 'Hoy', icon: TodayIcon, end: true, badge: true },
  { to: '/app/resumen', label: 'Resumen', icon: OverviewIcon },
  { to: '/app/eventos', label: 'Eventos', icon: ListIcon },
  { to: '/app/calendario', label: 'Calendario', icon: CalendarIcon },
];

function SideLink({ item, pending }) {
  const Icon = item.icon;
  return (
    <Button
      as={NavLink} to={item.to} end={item.end} variant="ghost" justifyContent="flex-start" w="100%" h="44px"
      leftIcon={<Icon boxSize={5} />} fontWeight={500} color="glacier.800"
      _hover={{ bg: 'glacier.50' }}
      _activeLink={{ bg: 'glacier.100', color: 'glacier.900', fontWeight: 700, boxShadow: 'inset 3px 0 0 var(--chakra-colors-brand-500)' }}
    >
      <Flex flex="1" align="center" justify="space-between">
        {item.label}
        {item.badge && pending > 0 && <Badge colorScheme="red" borderRadius="full" px={2} aria-label={`${pending} pendientes hoy`}>{pending}</Badge>}
      </Flex>
    </Button>
  );
}

function Sidebar({ user, pending, onLogout }) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex as="aside" display={{ base: 'none', md: 'flex' }} direction="column" w="264px" flexShrink={0} h="100vh" position="sticky" top={0}
      bg="white" borderRightWidth="1px" borderColor="glacier.100" p={4} gap={5}>
      <ChakraLink as={Link} to="/app" px={2} pt={1} _hover={{ textDecoration: 'none' }} aria-label="MyReminder, ir a mi agenda de hoy">
        <Logo />
      </ChakraLink>
      <Button as={NavLink} to="/app/eventos/nuevo" colorScheme="brand" leftIcon={<PlusIcon boxSize={5} />} size="md">Nuevo evento</Button>
      <Stack as="nav" aria-label="Principal" spacing={1} flex="1">
        {NAV.map((item) => <SideLink key={item.to} item={item} pending={pending} />)}
      </Stack>
      <Stack spacing={3} borderTopWidth="1px" borderColor="glacier.100" pt={4}>
        <Flex as="label" htmlFor="dark-switch" align="center" justify="space-between" px={2} cursor="pointer">
          <Flex align="center" gap={2} color="glacier.800" fontSize="sm" fontWeight={500}>
            {colorMode === 'dark' ? <MoonIcon boxSize={4} /> : <SunIcon boxSize={4} />}
            Modo oscuro
          </Flex>
          <Switch id="dark-switch" colorScheme="brand" isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
        </Flex>
        <Flex align="center" gap={3} px={2}>
          <Avatar size="sm" name={user.name} bg="glacier.700" color="polar.50" />
          <Box minW={0} flex="1">
            <Text fontWeight="600" fontSize="sm" noOfLines={1}>{user.name}</Text>
            <Text fontSize="xs" color="gray.600" noOfLines={1}>{user.email}</Text>
          </Box>
          <IconButton aria-label="Cerrar sesion" icon={<LogoutIcon boxSize={4} />} size="sm" variant="ghost" onClick={onLogout} />
        </Flex>
      </Stack>
    </Flex>
  );
}

function BottomNav({ user, pending, onLogout }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const itemProps = {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0.5, flex: 1, h: '100%',
    fontSize: '11px', fontWeight: 600, color: 'gray.600',
    _activeLink: { color: 'brand.500' },
  };
  return (
    <>
      <IconButton as={NavLink} to="/app/eventos/nuevo" aria-label="Nuevo evento" icon={<PlusIcon boxSize={6} />} colorScheme="brand" isRound size="lg"
        display={{ base: 'inline-flex', md: 'none' }} position="fixed" right={4} bottom="calc(84px + env(safe-area-inset-bottom))" zIndex={15} boxShadow="lg" />
      <Flex as="nav" aria-label="Principal" display={{ base: 'flex', md: 'none' }} position="fixed" bottom={0} left={0} right={0} zIndex={15}
        h="calc(64px + env(safe-area-inset-bottom))" pb="env(safe-area-inset-bottom)" bg="white" borderTopWidth="1px" borderColor="glacier.100">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <Box key={item.to} as={NavLink} to={item.to} end={item.end} {...itemProps} position="relative">
              <Box position="relative">
                <Icon boxSize={5} />
                {item.badge && pending > 0 && <Box position="absolute" top="-2px" right="-6px" w="8px" h="8px" borderRadius="full" bg="brand.500" aria-label={`${pending} pendientes hoy`} />}
              </Box>
              {item.label}
            </Box>
          );
        })}
        <Menu placement="top-end">
          <MenuButton as={Box} role="button" tabIndex={0} aria-label="Cuenta" cursor="pointer" flex={1} h="100%"
            display="flex" alignItems="center" justifyContent="center" fontSize="11px" fontWeight={600} color="gray.600">
            <Flex direction="column" align="center" gap={0.5}>
              <Avatar boxSize="20px" fontSize="10px" name={user.name} bg="glacier.700" color="polar.50" />
              Cuenta
            </Flex>
          </MenuButton>
          <MenuList>
            <Box px={3} py={2}>
              <Text fontWeight="600" noOfLines={1}>{user.name}</Text>
              <Text fontSize="sm" color="gray.600" noOfLines={1}>{user.email}</Text>
            </Box>
            <MenuDivider />
            <MenuItem icon={colorMode === 'dark' ? <SunIcon boxSize={4} /> : <MoonIcon boxSize={4} />} onClick={toggleColorMode}>
              {colorMode === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            </MenuItem>
            <MenuItem icon={<LogoutIcon boxSize={4} />} onClick={onLogout}>Cerrar sesion</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
}

function Shell() {
  const { user, logout } = useAuth();
  const { events, loading } = useEvents();
  const online = useOnlineStatus();
  const now = useNow();
  const navigate = useNavigate();
  useReminders(events);
  useSyncOnReconnect();

  const pending = getTodayProgress(events, now).pending;
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Flex minH="100vh">
      <ChakraLink href="#contenido" position="absolute" left="-9999px" _focus={{ left: 2, top: 2, zIndex: 30, bg: 'white', p: 2, borderRadius: 'md' }}>
        Saltar al contenido
      </ChakraLink>
      <Sidebar user={user} pending={pending} onLogout={handleLogout} />
      <Flex direction="column" flex="1" minW={0}>
        {loading && <TopProgress />}
        {!online && <OfflineBanner />}
        <Box as="main" id="contenido" maxW="5xl" w="100%" mx="auto" px={{ base: 4, md: 8 }} pt={{ base: 6, md: 8 }} pb={{ base: 36, md: 10 }} flex="1">
          <PageTransition>
            <Suspense fallback={<PageFallback />}><Outlet /></Suspense>
          </PageTransition>
        </Box>
      </Flex>
      <BottomNav user={user} pending={pending} onLogout={handleLogout} />
    </Flex>
  );
}

export default function DashboardLayout() {
  const { user } = useAuth();
  return (
    <EventsProvider key={user.id} userId={user.id}>
      <Shell />
    </EventsProvider>
  );
}