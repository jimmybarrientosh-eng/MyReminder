import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { fadeUp, motionSafe } from '../utils/motion';

export default function PageTransition({ children }) {
  const { pathname } = useLocation();
  return (
    <Box key={pathname} sx={motionSafe(`${fadeUp} .35s ease-out`)}>
      {children}
    </Box>
  );
}
