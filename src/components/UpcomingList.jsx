import { Badge, Box, Flex, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { getCategory } from '../utils/constants';
import { formatDateTime, timeUntil } from '../utils/dates';

export default function UpcomingList({ events }) {
  if (events.length === 0) {
    return <Text color="gray.600">No tienes eventos proximos. Disfruta el momento.</Text>;
  }
  return (
    <Stack as="ul" listStyleType="none" spacing={2}>
      {events.map((e) => (
        <li key={e.id}>
          <Flex as={RouterLink} to={`/app/eventos/${e.id}/editar`} p={3} borderRadius="lg" borderLeftWidth="4px"
            borderLeftColor={`${getCategory(e.category).color}.400`} align="center" justify="space-between" gap={3}
            transition="background .15s" _hover={{ bg: 'glacier.50' }}>
            <Box minW={0}>
              <Text fontWeight="600" noOfLines={1}>{e.title}</Text>
              <Text fontSize="sm" color="gray.600">{formatDateTime(e.start_at)}</Text>
            </Box>
            <Badge colorScheme="glacier" flexShrink={0}>{timeUntil(e.start_at)}</Badge>
          </Flex>
        </li>
      ))}
    </Stack>
  );
}
