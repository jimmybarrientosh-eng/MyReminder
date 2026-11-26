import { useRef, useState } from 'react';
import {
  AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
  Box, Button, Stack, Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import EventCard from './EventCard';
import EventsSkeleton from './EventsSkeleton';

export default function EventList({ events, loading, onDelete, isFiltered = false }) {
  const [pending, setPending] = useState(null);
  const cancelRef = useRef(null);

  const confirmDelete = () => {
    onDelete(pending);
    setPending(null);
  };

  if (loading) return <EventsSkeleton />;

  if (events.length === 0) {
    return (
      <Box bg="white" p={8} borderRadius="xl" borderWidth="1px" textAlign="center">
        {isFiltered ? (
          <Text>Ningun evento coincide con tu busqueda. Prueba con otro titulo o categoria.</Text>
        ) : (
          <>
            <Text fontWeight="600" fontSize="lg">Tu agenda esta libre</Text>
            <Text color="gray.600" mb={4}>Crea tu primer evento y MyReminder te avisa a tiempo.</Text>
            <Button as={RouterLink} to="/app/eventos/nuevo" colorScheme="brand">Crear evento</Button>
          </>
        )}
      </Box>
    );
  }

  return (
    <>
      <Stack spacing={3} as="ul" listStyleType="none">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} onRequestDelete={setPending} />
        ))}
      </Stack>

      <AlertDialog isOpen={!!pending} leastDestructiveRef={cancelRef} onClose={() => setPending(null)} motionPreset="slideInBottom">
        <AlertDialogOverlay>
          <AlertDialogContent w="full" maxW={{ base: 'full', md: 'md' }} mx={{ base: 0, md: 4 }} my={{ base: 0, md: 16 }}
            alignSelf={{ base: 'flex-end', md: 'flex-start' }} borderBottomRadius={{ base: 0, md: 'xl' }}>
            <AlertDialogHeader>Eliminar evento</AlertDialogHeader>
            <AlertDialogBody>
              ¿Seguro que quieres eliminar "{pending?.title}"? Podras deshacerlo unos segundos despues.
            </AlertDialogBody>
            <AlertDialogFooter gap={2}>
              <Button ref={cancelRef} onClick={() => setPending(null)}>Cancelar</Button>
              <Button colorScheme="red" onClick={confirmDelete}>Eliminar</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
