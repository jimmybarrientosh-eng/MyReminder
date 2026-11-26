
import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { getCategory } from '../utils/constants';
import { dayKey } from '../utils/dates';

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const firstOfMonth = (d) =>
  new Date(d.getFullYear(), d.getMonth(), 1);

const getEventStatus = (event) => {
  const passed = new Date(event.start_at) <= new Date();

  return passed
    ? {
        label: 'Completado',
        bg: 'green.100',
        color: 'green.800',
        dot: 'green.500',
      }
    : {
        label: 'Terminado',
        bg: 'red.100',
        color: 'red.800',
        dot: 'red.500',
      };
};

export default function CalendarView({ events = [], loading }) {
  const [cursor, setCursor] = useState(() =>
    firstOfMonth(new Date())
  );

  const [selectedEvent, setSelectedEvent] = useState(null);

  const byDay = useMemo(() => {
    const map = {};

    [...events]
      .sort(
        (a, b) =>
          new Date(a.start_at) - new Date(b.start_at)
      )
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

    return [
      ...Array(offset).fill(null),
      ...Array.from(
        { length: total },
        (_, i) => new Date(y, m, i + 1)
      ),
    ];
  }, [cursor]);

  const move = (delta) => {
    setCursor(
      (c) =>
        new Date(
          c.getFullYear(),
          c.getMonth() + delta,
          1
        )
    );

    setSelectedEvent(null);
  };

  const title = cursor.toLocaleDateString('es', {
    month: 'long',
    year: 'numeric',
  });

  const today = dayKey(new Date());

  const formatDate = (value) =>
    new Date(value).toLocaleDateString('es', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const formatTime = (value) =>
    new Date(value).toLocaleTimeString('es', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <>
      <Box
        bg="white"
        p={4}
        borderRadius="xl"
        borderWidth="1px"
      >
        <Flex
          justify="space-between"
          align="center"
          mb={4}
          gap={2}
        >
          <Flex gap={1}>
            <Button
              size="sm"
              onClick={() => move(-1)}
              aria-label="Mes anterior"
            >
              ‹
            </Button>

            <Button
              size="sm"
              onClick={() => move(1)}
              aria-label="Mes siguiente"
            >
              ›
            </Button>
          </Flex>

          <Heading
            as="h2"
            size="md"
            textTransform="capitalize"
          >
            {title}
          </Heading>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setCursor(firstOfMonth(new Date()));
              setSelectedEvent(null);
            }}
          >
            Hoy
          </Button>
        </Flex>

        <Flex gap={4} mb={3} wrap="wrap">
          <Flex align="center" gap={2}>
            <Box
              w="10px"
              h="10px"
              borderRadius="full"
              bg="red.500"
            />
            <Text fontSize="xs">Terminado</Text>
          </Flex>

          <Flex align="center" gap={2}>
            <Box
              w="10px"
              h="10px"
              borderRadius="full"
              bg="green.500"
            />
            <Text fontSize="xs">Completado</Text>
          </Flex>
        </Flex>

        {loading ? (
          <Skeleton
            height="420px"
            data-testid="calendar-skeleton"
          />
        ) : (
          <Grid
            templateColumns="repeat(7, minmax(0, 1fr))"
            gap={1}
          >
            {WEEKDAYS.map((d) => (
              <Text
                key={d}
                textAlign="center"
                fontWeight="600"
                fontSize="sm"
              >
                {d}
              </Text>
            ))}

            {cells.map((date, i) => {
              if (!date) {
                return <Box key={`empty-${i}`} />;
              }

              const key = dayKey(date);
              const items = byDay[key] || [];

              return (
                <Box
                  key={key}
                  minH="84px"
                  p={1}
                  borderRadius="sm"
                  borderWidth={
                    key === today ? '2px' : '1px'
                  }
                  borderColor={
                    key === today
                      ? 'brand.500'
                      : 'gray.200'
                  }
                  bg={
                    items.length
                      ? 'glacier.50'
                      : 'transparent'
                  }
                >
                  <Text
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {date.getDate()}
                  </Text>

                  {items.slice(0, 2).map((e) => {
                    const status = getEventStatus(e);

                    return (
                      <Box
                        key={e.id}
                        as="button"
                        type="button"
                        display="block"
                        width="100%"
                        textAlign="left"
                        noOfLines={1}
                        fontSize="xs"
                        px={1}
                        mt={1}
                        borderRadius="sm"
                        bg={status.bg}
                        color={status.color}
                        borderLeft="3px solid"
                        borderColor={status.dot}
                        onClick={() =>
                          setSelectedEvent(e)
                        }
                        title="Ver detalles del recordatorio"
                        _hover={{
                          opacity: 0.8,
                          transform: 'scale(1.02)',
                        }}
                        transition="all 0.2s"
                      >
                        {e.title}
                      </Box>
                    );
                  })}

                  {items.length > 2 && (
                    <Text fontSize="xs">
                      +{items.length - 2} más
                    </Text>
                  )}
                </Box>
              );
            })}
          </Grid>
        )}
      </Box>

      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        isCentered
        motionPreset="scale"
        size="md"
      >
        <ModalOverlay
          bg="blackAlpha.600"
          backdropFilter="blur(6px)"
        />

        <ModalContent
          borderRadius="xl"
          mx={4}
          overflow="hidden"
        >
          <ModalHeader
            borderBottomWidth="1px"
            borderColor="gray.100"
          >
            Detalles del recordatorio
          </ModalHeader>

          <ModalCloseButton />

          {selectedEvent && (
            <ModalBody py={6}>
              <Heading
                size="lg"
                mb={3}
                pr={6}
              >
                {selectedEvent.title}
              </Heading>

              <Badge
                mb={4}
                colorScheme={
                  getEventStatus(selectedEvent).label ===
                  'Completado'
                    ? 'green'
                    : 'red'
                }
                px={3}
                py={1}
                borderRadius="full"
              >
                {getEventStatus(selectedEvent).label}
              </Badge>

              <Box mb={3}>
                <Text
                  fontSize="sm"
                  color="gray.500"
                  fontWeight="600"
                >
                  Fecha
                </Text>

                <Text textTransform="capitalize">
                  {formatDate(selectedEvent.start_at)}
                </Text>
              </Box>

              <Box mb={3}>
                <Text
                  fontSize="sm"
                  color="gray.500"
                  fontWeight="600"
                >
                  Hora
                </Text>

                <Text>
                  {formatTime(selectedEvent.start_at)}
                </Text>
              </Box>

              {selectedEvent.category && (
                <Box mb={3}>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    fontWeight="600"
                  >
                    Categoría
                  </Text>

                  <Text>
                    {getCategory(
                      selectedEvent.category
                    ).label || selectedEvent.category}
                  </Text>
                </Box>
              )}

              {selectedEvent.description && (
                <Box mt={4}>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    fontWeight="600"
                    mb={1}
                  >
                    Descripción
                  </Text>

                  <Text color="gray.700">
                    {selectedEvent.description}
                  </Text>
                </Box>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
