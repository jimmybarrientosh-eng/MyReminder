import { useEffect, useRef, useState } from 'react';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, Stack, Textarea } from '@chakra-ui/react';
import { CATEGORIES, REMINDER_OPTIONS } from '../utils/constants';

const EMPTY = { title: '', description: '', category: 'trabajo', start_at: '', reminder_minutes: 0 };

export default function EventForm({ initialValues, onSubmit, onCancel, isSaving = false, submitLabel = 'Guardar evento' }) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (initialValues) setValues({ ...EMPTY, ...initialValues });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!values.title.trim()) errs.title = 'Escribe un titulo';
    if (!values.start_at) errs.start_at = 'Elige fecha y hora';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
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
          <FormLabel htmlFor="title">Titulo</FormLabel>
          <Input id="title" name="title" ref={titleRef} placeholder="Ej: Reunion con el equipo" maxLength={80} value={values.title} onChange={handleChange} />
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Descripcion</FormLabel>
          <Textarea id="description" name="description" maxLength={300} value={values.description} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="category">Categoria</FormLabel>
          <Select id="category" name="category" value={values.category} onChange={handleChange}>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </Select>
        </FormControl>
        <FormControl isInvalid={!!errors.start_at}>
          <FormLabel htmlFor="start_at">Fecha y hora</FormLabel>
          <Input id="start_at" name="start_at" type="datetime-local" value={values.start_at} onChange={handleChange} />
          <FormErrorMessage>{errors.start_at}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="reminder_minutes">Recordatorio</FormLabel>
          <Select id="reminder_minutes" name="reminder_minutes" value={values.reminder_minutes} onChange={handleChange}>
            {REMINDER_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </FormControl>
        <Flex gap={3}>
          <Button type="submit" colorScheme="brand" isLoading={isSaving} loadingText="Guardando">{submitLabel}</Button>
          {onCancel && <Button variant="ghost" onClick={onCancel} isDisabled={isSaving}>Cancelar</Button>}
        </Flex>
      </Stack>
    </form>
  );
}
