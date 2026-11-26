// Pruebas de useDebounce con Jest y React Testing Library
import { act, renderHook } from '@testing-library/react';
import { useDebounce } from '../hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test('actualiza el valor solo despues del retraso', () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), { initialProps: { v: 'a' } });
    rerender({ v: 'ab' });
    expect(result.current).toBe('a');
    act(() => jest.advanceTimersByTime(300));
    expect(result.current).toBe('ab');
  });
});
