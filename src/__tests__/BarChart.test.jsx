// Pruebas de BarChart con Jest y React Testing Library
import { screen } from '@testing-library/react';
import BarChart from '../components/BarChart';
import { renderWithProviders } from '../test-utils';

const data = [
  { key: 'a', label: 'lun', value: 2, isToday: true },
  { key: 'b', label: 'mar', value: 0, isToday: false },
];

describe('BarChart', () => {
  test('describe los datos para lectores de pantalla', () => {
    renderWithProviders(<BarChart data={data} label="Eventos por dia" />);
    expect(screen.getByRole('img', { name: 'Eventos por dia: lun 2, mar 0' })).toBeInTheDocument();
  });

  test('muestra el valor y la etiqueta de cada dia', () => {
    renderWithProviders(<BarChart data={data} label="Eventos por dia" />);
    expect(screen.getByText('lun')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
