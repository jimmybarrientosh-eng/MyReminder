import { memo } from 'react';
import { Badge, Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { getCategory } from '../utils/constants';
import { formatDateTime } from '../utils/dates';
import { fadeUp, motionSafe } from '../utils/motion';

function EventCard({ event, index = 0, onRequestDelete }) {
  const category = getCategory(event.category);
  const isPast = new Date(event.start_at) < new Date();
  return (
    <Flex as="li" bg="white" p={4} borderRadius="xl" borderWidth="1px" borderLeftWidth="4px" borderLeftColor={`${category.color}.400`}
      justify="space-between" align="center" gap={3} wrap="wrap" transition="transform .2s, box-shadow .2s"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
      sx={motionSafe(`${fadeUp} .4s ease-out ${Math.min(index, 8) * 45}ms backwards`)}>
      <Box opacity={isPast ? 0.65 : 1}>
        <Flex align="center" gap={2} wrap="wrap">
          <Text fontFamily="heading" fontWeight="800">{event.title}</Text>
          <Badge colorScheme={category.color}>{category.label}</Badge>
          {isPast && <Badge>Pasado</Badge>}
        </Flex>
        <Text fontSize="sm" color="gray.600">{formatDateTime(event.start_at)}</Text>
        {event.description && <Text fontSize="sm" mt={1}>{event.description}</Text>}
        {event.reminder_minutes > 0 && <Text fontSize="xs" color="glacier.700">Recordatorio {event.reminder_minutes} min antes</Text>}
      </Box>
      <Flex gap={2}>
        <Button as={RouterLink} to={`/app/eventos/${event.id}/editar`} size="sm" variant="outline" aria-label={`Editar ${event.title}`}>Editar</Button>
        <Button size="sm" colorScheme="red" variant="ghost" aria-label={`Eliminar ${event.title}`} onClick={() => onRequestDelete(event)}>Eliminar</Button>
      </Flex>
    </Flex>
  );
}

export default memo(EventCard);
