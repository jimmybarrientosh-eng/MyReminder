export const CATEGORIES = [
  { value: 'trabajo', label: 'Trabajo', color: 'glacier' },
  { value: 'personal', label: 'Personal', color: 'gray' },
  { value: 'reuniones', label: 'Reuniones', color: 'brand' },
];

export const REMINDER_OPTIONS = [
  { value: 0, label: 'Sin recordatorio' },
  { value: 5, label: '5 minutos antes' },
  { value: 15, label: '15 minutos antes' },
  { value: 30, label: '30 minutos antes' },
  { value: 60, label: '1 hora antes' },
  { value: 1440, label: '1 dia antes' },
];

export const PAGE_SIZE = 5;

export const getCategory = (value) => CATEGORIES.find((c) => c.value === value) || CATEGORIES[0];
