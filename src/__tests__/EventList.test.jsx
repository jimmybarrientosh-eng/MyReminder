// Pruebas de EventList con Jest y React Testing Library
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventList from '../components/EventList';
import { renderWithProviders } from '../test-utils';

const events = [
  { id: '1', title: 'Informe', category: 'trabajo', start_at: '2030-01-15T10:00:00.000Z', reminder_minutes: 0 },
  { id: '2', title: 'Cumpleaños', category: 'personal', start_at: '2030-02-01T18:00:00.000Z', reminder_minutes: 15 },
];

describe('EventList', () => {
  test('muestra el skeleton mientras carga', () => {
    renderWithProviders(<EventList events={[]} loading onDelete={() => {}} />);
    expect(screen.getByTestId('events-skeleton')).toBeInTheDocument();
  });

  test('muestra el estado vacio con boton para crear', () => {
    renderWithProviders(<EventList events={[]} loading={false} onDelete={() => {}} />);
    expect(screen.getByText(/todavia no tienes eventos/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /crear evento/i })).toBeInTheDocument();
  });

  test('muestra un mensaje distinto cuando los filtros no encuentran nada', () => {
    renderWithProviders(<EventList events={[]} loading={false} onDelete={() => {}} isFiltered />);
    expect(screen.getByText(/ningun evento coincide/i)).toBeInTheDocument();
  });

  test('pide confirmacion antes de eliminar', async () => {
    const onDelete = jest.fn();
    renderWithProviders(<EventList events={events} loading={false} onDelete={onDelete} />);
    expect(screen.getByText('Informe')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Eliminar Cumpleaños' }));
    expect(onDelete).not.toHaveBeenCalled();

    const dialog = await screen.findByRole('alertdialog');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Eliminar' }));
    expect(onDelete).toHaveBeenCalledWith(events[1]);
  });
});
