// Pruebas de CalendarView con Jest y React Testing Library
import { screen } from '@testing-library/react';
import CalendarView from '../components/CalendarView';
import { renderWithProviders } from '../test-utils';

describe('CalendarView', () => {
  test('muestra el skeleton mientras carga', () => {
    renderWithProviders(<CalendarView events={[]} loading />);
    expect(screen.getByTestId('calendar-skeleton')).toBeInTheDocument();
  });

  test('muestra en el mes actual un evento de hoy', () => {
    const noon = new Date();
    noon.setHours(12, 0, 0, 0);
    const events = [{ id: '1', title: 'Almuerzo', category: 'personal', start_at: noon.toISOString() }];
    renderWithProviders(<CalendarView events={events} loading={false} />);
    expect(screen.getByText('Almuerzo')).toBeInTheDocument();
  });
});
