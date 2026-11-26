import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { authReducer, initialAuthState } from './authReducer';
import * as auth from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    let active = true;
    const setUser = (user) => active && dispatch({ type: 'SET_USER', payload: user });
    auth.getCurrentUser().then(setUser).catch(() => setUser(null));
    const unsubscribe = auth.onAuthChange(setUser);
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const user = await auth.signIn(credentials);
    dispatch({ type: 'SET_USER', payload: user });
  }, []);

  const register = useCallback(async (data) => {
    const result = await auth.signUp(data);
    if (result.user) dispatch({ type: 'SET_USER', payload: result.user });
    return result;
  }, []);

  const logout = useCallback(async () => {
    await auth.signOut();
    dispatch({ type: 'SET_USER', payload: null });
  }, []);

  const value = useMemo(() => ({ ...state, login, register, logout }), [state, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
