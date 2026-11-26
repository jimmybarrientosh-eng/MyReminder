import { useMemo } from 'react';
import { Box, Flex, Skeleton, Text } from '@chakra-ui/react';
import { timeUntil } from '../utils/dates';

export default function NextEvent({ events, loading }) {
  const next = useMemo(
    () =>
      events
        .filter((e) => new Date(e.start_at) > new Date())
        .sort((a, b) => new Date(a.start_at) - new Date(b.start_at))[0],
    [events]
  );

  if (loading) return <Skeleton height="72px" borderRadius="xl" mb={5} />;
  if (events.length === 0) return null;

  return (
    <Flex bg="glacier.100" borderRadius="xl" p={4} mb={5} align="center" gap={3} aria-live="polite">
      <Box w="10px" h="10px" borderRadius="full" bg="brand.500" flexShrink={0} aria-hidden="true" />
      <Box>
        <Text fontSize="sm" color="glacier.700">{next ? 'Lo siguiente en tu agenda' : 'Todo al dia'}</Text>
        <Text fontFamily="heading" fontWeight="800" fontSize="lg">
          {next ? `${next.title}, ${timeUntil(next.start_at)}` : 'Nada pendiente. Disfruta el momento.'}
        </Text>
      </Box>
    </Flex>
  );
}
