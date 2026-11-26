// Pruebas de stats con Jest y React Testing Library
import { computeStats } from '../utils/stats';

const now = new Date(2030, 0, 10, 12, 0);
const at = (day, hour) => new Date(2030, 0, day, hour).toISOString();

const events = [
  { id: '1', title: 'Pasado', category: 'trabajo', start_at: at(9, 10), reminder_minutes: 0 },
  { id: '2', title: 'Hoy tarde', category: 'personal', start_at: at(10, 18), reminder_minutes: 15 },
  { id: '3', title: 'Sabado manana', category: 'reuniones', start_at: at(12, 9), reminder_minutes: 0 },
  { id: '4', title: 'Sabado tarde', category: 'reuniones', start_at: at(12, 15), reminder_minutes: 0 },
  { id: '5', title: 'Lejano', category: 'trabajo', start_at: at(25, 10), reminder_minutes: 0 },
];

describe('computeStats', () => {
  const stats = computeStats(events, now);

  test('cuenta totales, proximos y pasados', () => {
    expect(stats.total).toBe(5);
    expect(stats.upcoming).toBe(4);
    expect(stats.past).toBe(1);
  });

  test('cuenta los eventos de hoy, de la semana y con recordatorio', () => {
    expect(stats.today).toBe(1);
    expect(stats.week).toBe(3);
    expect(stats.withReminder).toBe(1);
  });

  test('agrupa por categoria', () => {
    expect(stats.byCategory).toEqual({ trabajo: 2, personal: 1, reuniones: 2 });
  });

  test('arma los 7 dias empezando hoy', () => {
    expect(stats.days).toHaveLength(7);
    expect(stats.days[0]).toMatchObject({ label: 'jue', isToday: true, value: 1 });
    expect(stats.days[2]).toMatchObject({ label: 'sab', value: 2 });
  });

  test('lista los proximos en orden', () => {
    expect(stats.nextEvents.map((e) => e.id)).toEqual(['2', '3', '4', '5']);
  });

  test('funciona sin eventos', () => {
    const empty = computeStats([], now);
    expect(empty.total).toBe(0);
    expect(empty.nextEvents).toEqual([]);
  });
});
