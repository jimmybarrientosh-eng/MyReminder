import { Heading } from '@chakra-ui/react';
import Breadcrumbs from '../components/Breadcrumbs';
import CalendarView from '../components/CalendarView';
import { useEvents } from '../hooks/useEvents';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function CalendarPage() {
  useDocumentTitle('Calendario');
  const { events, loading } = useEvents();
  return (
    <>
      <Breadcrumbs items={[{ label: 'Resumen', to: '/app' }, { label: 'Calendario' }]} />
      <Heading as="h1" size="lg" mb={4}>Calendario</Heading>
      <CalendarView events={events} loading={loading} />
    </>
  );
}
