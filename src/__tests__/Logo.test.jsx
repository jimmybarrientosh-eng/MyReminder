// Pruebas de Logo con Jest y React Testing Library
import { screen } from '@testing-library/react';
import Logo from '../components/Logo';
import { renderWithProviders } from '../test-utils';

describe('Logo', () => {
  test('muestra el nombre y el eslogan', () => {
    renderWithProviders(<Logo showSlogan />);
    expect(screen.getByText('MyReminder')).toBeInTheDocument();
    expect(screen.getByText('Lo importante, a tiempo.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /logo de myreminder/i })).toBeInTheDocument();
  });
});
