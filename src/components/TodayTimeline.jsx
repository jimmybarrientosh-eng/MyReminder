import { Badge, Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { getCategory } from '../utils/constants';
import { formatTime } from '../utils/today';
import { fadeUp, motionSafe } from '../utils/motion';

export default function TodayTimeline({ events, nextId, now }) {
  return (
    <Box as="ol" listStyleType="none" m={0} p={0}>
      {events.map((event, i) => {
        const category = getCategory(event.category);
        const done = new Date(event.start_at) <= now;
        const isNext = event.id === nextId;
        const last = i === events.length - 1;
        return (
          <Flex as="li" key={event.id} gap={{ base: 3, md: 4 }} aria-current={isNext ? 'step' : undefined}
            sx={motionSafe(`${fadeUp} .4s ease-out ${Math.min(i, 8) * 50}ms backwards`)}>
            <Text w="52px" flexShrink={0} pt={3} fontSize="sm" fontWeight={isNext ? 800 : 600} color={isNext ? 'brand.600' : 'gray.600'} textAlign="right">
              {formatTime(event.start_at)}
            </Text>
            <Flex direction="column" align="center" flexShrink={0}>
              <Box mt={4} w="12px" h="12px" borderRadius="full" bg={done ? 'glacier.300' : `${category.color}.400`}
                boxShadow={isNext ? '0 0 0 4px var(--chakra-colors-brand-100)' : 'none'} borderWidth={isNext ? '2px' : 0} borderColor={isNext ? 'brand.500' : undefined} />
              {!last && <Box flex="1" w="2px" bg="glacier.100" my={1} />}
            </Flex>
            <Flex flex="1" minW={0} mb={3} p={3} borderRadius="xl" borderWidth="1px" borderColor={isNext ? 'brand.300' : 'glacier.100'}
              bg={isNext ? 'glacier.50' : 'white'} justify="space-between" align="center" gap={3} wrap="wrap" opacity={done ? 0.7 : 1}>
              <Box minW={0}>
                <Flex align="center" gap={2} wrap="wrap">
                  <Text fontFamily="heading" fontWeight="800" textDecoration={done ? 'line-through' : 'none'}>{event.title}</Text>
                  <Badge colorScheme={category.color}>{category.label}</Badge>
                  {isNext && <Badge colorScheme="red">Siguiente</Badge>}
                  {done && <Badge>Listo</Badge>}
                </Flex>
                {event.description && <Text fontSize="sm" color="gray.600" noOfLines={2} mt={1}>{event.description}</Text>}
                {event.reminder_minutes > 0 && <Text fontSize="xs" color="glacier.700" mt={1}>Recordatorio {event.reminder_minutes} min antes</Text>}
              </Box>
              <Button as={RouterLink} to={`/app/eventos/${event.id}/editar`} size="sm" variant="ghost" aria-label={`Editar ${event.title}`}>Editar</Button>
            </Flex>
          </Flex>
        );
      })}
    </Box>
  );
}
