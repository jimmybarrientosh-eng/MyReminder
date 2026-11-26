// Pruebas de Pagination con Jest y React Testing Library
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import Pagination from '../components/Pagination';

const setup = (props) => render(<ChakraProvider><Pagination {...props} /></ChakraProvider>);

describe('Pagination', () => {
  test('no se muestra si hay una sola pagina', () => {
    setup({ page: 1, totalPages: 1, onChange: () => {} });
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('indica la pagina actual y cambia de pagina', async () => {
    const onChange = jest.fn();
    setup({ page: 2, totalPages: 8, onChange });
    expect(screen.getByText('Pagina 2 de 8')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pagina 2' })).toHaveAttribute('aria-current', 'page');
    await userEvent.click(screen.getByRole('button', { name: 'Pagina siguiente' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});
