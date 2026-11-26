// Pruebas de CategoryBars con Jest y React Testing Library
import { screen } from '@testing-library/react';
import CategoryBars from '../components/CategoryBars';
import { renderWithProviders } from '../test-utils';

describe('CategoryBars', () => {
  test('calcula el porcentaje de cada categoria', () => {
    renderWithProviders(<CategoryBars counts={{ trabajo: 2, personal: 1, reuniones: 1 }} />);
    expect(screen.getByRole('progressbar', { name: 'Trabajo' })).toHaveAttribute('aria-valuenow', '50');
    expect(screen.getByRole('progressbar', { name: 'Personal' })).toHaveAttribute('aria-valuenow', '25');
  });

  test('con cero eventos muestra 0%', () => {
    renderWithProviders(<CategoryBars counts={{ trabajo: 0, personal: 0, reuniones: 0 }} />);
    expect(screen.getByRole('progressbar', { name: 'Trabajo' })).toHaveAttribute('aria-valuenow', '0');
  });
});
