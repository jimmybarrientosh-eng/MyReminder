import { supabase } from '../lib/supabase';

export const isDemoMode = !supabase;

const toUser = (u) =>
  u ? { id: u.id, email: u.email, name: u.user_metadata?.name || u.name || u.email.split('@')[0] } : null;

const MESSAGES = {
  'Invalid login credentials': 'Correo o contrasena incorrectos',
  'User already registered': 'Ese correo ya esta registrado',
  'Email not confirmed': 'Confirma tu correo antes de iniciar sesion',
};
const friendly = (msg = '') =>
  MESSAGES[msg] || (/password/i.test(msg) ? 'La contraseña debe tener al menos 6 caracteres' : 'No pudimos completar la accion. Intentalo de nuevo.');

const remote = {
  async current() {
    const { data } = await supabase.auth.getSession();
    return toUser(data.session?.user);
  },
  async signUp({ name, email, password }) {
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    if (error) throw new Error(friendly(error.message));
    return { user: toUser(data.session?.user), needsConfirmation: !data.session };
  },
  async signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(friendly(error.message));
    return toUser(data.user);
  },
  async signOut() {
    await supabase.auth.signOut();
  },
  onChange(cb) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => cb(toUser(session?.user)));
    return () => data.subscription.unsubscribe();
  },
};

const USERS = 'mr_users';
const SESSION = 'mr_session';
const readUsers = () => JSON.parse(localStorage.getItem(USERS) || '[]');
const hash = async (text) =>
  crypto.subtle
    ? [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)))].map((b) => b.toString(16).padStart(2, '0')).join('')
    : text;
const listeners = new Set();
const setSession = (user) => {
  if (user) localStorage.setItem(SESSION, JSON.stringify(user));
  else localStorage.removeItem(SESSION);
  listeners.forEach((cb) => cb(user));
};

const local = {
  async current() {
    return JSON.parse(localStorage.getItem(SESSION) || 'null');
  },
  async signUp({ name, email, password }) {
    const users = readUsers();
    const mail = email.trim().toLowerCase();
    if (users.some((u) => u.email === mail)) throw new Error('Ese correo ya esta registrado');
    const user = { id: crypto.randomUUID?.() ?? String(Date.now()), email: mail, name };
    localStorage.setItem(USERS, JSON.stringify([...users, { ...user, password: await hash(password) }]));
    setSession(user);
    return { user, needsConfirmation: false };
  },
  async signIn({ email, password }) {
    const hashed = await hash(password);
    const found = readUsers().find((u) => u.email === email.trim().toLowerCase() && u.password === hashed);
    if (!found) throw new Error('Correo o contraseña incorrectos');
    const { password: _omit, ...user } = found;
    setSession(user);
    return user;
  },
  async signOut() {
    setSession(null);
  },
  onChange(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
};

const impl = supabase ? remote : local;
export const getCurrentUser = () => impl.current();
export const signUp = (data) => impl.signUp(data);
export const signIn = (data) => impl.signIn(data);
export const signOut = () => impl.signOut();
export const onAuthChange = (cb) => impl.onChange(cb);
