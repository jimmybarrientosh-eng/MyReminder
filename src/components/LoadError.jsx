import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button } from '@chakra-ui/react';

export default function LoadError({ onRetry }) {
  return (
    <Alert status="error" borderRadius="xl" flexWrap="wrap" gap={2}>
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>No pudimos cargar tus eventos</AlertTitle>
        <AlertDescription>Revisa tu conexion e intentalo de nuevo.</AlertDescription>
      </Box>
      <Button size="sm" colorScheme="brand" onClick={onRetry}>Reintentar</Button>
    </Alert>
  );
}
