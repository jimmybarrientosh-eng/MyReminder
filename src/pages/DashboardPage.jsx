import { useMemo } from 'react';
import { Box, Button, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import BarChart from '../components/BarChart';
import CategoryBars from '../components/CategoryBars';
import DashboardSkeleton from '../components/DashboardSkeleton';
import LoadError from '../components/LoadError';
import NextEvent from '../components/NextEvent';
import Panel from '../components/Panel';
import StatCard from '../components/StatCard';
import UpcomingList from '../components/UpcomingList';
import { useAuth } from '../hooks/useAuth';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useEvents } from '../hooks/useEvents';
import { getGreeting } from '../utils/dates';
import { computeStats } from '../utils/stats';

export default function DashboardPage() {
  useDocumentTitle('Resumen');
  const { user } = useAuth();
  const { events, loading, error, reload } = useEvents();
  const stats = useMemo(() => computeStats(events), [events]);
  const firstName = user?.name?.split(' ')[0];

  let content;
  if (error) {
    content = <LoadError onRetry={reload} />;
  } else if (loading) {
    content = <DashboardSkeleton />;
  } else if (events.length === 0) {
    content = (
      <Box bg="white" p={{ base: 8, md: 12 }} borderRadius="2xl" borderWidth="1px" borderColor="glacier.100" textAlign="center">
        <Heading as="h2" size="md" mb={2}>Tu agenda esta libre</Heading>
        <Text color="gray.600" mb={5}>Crea tu primer evento y aqui veras tu resumen, tus graficas y lo que viene.</Text>
        <Button as={RouterLink} to="/app/eventos/nuevo" colorScheme="brand" size="lg">Crear mi primer evento</Button>
      </Box>
    );
  } else {
    content = (
      <Stack spacing={5}>
        <NextEvent events={events} loading={false} />
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <StatCard index={0} label="Eventos en total" value={stats.total} hint={`${stats.past} ya pasaron`} />
          <StatCard index={1} label="Por venir" value={stats.upcoming} hint="eventos pendientes" accent="brand.500" />
          <StatCard index={2} label="Proximos 7 dias" value={stats.week} hint={`${stats.today} hoy`} accent="glacier.600" />
          <StatCard index={3} label="Con recordatorio" value={stats.withReminder} hint="te avisamos antes" accent="glacier.300" />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
          <Panel title="Proximos 7 dias" gridColumn={{ lg: 'span 2' }}>
            <BarChart data={stats.days} label="Eventos por dia" />
          </Panel>
          <Panel title="Por categoria">
            <CategoryBars counts={stats.byCategory} />
          </Panel>
        </SimpleGrid>
        <Panel title="Lo que viene" action={<Button as={RouterLink} to="/app/eventos" size="sm" variant="ghost">Ver todos</Button>}>
          <UpcomingList events={stats.nextEvents} />
        </Panel>
      </Stack>
    );
  }

  return (
    <>
      <Flex justify="space-between" align="flex-end" wrap="wrap" gap={3} mb={6}>
        <Box>
          <Heading as="h1" size="lg">{getGreeting()}{firstName ? `, ${firstName}` : ''}</Heading>
          <Text color="glacier.700">Este es el resumen de tu agenda.</Text>
        </Box>
        <Button as={RouterLink} to="/app/eventos/nuevo" colorScheme="brand">Nuevo evento</Button>
      </Flex>
      {content}
    </>
  );
}
