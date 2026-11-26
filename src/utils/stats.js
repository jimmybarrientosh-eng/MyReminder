import { CATEGORIES } from './constants';
import { dayKey } from './dates';

const WEEKDAYS = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
const byDate = (a, b) => new Date(a.start_at) - new Date(b.start_at);

export function computeStats(events, now = new Date()) {
  const upcoming = events.filter((e) => new Date(e.start_at) > now).sort(byDate);

  const byCategory = Object.fromEntries(CATEGORIES.map((c) => [c.value, 0]));
  events.forEach((e) => {
    if (e.category in byCategory) byCategory[e.category] += 1;
  });

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    return { key: dayKey(d), label: WEEKDAYS[d.getDay()], isToday: i === 0, value: 0 };
  });
  const position = Object.fromEntries(days.map((d, i) => [d.key, i]));
  events.forEach((e) => {
    const i = position[dayKey(e.start_at)];
    if (i !== undefined) days[i].value += 1;
  });

  return {
    total: events.length,
    upcoming: upcoming.length,
    past: events.length - upcoming.length,
    today: days[0].value,
    week: days.reduce((sum, d) => sum + d.value, 0),
    withReminder: events.filter((e) => e.reminder_minutes > 0).length,
    byCategory,
    days,
    nextEvents: upcoming.slice(0, 5),
  };
}
