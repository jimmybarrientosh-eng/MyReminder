// Pruebas de pagination con Jest y React Testing Library
import { getPageItems } from '../utils/pagination';

describe('getPageItems', () => {
  test('muestra todas las paginas si son pocas', () => {
    expect(getPageItems(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  test('usa puntos suspensivos en recorridos largos', () => {
    expect(getPageItems(1, 8)).toEqual([1, 2, '…', 8]);
    expect(getPageItems(5, 10)).toEqual([1, '…', 4, 5, 6, '…', 10]);
    expect(getPageItems(10, 10)).toEqual([1, '…', 9, 10]);
  });
});
