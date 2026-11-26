import { useState } from 'react';
import { Alert, AlertIcon, Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';
import { EyeIcon, EyeOffIcon } from './NavIcons';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({ mode, onSubmit, isSaving = false, error = null }) {
  const isRegister = mode === 'register';
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (isRegister && !values.name.trim()) errs.name = 'Escribe tu nombre';
    if (!EMAIL.test(values.email.trim())) errs.email = 'Escribe un correo valido';
    if (values.password.length < 6) errs.password = 'Minimo 6 caracteres';
    if (isRegister && values.confirm !== values.password) errs.confirm = 'Las contrasenas no coinciden';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit({ name: values.name.trim(), email: values.email.trim(), password: values.password });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={4}>
        {error && <Alert status="error" borderRadius="xl" role="alert"><AlertIcon />{error}</Alert>}
        {isRegister && (
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input id="name" name="name" autoComplete="name" value={values.name} onChange={handleChange} />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
        )}
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Correo</FormLabel>
          <Input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Contrasena</FormLabel>
          <InputGroup>
            <Input id="password" name="password" type={showPassword ? 'text' : 'password'} pr="2.75rem"
              autoComplete={isRegister ? 'new-password' : 'current-password'} value={values.password} onChange={handleChange} />
            <InputRightElement width="2.75rem">
              <IconButton size="sm" variant="ghost" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                icon={showPassword ? <EyeOffIcon boxSize={5} /> : <EyeIcon boxSize={5} />} />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        {isRegister && (
          <FormControl isInvalid={!!errors.confirm}>
            <FormLabel htmlFor="confirm">Repite la contrasena</FormLabel>
            <Input id="confirm" name="confirm" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={values.confirm} onChange={handleChange} />
            <FormErrorMessage>{errors.confirm}</FormErrorMessage>
          </FormControl>
        )}
        <Button type="submit" colorScheme="brand" size="lg" isLoading={isSaving} loadingText={isRegister ? 'Creando cuenta' : 'Entrando'}>
          {isRegister ? 'Crear cuenta' : 'Iniciar sesion'}
        </Button>
      </Stack>
    </form>
  );
}