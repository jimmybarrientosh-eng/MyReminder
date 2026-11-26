// Pruebas de LoadError con Jest y React Testing Library
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoadError from '../components/LoadError';
import { renderWithProviders } from '../test-utils';

describe('LoadError', () => {
  test('explica el problema y permite reintentar', async () => {
    const onRetry = jest.fn();
    renderWithProviders(<LoadError onRetry={onRetry} />);
    expect(screen.getByText('No pudimos cargar tus eventos')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Reintentar' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
