import { useEffect, useRef } from 'react';
import { useNotify } from './useNotify';
import { formatDateTime } from '../utils/dates';

export function useReminders(events) {
  const notify = useNotify();
  const notified = useRef(new Set());

  useEffect(() => {
    const check = () => {
      const now = Date.now();
      events.forEach((e) => {
        if (!e.reminder_minutes) return;
        const start = new Date(e.start_at).getTime();
        const remindAt = start - e.reminder_minutes * 60000;
        const key = `${e.id}-${e.reminder_minutes}-${e.start_at}`;
        if (now >= remindAt && now < start && !notified.current.has(key)) {
          notified.current.add(key);
          notify({ title: `Recordatorio: ${e.title}`, description: `Empieza ${formatDateTime(e.start_at)}`, duration: 10000 });
        }
      });
    };
    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, [events, notify]);
}
