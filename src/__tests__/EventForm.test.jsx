// Pruebas de EventForm con Jest y React Testing Library
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventForm from '../components/EventForm';
import { renderWithProviders } from '../test-utils';

describe('EventForm', () => {
  test('muestra errores si faltan titulo y fecha', async () => {
    const onSubmit = jest.fn();
    renderWithProviders(<EventForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole('button', { name: /guardar evento/i }));
    expect(screen.getByText('Escribe un titulo')).toBeInTheDocument();
    expect(screen.getByText('Elige fecha y hora')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('envia los datos cuando el formulario es valido', async () => {
    const onSubmit = jest.fn();
    renderWithProviders(<EventForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText(/titulo/i), 'Dentista');
    fireEvent.change(screen.getByLabelText(/fecha y hora/i), { target: { value: '2030-01-15T10:00' } });
    await userEvent.selectOptions(screen.getByLabelText(/recordatorio/i), '30');
    await userEvent.click(screen.getByRole('button', { name: /guardar evento/i }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ title: 'Dentista', reminder_minutes: 30 }));
  });

  test('en modo edicion precarga los datos y no envia id ni created_at', async () => {
    const onSubmit = jest.fn();
    const initial = { id: 'x1', created_at: '2020-01-01', title: 'Informe', start_at: '2030-01-15T10:00', category: 'trabajo' };
    renderWithProviders(<EventForm initialValues={initial} onSubmit={onSubmit} submitLabel="Guardar cambios" />);
    expect(screen.getByLabelText(/titulo/i)).toHaveValue('Informe');
    await userEvent.click(screen.getByRole('button', { name: /guardar cambios/i }));
    const sent = onSubmit.mock.calls[0][0];
    expect(sent).not.toHaveProperty('id');
    expect(sent).not.toHaveProperty('created_at');
  });

  test('el boton cancelar llama a onCancel', async () => {
    const onCancel = jest.fn();
    renderWithProviders(<EventForm onSubmit={() => {}} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});
