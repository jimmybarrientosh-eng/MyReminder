import { useMemo } from 'react';
import { Box, Button, CircularProgress, CircularProgressLabel, Flex, Heading, SimpleGrid, Skeleton, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import LoadError from '../components/LoadError';
import Panel from '../components/Panel';
import StatCard from '../components/StatCard';
import TodayTimeline from '../components/TodayTimeline';
import { useAuth } from '../hooks/useAuth';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useEvents } from '../hooks/useEvents';
import { useNow } from '../hooks/useNow';
import { getGreeting, timeUntil } from '../utils/dates';
import { computeStats } from '../utils/stats';
import { formatLongDate, formatTime, getTodayEvents, getTodayProgress, getTomorrowEvents } from '../utils/today';

function TodaySkeleton() {
  return (
    <Stack spacing={5} aria-busy="true">
      <Skeleton h="110px" borderRadius="2xl" />
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
        <Skeleton h="320px" borderRadius="2xl" gridColumn={{ lg: 'span 2' }} />
        <Skeleton h="220px" borderRadius="2xl" />
      </SimpleGrid>
    </Stack>
  );
}

function Hero({ progress, now }) {
  const { total, done, percent, next } = progress;
  let eyebrow = 'Lo siguiente en tu agenda';
  let title;
  let detail = null;
  if (total === 0) {
    eyebrow = 'Agenda de hoy';
    title = 'Hoy no tienes eventos';
    detail = 'Un dia libre. Aprovechalo o agrega algo nuevo.';
  } else if (next) {
    title = next.title;
    detail = `${timeUntil(next.start_at, now)} · ${formatTime(next.start_at)}`;
  } else {
    eyebrow = 'Agenda de hoy';
    title = 'Terminaste todo por hoy';
    detail = 'No queda nada pendiente. Buen trabajo.';
  }
  return (
    <Box position="relative" overflow="hidden" borderRadius="3xl" p={{ base: 5, md: 8 }} color="#FFFFFF"
      background="linear-gradient(135deg, #102836 0%, #255573 60%, #336F96 100%)" boxShadow="0 18px 40px rgba(16,40,54,0.28)" aria-live="polite">
      <Box aria-hidden="true" position="absolute" top="-50px" right="-40px" w="200px" h="200px" borderRadius="full" bg="rgba(211,22,28,0.35)" />
      <Box aria-hidden="true" position="absolute" bottom="-70px" right="110px" w="160px" h="160px" borderRadius="full" bg="rgba(255,255,255,0.07)" />
      <Flex position="relative" align="center" justify="space-between" gap={4}>
        <Box minW={0}>
          <Flex align="center" gap={2} mb={2}>
            <Box w="8px" h="8px" borderRadius="full" bg="brand.300" aria-hidden="true" />
            <Text fontSize="xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" color="rgba(255,255,255,0.75)">{eyebrow}</Text>
          </Flex>
          <Text fontFamily="heading" fontWeight="800" fontSize={{ base: '2xl', md: '3xl' }} lineHeight="1.15" noOfLines={2}>{title}</Text>
          {detail && <Text mt={1} color="rgba(255,255,255,0.85)">{detail}</Text>}
        </Box>
        {total > 0 && (
          <Flex direction="column" align="center" flexShrink={0}>
            <CircularProgress value={percent} size="84px" thickness="9px" color="brand.300" trackColor="rgba(255,255,255,0.2)" aria-label={`${done} de ${total} eventos de hoy`}>
              <CircularProgressLabel fontWeight="800" fontSize="md">{done}/{total}</CircularProgressLabel>
            </CircularProgress>
            <Text fontSize="xs" mt={1} color="rgba(255,255,255,0.75)">completados</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

function Tomorrow({ events }) {
  if (events.length === 0) return <Text color="gray.600">Mañana esta libre.</Text>;
  return (
    <Stack as="ul" listStyleType="none" spacing={2}>
      {events.slice(0, 4).map((e) => (
        <Flex as="li" key={e.id} gap={3} align="baseline">
          <Text w="52px" flexShrink={0} fontSize="sm" fontWeight="600" color="gray.600">{formatTime(e.start_at)}</Text>
          <Text noOfLines={1}>{e.title}</Text>
        </Flex>
      ))}
      {events.length > 4 && <Text fontSize="sm" color="gray.600">y {events.length - 4} mas</Text>}
    </Stack>
  );
}

export default function TodayPage() {
  useDocumentTitle('Hoy');
  const { user } = useAuth();
  const { events, loading, error, reload } = useEvents();
  const now = useNow();
  const today = useMemo(() => getTodayEvents(events, now), [events, now]);
  const tomorrow = useMemo(() => getTomorrowEvents(events, now), [events, now]);
  const progress = useMemo(() => getTodayProgress(events, now), [events, now]);
  const stats = useMemo(() => computeStats(events, now), [events, now]);
  const firstName = user?.name?.split(' ')[0];
  const date = formatLongDate(now);

  let content;
  if (error) content = <LoadError onRetry={reload} />;
  else if (loading) content = <TodaySkeleton />;
  else {
    content = (
      <Stack spacing={5}>
        <Hero progress={progress} now={now} />
        <SimpleGrid columns={3} spacing={{ base: 2, md: 4 }}>
          <StatCard index={0} label="Hoy" value={stats.today} hint="eventos" accent="glacier.600" />
          <StatCard index={1} label="Pendientes" value={progress.pending} hint="por hacer hoy" accent="brand.500" />
          <StatCard index={2} label="7 dias" value={stats.week} hint="proximos" accent="glacier.300" />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5} alignItems="start">
          <Panel title="Agenda de hoy" gridColumn={{ lg: 'span 2' }}
            action={<Text fontSize="sm" color="gray.600">{today.length === 1 ? '1 evento' : `${today.length} eventos`}</Text>}>
            {today.length === 0 ? (
              <Box textAlign="center" py={6}>
                <Heading as="h3" size="sm" mb={2}>Tu dia esta libre</Heading>
                <Text color="gray.600" mb={4}>Crea un evento para hoy y te avisamos a tiempo.</Text>
                <Button as={RouterLink} to="/app/eventos/nuevo" colorScheme="brand">Crear evento</Button>
              </Box>
            ) : (
              <TodayTimeline events={today} nextId={progress.next?.id} now={now} />
            )}
          </Panel>
          <Stack spacing={5}>
            <Panel title="Manana" action={<Button as={RouterLink} to="/app/calendario" size="sm" variant="ghost">Calendario</Button>}>
              <Tomorrow events={tomorrow} />
            </Panel>
            <Panel title="Accesos rapidos">
              <Stack spacing={2}>
                <Button as={RouterLink} to="/app/eventos/nuevo" colorScheme="brand">Nuevo evento</Button>
                <Button as={RouterLink} to="/app/eventos" variant="outline">Ver todos los eventos</Button>
                <Button as={RouterLink} to="/app/resumen" variant="outline">Ver resumen</Button>
              </Stack>
            </Panel>
          </Stack>
        </SimpleGrid>
      </Stack>
    );
  }

  return (
    <>
      <Flex justify="space-between" align="flex-end" wrap="wrap" gap={3} mb={6}>
        <Box>
          <Text fontSize="sm" fontWeight="600" color="glacier.700" textTransform="capitalize">{date}</Text>
          <Heading as="h1" size="lg">{getGreeting(now)}{firstName ? `, ${firstName}` : ''}</Heading>
        </Box>
        <Button as={RouterLink} to="/app/eventos/nuevo" colorScheme="brand" display={{ base: 'none', md: 'inline-flex' }}>Nuevo evento</Button>
      </Flex>
      {content}
    </>
  );
}