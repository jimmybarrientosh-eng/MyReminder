import { Badge, Box, Button, Container, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const FEATURES = [
  { title: 'Eventos con categorias', text: 'Separa trabajo, personal y reuniones con colores y filtros que se entienden de un vistazo.' },
  { title: 'Recordatorios a tiempo', text: 'Elige cuanto antes quieres el aviso: 5 minutos, 1 hora o 1 dia.' },
  { title: 'Calendario mensual', text: 'Mira tu mes completo y abre cualquier evento con un clic.' },
  { title: 'Sin conexion, sin drama', text: 'Si se cae el internet, guardamos tus cambios y los enviamos cuando vuelva.' },
];

const STEPS = [
  'Crea tu cuenta en menos de un minuto.',
  'Agrega tus eventos y elige cuando quieres el aviso.',
  'Recibe el recordatorio justo antes de que empiecen.',
];

function Preview() {
  const rows = [
    { title: 'Entrega de informe', tag: 'Trabajo', color: 'glacier' },
    { title: 'Cena con Ana', tag: 'Personal', color: 'gray' },
    { title: 'Daily del equipo', tag: 'Reuniones', color: 'brand' },
  ];
  return (
    <Box aria-hidden="true" bg="white" p={5} borderRadius="2xl" boxShadow="0 24px 60px rgba(16,40,54,0.18)" transform="rotate(2deg)">
      <Flex bg="glacier.100" borderRadius="xl" p={4} mb={4} align="center" gap={3}>
        <Box w="10px" h="10px" borderRadius="full" bg="brand.500" />
        <Box>
          <Text fontSize="xs" color="glacier.700">Lo siguiente en tu agenda</Text>
          <Text fontFamily="heading" fontWeight="800">Reunion de equipo, en 25 min</Text>
        </Box>
      </Flex>
      <Stack spacing={2}>
        {rows.map((r) => (
          <Flex key={r.title} p={3} borderWidth="1px" borderLeftWidth="4px" borderLeftColor={`${r.color}.400`} borderRadius="lg" justify="space-between" align="center">
            <Text fontWeight="600" fontSize="sm">{r.title}</Text>
            <Badge colorScheme={r.color}>{r.tag}</Badge>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}

export default function LandingPage() {
  useDocumentTitle('Inicio');
  const { user } = useAuth();

  return (
    <>
      <Box bgGradient="linear(to-b, glacier.100, polar.50)" py={{ base: 12, md: 20 }}>
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 10, md: 16 }} alignItems="center">
            <Box>
              <Heading as="h1" fontSize={{ base: '4xl', md: '6xl' }} lineHeight="1.02">
                Lo importante, a tiempo.
              </Heading>
              <Text fontSize={{ base: 'md', md: 'xl' }} color="glacier.800" mt={5} maxW="md">
                MyReminder organiza tus eventos y te avisa antes de que empiecen. Sin complicaciones.
              </Text>
              <Flex gap={3} mt={8} wrap="wrap">
                {user ? (
                  <Button as={Link} to="/app" size="lg" colorScheme="brand">Ir a mi agenda</Button>
                ) : (
                  <>
                    <Button as={Link} to="/registro" size="lg" colorScheme="brand">Registrate</Button>
                    <Button as={Link} to="/login" size="lg" variant="outline" bg="white">Ver Agenda</Button>
                  </>
                )}
              </Flex>
            </Box>
            <Preview />
          </SimpleGrid>
        </Container>
      </Box>

      <Container maxW="6xl" py={{ base: 12, md: 20 }}>
        <Heading as="h2" size="xl" mb={2}>Todo para que nada se te pase</Heading>
        <Text color="gray.600" mb={10}>Lo justo y necesario para llevar tu dia a dia.</Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {FEATURES.map((f, i) => (
            <Flex key={f.title} gap={4} bg="white" p={6} borderRadius="2xl" borderWidth="1px" borderColor="glacier.100"
              transition="transform .2s, box-shadow .2s" _hover={{ transform: 'translateY(-3px)', boxShadow: 'lg' }}>
              <Text fontFamily="heading" fontWeight="800" fontSize="2xl" color="brand.500" lineHeight="1">0{i + 1}</Text>
              <Box>
                <Heading as="h3" size="md" mb={1}>{f.title}</Heading>
                <Text color="gray.600">{f.text}</Text>
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      </Container>

      <Box bg="glacier.100" py={{ base: 12, md: 16 }}>
        <Container maxW="6xl">
          <Heading as="h2" size="xl" mb={8}>Como funciona</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {STEPS.map((s, i) => (
              <Box key={s}>
                <Flex w="36px" h="36px" borderRadius="full" bg="glacier.900" color="white" align="center" justify="center" fontWeight="800" mb={3}>{i + 1}</Flex>
                <Text fontSize="lg">{s}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Container maxW="6xl" py={{ base: 12, md: 20 }}>
        <Flex bg="glacier.900" color="white" borderRadius="3xl" p={{ base: 8, md: 12 }} direction={{ base: 'column', md: 'row' }}
          align={{ md: 'center' }} justify="space-between" gap={6}>
          <Box>
            <Heading as="h2" size="lg">Empieza hoy con MyReminder</Heading>
            <Text color="glacier.100" mt={2}>Gratis, rapido y listo en un minuto.</Text>
          </Box>
          <Button as={Link} to={user ? '/app' : '/registro'} size="lg" colorScheme="brand">
            {user ? 'Ir a mi agenda' : 'Comenzar'}
          </Button>
        </Flex>
      </Container>
    </>
  );
}
