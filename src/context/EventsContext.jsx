import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { eventsReducer, initialState } from './eventsReducer';
import * as api from '../services/eventsService';

export const EventsContext = createContext(null);

export function EventsProvider({ userId, children }) {
  const [state, dispatch] = useReducer(eventsReducer, initialState);

  const load = useCallback(async (isCancelled = () => false) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await api.listEvents(userId);
      if (!isCancelled()) dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      if (!isCancelled()) dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  }, [userId]);

  useEffect(() => {
    let cancelled = false;
    load(() => cancelled);
    return () => {
      cancelled = true;
    };
  }, [load]);

  const reload = useCallback(() => load(), [load]);

  const sync = useCallback(async () => {
    const sent = await api.syncPending(userId);
    if (sent) await load();
    return sent;
  }, [userId, load]);

  const addEvent = useCallback(async (event) => {
    const created = await api.createEvent(userId, event);
    dispatch({ type: 'ADD', payload: created });
  }, [userId]);

  const editEvent = useCallback(async (id, changes) => {
    const updated = await api.updateEvent(userId, id, changes);
    dispatch({ type: 'UPDATE', payload: updated });
  }, [userId]);

  const removeEvent = useCallback(async (id) => {
    await api.deleteEvent(userId, id);
    dispatch({ type: 'DELETE', payload: id });
  }, [userId]);

  const value = useMemo(
    () => ({ ...state, reload, sync, addEvent, editEvent, removeEvent }),
    [state, reload, sync, addEvent, editEvent, removeEvent]
  );

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}
