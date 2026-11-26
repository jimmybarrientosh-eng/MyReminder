import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthForm from '../components/AuthForm';
import { renderWithProviders } from '../test-utils';

describe('AuthForm', () => {
  test('login: valida correo y contrasena', async () => {
    const onSubmit = jest.fn();
    renderWithProviders(<AuthForm mode="login" onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText('Correo'), 'correo-malo');
    await userEvent.type(screen.getByLabelText('Contrasena'), '123');
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesion' }));
    expect(screen.getByText('Escribe un correo valido')).toBeInTheDocument();
    expect(screen.getByText('Minimo 6 caracteres')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('login: envia los datos cuando son validos', async () => {
    const onSubmit = jest.fn();
    renderWithProviders(<AuthForm mode="login" onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText('Correo'), 'ana@correo.com');
    await userEvent.type(screen.getByLabelText('Contrasena'), 'secreto1');
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar sesion' }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ email: 'ana@correo.com', password: 'secreto1' }));
  });

  test('registro: exige nombre y que las contrasenas coincidan', async () => {
    const onSubmit = jest.fn();
    renderWithProviders(<AuthForm mode="register" onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText('Correo'), 'ana@correo.com');
    await userEvent.type(screen.getByLabelText('Contrasena'), 'secreto1');
    await userEvent.type(screen.getByLabelText('Repite la contrasena'), 'otra-cosa');
    await userEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }));
    expect(screen.getByText('Escribe tu nombre')).toBeInTheDocument();
    expect(screen.getByText('Las contrasenas no coinciden')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('muestra el error que llega del servidor', () => {
    renderWithProviders(<AuthForm mode="login" onSubmit={() => {}} error="Correo o contrasena incorrectos" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Correo o contrasena incorrectos');
  });
});
