// Pruebas de dates con Jest y React Testing Library
import { getGreeting, timeUntil } from '../utils/dates';

describe('getGreeting', () => {
  test('cambia segun la hora', () => {
    expect(getGreeting(new Date(2030, 0, 1, 9))).toBe('Buenos dias');
    expect(getGreeting(new Date(2030, 0, 1, 15))).toBe('Buenas tardes');
    expect(getGreeting(new Date(2030, 0, 1, 22))).toBe('Buenas noches');
  });
});

describe('timeUntil', () => {
  const now = new Date(2030, 0, 1, 10, 0);
  const at = (mins) => new Date(now.getTime() + mins * 60000).toISOString();

  test('minutos, horas y dias', () => {
    expect(timeUntil(at(25), now)).toBe('en 25 min');
    expect(timeUntil(at(180), now)).toBe('en 3 h');
    expect(timeUntil(at(24 * 60), now)).toBe('mañana');
    expect(timeUntil(at(4 * 24 * 60), now)).toBe('en 4 dias');
  });

  test('si ya empezo dice ahora', () => {
    expect(timeUntil(at(-5), now)).toBe('ahora');
  });
});
