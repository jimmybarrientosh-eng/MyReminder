export const initialState = { events: [], loading: true, error: null };

export function eventsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { events: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE':
      return { ...state, events: state.events.map((e) => (e.id === action.payload.id ? action.payload : e)) };
    case 'DELETE':
      return { ...state, events: state.events.filter((e) => e.id !== action.payload) };
    default:
      return state;
  }
}
