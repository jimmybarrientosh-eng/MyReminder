import { Box, Flex, Skeleton, Stack } from '@chakra-ui/react';

export default function EventsSkeleton({ count = 4 }) {
  return (
    <Stack spacing={3} data-testid="events-skeleton" aria-busy="true" aria-label="Cargando eventos">
      {Array.from({ length: count }, (_, i) => (
        <Flex key={i} bg="white" p={4} borderRadius="xl" borderWidth="1px" borderLeftWidth="4px" borderLeftColor="glacier.200"
          justify="space-between" align="center" gap={3}>
          <Box flex="1">
            <Flex gap={2} mb={3}>
              <Skeleton height="18px" width="35%" />
              <Skeleton height="18px" width="64px" borderRadius="full" />
            </Flex>
            <Skeleton height="12px" width="25%" mb={2} />
            <Skeleton height="12px" width="50%" />
          </Box>
          <Flex gap={2}>
            <Skeleton height="32px" width="64px" />
            <Skeleton height="32px" width="84px" />
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
}
