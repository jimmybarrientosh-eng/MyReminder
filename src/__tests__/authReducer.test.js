// Pruebas de authReducer con Jest y React Testing Library
import { authReducer, initialAuthState } from '../context/authReducer';

describe('authReducer', () => {
  test('empieza cargando y sin usuario', () => {
    expect(initialAuthState).toEqual({ user: null, loading: true });
  });

  test('SET_USER guarda el usuario y termina de cargar', () => {
    const user = { id: '1', email: 'a@b.com', name: 'Ana' };
    expect(authReducer(initialAuthState, { type: 'SET_USER', payload: user })).toEqual({ user, loading: false });
  });

  test('SET_USER con null cierra la sesion', () => {
    const state = authReducer({ user: { id: '1' }, loading: false }, { type: 'SET_USER', payload: null });
    expect(state.user).toBeNull();
  });
});
