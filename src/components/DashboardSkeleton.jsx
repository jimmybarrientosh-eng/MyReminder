import { SimpleGrid, Skeleton, Stack } from '@chakra-ui/react';

export default function DashboardSkeleton() {
  return (
    <Stack spacing={5} aria-busy="true" aria-label="Cargando resumen" data-testid="dashboard-skeleton">
      <Skeleton h="72px" borderRadius="xl" />
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        {Array.from({ length: 4 }, (_, i) => <Skeleton key={i} h="112px" borderRadius="2xl" />)}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
        <Skeleton h="260px" borderRadius="2xl" gridColumn={{ lg: 'span 2' }} />
        <Skeleton h="260px" borderRadius="2xl" />
      </SimpleGrid>
      <Skeleton h="220px" borderRadius="2xl" />
    </Stack>
  );
}
