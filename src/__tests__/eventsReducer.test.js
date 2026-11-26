// Pruebas de eventsReducer con Jest y React Testing Library
import { eventsReducer, initialState } from '../context/eventsReducer';

const ev = { id: '1', title: 'Reunion' };

describe('eventsReducer', () => {
  test('FETCH_SUCCESS guarda los eventos y quita el loading', () => {
    const state = eventsReducer(initialState, { type: 'FETCH_SUCCESS', payload: [ev] });
    expect(state.events).toEqual([ev]);
    expect(state.loading).toBe(false);
  });

  test('ADD agrega un evento', () => {
    const state = eventsReducer({ ...initialState, events: [] }, { type: 'ADD', payload: ev });
    expect(state.events).toHaveLength(1);
  });

  test('UPDATE reemplaza el evento con el mismo id', () => {
    const state = eventsReducer({ ...initialState, events: [ev] }, { type: 'UPDATE', payload: { ...ev, title: 'Nuevo' } });
    expect(state.events[0].title).toBe('Nuevo');
  });

  test('DELETE elimina por id', () => {
    const state = eventsReducer({ ...initialState, events: [ev] }, { type: 'DELETE', payload: '1' });
    expect(state.events).toHaveLength(0);
  });
});
