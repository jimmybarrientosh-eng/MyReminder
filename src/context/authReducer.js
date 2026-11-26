export const initialAuthState = { user: null, loading: true };

export function authReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { user: action.payload, loading: false };
    default:
      return state;
  }
}
