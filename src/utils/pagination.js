const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

export function getPageItems(page, total) {
  if (total <= 7) return range(1, total);
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  const items = [1];
  if (start > 2) items.push('…');
  items.push(...range(start, end));
  if (end < total - 1) items.push('…');
  items.push(total);
  return items;
}
