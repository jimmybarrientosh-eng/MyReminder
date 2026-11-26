import { useMemo, useState } from 'react';
import { Box, Button, Flex, Grid, Heading, Skeleton, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { getCategory } from '../utils/constants';
import { dayKey } from '../utils/dates';

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const firstOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);

export default function CalendarView({ events, loading }) {
  const [cursor, setCursor] = useState(() => firstOfMonth(new Date()));

  const byDay = useMemo(() => {
    const map = {};
    [...events]
      .sort((a, b) => new Date(a.start_at) - new Date(b.start_at))
      .forEach((e) => {
        const key = dayKey(e.start_at);
        map[key] = [...(map[key] || []), e];
      });
    return map;
  }, [events]);

  const cells = useMemo(() => {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const offset = (cursor.getDay() + 6) % 7;
    const total = new Date(y, m + 1, 0).getDate();
    return [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => new Date(y, m, i + 1))];
  }, [cursor]);

  const move = (delta) => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
  const title = cursor.toLocaleDateString('es', { month: 'long', year: 'numeric' });
  const today = dayKey(new Date());

  return (
    <Box bg="white" p={4} borderRadius="xl" borderWidth="1px">
      <Flex justify="space-between" align="center" mb={4} gap={2}>
        <Flex gap={1}>
          <Button size="sm" onClick={() => move(-1)} aria-label="Mes anterior">‹</Button>
          <Button size="sm" onClick={() => move(1)} aria-label="Mes siguiente">›</Button>
        </Flex>
        <Heading as="h2" size="md" textTransform="capitalize">{title}</Heading>
        <Button size="sm" variant="outline" onClick={() => setCursor(firstOfMonth(new Date()))}>Hoy</Button>
      </Flex>
      {loading ? (
        <Skeleton height="420px" data-testid="calendar-skeleton" />
      ) : (
        <Grid templateColumns="repeat(7, minmax(0, 1fr))" gap={1}>
          {WEEKDAYS.map((d) => <Text key={d} textAlign="center" fontWeight="600" fontSize="sm">{d}</Text>)}
          {cells.map((date, i) => {
            if (!date) return <Box key={`empty-${i}`} />;
            const key = dayKey(date);
            const items = byDay[key] || [];
            return (
              <Box key={key} minH="84px" p={1} borderRadius="sm" borderWidth={key === today ? '2px' : '1px'}
                borderColor={key === today ? 'brand.500' : 'gray.200'} bg={items.length ? 'glacier.50' : 'transparent'}>
                <Text fontSize="xs" fontWeight="600">{date.getDate()}</Text>
                {items.slice(0, 2).map((e) => (
                  <Text key={e.id} as={RouterLink} to={`/app/eventos/${e.id}/editar`} display="block" noOfLines={1}
                    fontSize="xs" px={1} mt={1} borderRadius="sm" bg={`${getCategory(e.category).color}.100`}>
                    {e.title}
                  </Text>
                ))}
                {items.length > 2 && <Text fontSize="xs">+{items.length - 2} mas</Text>}
              </Box>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
