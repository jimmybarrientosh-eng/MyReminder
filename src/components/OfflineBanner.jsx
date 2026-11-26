import { Box } from '@chakra-ui/react';

export default function OfflineBanner() {
  return (
    <Box role="status" bg="glacier.900" color="white" textAlign="center" py={2} px={4} fontSize="sm">
      Sin conexion. Guardamos tus cambios y los enviamos al volver.
    </Box>
  );
}
