import { Box } from '@chakra-ui/react';
import { motionSafe, slide } from '../utils/motion';

export default function TopProgress() {
  return (
    <Box position="fixed" top={0} left={0} right={0} h="3px" zIndex={30} overflow="hidden" bg="glacier.100"
      role="progressbar" aria-label="Cargando datos">
      <Box h="100%" w="40%" bg="brand.500" sx={motionSafe(`${slide} 1.1s ease-in-out infinite`)} />
    </Box>
  );
}
