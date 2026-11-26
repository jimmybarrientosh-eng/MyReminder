import { useMemo, useState } from 'react';
import { Alert, AlertIcon, Button, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import EventForm from '../components/EventForm';
import { useEvents } from '../hooks/useEvents';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useNotify } from '../hooks/useNotify';
import { toInputValue } from '../utils/dates';

export default function EventFormPage() {
  const { id } = useParams();
  const title = id ? 'Editar evento' : 'Nuevo evento';
  useDocumentTitle(title);
  const navigate = useNavigate();
  const notify = useNotify();
  const { events, loading, addEvent, editEvent } = useEvents();
  const [saving, setSaving] = useState(false);

  const current = events.find((e) => e.id === id);
  const initialValues = useMemo(
    () => (current ? { ...current, start_at: toInputValue(current.start_at) } : undefined),
    [current]
  );

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      if (id) await editEvent(id, data);
      else await addEvent(data);
      notify({ title: id ? 'Cambios guardados' : 'Listo, evento creado' });
      navigate('/app/eventos');
    } catch (err) {
      notify({ title: 'No pudimos guardar el evento', description: 'Revisa tu conexion e intentalo de nuevo.' });
      setSaving(false);
    }
  };

  if (id && loading) {
    return <Stack aria-busy="true"><Skeleton height="24px" width="30%" /><Skeleton height="360px" /></Stack>;
  }
  if (id && !current) {
    return (
      <Alert status="warning" borderRadius="xl" flexWrap="wrap" gap={2}>
        <AlertIcon />
        No encontramos ese evento. Puede que ya se haya eliminado.
        <Button as={Link} to="/app/eventos" size="sm" ml="auto">Volver a tus eventos</Button>
      </Alert>
    );
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Eventos', to: '/app/eventos' }, { label: title }]} />
      <Heading as="h1" size="lg" mb={4}>{title}</Heading>
      <EventForm initialValues={initialValues} onSubmit={handleSubmit} onCancel={() => navigate('/app/eventos')} isSaving={saving}
        submitLabel={id ? 'Guardar cambios' : 'Crear evento'} />
    </>
  );
}
