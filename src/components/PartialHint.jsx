import { Box, Button, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function PartialHint() {
  return (
    <Box mt={3} p={5} borderRadius="xl" borderWidth="1px" borderStyle="dashed" borderColor="glacier.300" bg="glacier.50">
      <Text fontWeight="600">¿Que mas tienes pendiente esta semana?</Text>
      <Text fontSize="sm" color="gray.600" mb={3}>Agrega tus eventos y recordatorios para verlos aqui.</Text>
      <Button as={RouterLink} to="/app/eventos/nuevo" size="sm" variant="outline">Agregar otro</Button>
    </Box>
  );
}
