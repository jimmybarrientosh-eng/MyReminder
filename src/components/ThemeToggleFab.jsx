import { IconButton, useColorMode } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon } from './NavIcons';

export default function ThemeToggleFab() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { pathname } = useLocation();
  if (pathname.startsWith('/app')) return null;
  const dark = colorMode === 'dark';
  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}
      icon={dark ? <SunIcon boxSize={5} /> : <MoonIcon boxSize={5} />}
      position="fixed" bottom={4} right={4} zIndex={20} isRound size="md"
      bg="white" borderWidth="1px" borderColor="glacier.200" boxShadow="lg"
      _hover={{ bg: 'glacier.100' }}
    />
  );
}
