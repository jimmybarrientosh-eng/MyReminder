// Pruebas de EventsPage con Jest y React Testing Library
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import EventsPage from '../pages/EventsPage';
import { EventsProvider } from '../context/EventsContext';

jest.mock('../services/eventsService', () => ({
  listEvents: jest.fn(() =>
    Promise.resolve([
      { id: '1', title: 'Informe', category: 'trabajo', start_at: '2030-01-15T10:00:00.000Z', reminder_minutes: 0 },
      { id: '2', title: 'Cumpleaños', category: 'personal', start_at: '2030-02-01T18:00:00.000Z', reminder_minutes: 0 },
    ])
  ),
  createEvent: jest.fn((userId, event) => Promise.resolve(event)),
  updateEvent: jest.fn(),
  deleteEvent: jest.fn((userId, id) => Promise.resolve(id)),
  syncPending: jest.fn(() => Promise.resolve(0)),
}));

const setup = () =>
  render(
    <ChakraProvider>
      <MemoryRouter>
        <EventsProvider userId="u1">
          <EventsPage />
        </EventsProvider>
      </MemoryRouter>
    </ChakraProvider>
  );

describe('EventsPage (integracion)', () => {
  test('muestra skeleton y luego los eventos', async () => {
    setup();
    expect(screen.getByTestId('events-skeleton')).toBeInTheDocument();
    expect(await screen.findByText('Informe')).toBeInTheDocument();
    expect(screen.queryByTestId('events-skeleton')).not.toBeInTheDocument();
  });

  test('filtra por categoria con los chips y permite limpiar', async () => {
    setup();
    await screen.findByText('Informe');
    await userEvent.click(screen.getByRole('button', { name: 'Personal' }));
    expect(screen.queryByText('Informe')).not.toBeInTheDocument();
    expect(screen.getByText('Cumpleaños')).toBeInTheDocument();
    expect(screen.getByText('1 filtro activo')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Limpiar' }));
    expect(screen.getByText('Informe')).toBeInTheDocument();
  });

  test('elimina con confirmacion y se puede deshacer', async () => {
    setup();
    await screen.findByText('Informe');
    await userEvent.click(screen.getByRole('button', { name: 'Eliminar Informe' }));
    const dialog = await screen.findByRole('alertdialog');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Eliminar' }));
    await waitFor(() => expect(screen.queryByText('Informe')).not.toBeInTheDocument());

    await userEvent.click(await screen.findByRole('button', { name: /deshacer/i }));
    expect(await screen.findByText('Informe')).toBeInTheDocument();
  });
});
