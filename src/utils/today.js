import { dayKey } from './dates';

const byStart = (a, b) => new Date(a.start_at) - new Date(b.start_at);
const stripAccents = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const shiftDay = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

export function eventsOnDay(events, date) {
  const key = dayKey(date);
  return events.filter((e) => dayKey(e.start_at) === key).sort(byStart);
}

export const getTodayEvents = (events, now = new Date()) => eventsOnDay(events, now);
export const getTomorrowEvents = (events, now = new Date()) => eventsOnDay(events, shiftDay(now, 1));

export function getTodayProgress(events, now = new Date()) {
  const today = eventsOnDay(events, now);
  const done = today.filter((e) => new Date(e.start_at) <= now).length;
  const next = today.find((e) => new Date(e.start_at) > now) || null;
  return {
    total: today.length,
    done,
    pending: today.length - done,
    percent: today.length ? Math.round((done / today.length) * 100) : 0,
    next,
  };
}

// Sin tildes, como el resto de los textos de la app (la ñ no aparece en dias ni meses).
export const formatLongDate = (date = new Date()) =>
  stripAccents(date.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' }));

export const formatTime = (iso) => new Date(iso).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
