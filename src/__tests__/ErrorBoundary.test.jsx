// Pruebas de ErrorBoundary con Jest y React Testing Library
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import ErrorBoundary from '../components/ErrorBoundary';

const Boom = () => {
  throw new Error('fallo de prueba');
};

describe('ErrorBoundary', () => {
  test('muestra una pantalla amable cuando un componente falla', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ChakraProvider>
        <ErrorBoundary>
          <Boom />
        </ErrorBoundary>
      </ChakraProvider>
    );
    expect(screen.getByText('Algo salio mal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Recargar' })).toBeInTheDocument();
    spy.mockRestore();
  });

  test('si no hay error, muestra el contenido normal', () => {
    render(
      <ChakraProvider>
        <ErrorBoundary>
          <p>Todo bien</p>
        </ErrorBoundary>
      </ChakraProvider>
    );
    expect(screen.getByText('Todo bien')).toBeInTheDocument();
  });
});
