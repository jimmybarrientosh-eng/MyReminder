import { getTodayEvents, getTodayProgress, getTomorrowEvents } from '../utils/today';

const at = (day, hour) => new Date(2026, 10, day, hour, 0).toISOString();
const events = [
  { id: 'c', start_at: at(25, 18) },
  { id: 'a', start_at: at(25, 9) },
  { id: 'b', start_at: at(25, 13) },
  { id: 'd', start_at: at(26, 8) },
];
const now = new Date(2026, 10, 25, 12, 0);

describe('agenda de hoy', () => {
  test('filtra los eventos de hoy y los ordena por hora', () => {
    expect(getTodayEvents(events, now).map((e) => e.id)).toEqual(['a', 'b', 'c']);
  });

  test('separa los eventos de manana', () => {
    expect(getTomorrowEvents(events, now).map((e) => e.id)).toEqual(['d']);
  });

  test('calcula progreso y siguiente evento', () => {
    const progress = getTodayProgress(events, now);
    expect(progress).toMatchObject({ total: 3, done: 1, pending: 2, percent: 33 });
    expect(progress.next.id).toBe('b');
  });

  test('sin eventos hoy no hay progreso ni siguiente', () => {
    expect(getTodayProgress([], now)).toMatchObject({ total: 0, percent: 0, next: null });
  });
});
