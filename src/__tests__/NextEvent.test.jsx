// Pruebas de NextEvent con Jest y React Testing Library
import { screen } from '@testing-library/react';
import NextEvent from '../components/NextEvent';
import { renderWithProviders } from '../test-utils';

const inHours = (h) => new Date(Date.now() + h * 3600000).toISOString();

describe('NextEvent', () => {
  test('muestra el evento mas cercano y cuanto falta', () => {
    const events = [
      { id: '1', title: 'Lejano', start_at: inHours(50) },
      { id: '2', title: 'Reunion', start_at: inHours(3) },
    ];
    renderWithProviders(<NextEvent events={events} loading={false} />);
    expect(screen.getByText('Reunion, en 3 h')).toBeInTheDocument();
  });

  test('si todo ya paso, lo dice con buen tono', () => {
    renderWithProviders(<NextEvent events={[{ id: '1', title: 'Viejo', start_at: inHours(-5) }]} loading={false} />);
    expect(screen.getByText(/nada pendiente/i)).toBeInTheDocument();
  });

  test('no muestra nada si no hay eventos', () => {
    const { container } = renderWithProviders(<NextEvent events={[]} loading={false} />);
    expect(container).toBeEmptyDOMElement();
  });
});
