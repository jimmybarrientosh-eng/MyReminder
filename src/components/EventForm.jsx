
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { CATEGORIES, REMINDER_OPTIONS } from '../utils/constants';

const EMPTY = {
  title: '',
  description: '',
  category: 'trabajo',
  start_at: '',
  reminder_minutes: 0,
};

function CharacterCounter({ value, max }) {
  return (
    <Text fontSize="xs" color="gray.500" textAlign="right" mt={1}>
      {value.length}/{max}
    </Text>
  );
}

export default function EventForm({
  initialValues,
  onSubmit,
  onCancel,
  isSaving = false,
  submitLabel = 'Guardar evento',
}) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (initialValues) {
      setValues({ ...EMPTY, ...initialValues });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!values.title.trim()) {
      errs.title = 'Escribe un título';
    } else if (values.title.trim().length > 80) {
      errs.title = 'El título no puede superar los 80 caracteres';
    }

    if (values.description.length > 300) {
      errs.description = 'La descripción no puede superar los 300 caracteres';
    }

    if (!values.start_at) {
      errs.start_at = 'Elige fecha y hora';
    } else {
      const selectedDate = new Date(values.start_at);
      const [datePart, timePart] = values.start_at.split('T');
      const [year, month, day] = (datePart || '').split('-').map(Number);
      const [hour, minute] = (timePart || '').split(':').map(Number);

      const validDate =
        Number.isFinite(selectedDate.getTime()) &&
        year >= 2026 &&
        year <= 9999 &&
        month >= 1 && month <= 12 &&
        day >= 1 && day <= 31 &&
        hour >= 0 && hour <= 23 &&
        minute >= 0 && minute <= 59 &&
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() + 1 === month &&
        selectedDate.getDate() === day;

      if (!validDate) {
        errs.start_at = 'Ingresa una fecha y hora válidas';
      } else if (selectedDate < new Date()) {
        errs.start_at = 'No puedes crear un recordatorio en el pasado';
      }
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category,
      reminder_minutes: Number(values.reminder_minutes),
      start_at: new Date(values.start_at).toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={4} bg="white" p={6} borderRadius="xl" borderWidth="1px">
        <FormControl isInvalid={!!errors.title}>
          <FormLabel htmlFor="title">Título</FormLabel>
          <Input
            id="title"
            name="title"
            ref={titleRef}
            placeholder="Ej: Reunión con el equipo"
            maxLength={80}
            value={values.title}
            onChange={handleChange}
          />
          <CharacterCounter value={values.title} max={80} />
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">Descripción</FormLabel>
          <Textarea
            id="description"
            name="description"
            maxLength={300}
            value={values.description}
            onChange={handleChange}
          />
          <CharacterCounter value={values.description} max={300} />
          <FormErrorMessage>{errors.description}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="category">Categoría</FormLabel>
          <Select
            id="category"
            name="category"
            value={values.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isInvalid={!!errors.start_at}>
          <FormLabel htmlFor="start_at">Fecha y hora</FormLabel>
          <Input
            id="start_at"
            name="start_at"
            type="datetime-local"
            value={values.start_at}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.start_at}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="reminder_minutes">Recordatorio</FormLabel>
          <Select
            id="reminder_minutes"
            name="reminder_minutes"
            value={values.reminder_minutes}
            onChange={handleChange}
          >
            {REMINDER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </FormControl>

        <Flex gap={3}>
          <Button
            type="submit"
            colorScheme="brand"
            isLoading={isSaving}
            loadingText="Guardando"
          >
            {submitLabel}
          </Button>

          {onCancel && (
            <Button
              variant="ghost"
              onClick={onCancel}
              isDisabled={isSaving}
            >
              Cancelar
            </Button>
          )}
        </Flex>
      </Stack>
    </form>
  );
}
