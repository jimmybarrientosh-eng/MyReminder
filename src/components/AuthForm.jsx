
import { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { EyeIcon, EyeOffIcon } from './NavIcons';

function CharacterCounter({ value, max }) {
  return (
    <Text fontSize="xs" color="gray.500" textAlign="right" mt={1}>
      {value.length}/{max}
    </Text>
  );
}

function PasswordStrength({ password }) {
  const checks = [
    password.length >= 6,
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  const score = checks.filter(Boolean).length;

  let label = 'Muy débil';
  let color = 'red';

  if (score >= 3) {
    label = 'Media';
    color = 'orange';
  }

  if (score >= 5) {
    label = 'Fuerte';
    color = 'green';
  }

  if (!password) {
    label = 'Escribe una contraseña';
    color = 'gray';
  }

  return (
    <Text
      fontSize="xs"
      color={`${color}.500`}
      mt={1}
      fontWeight="semibold"
    >
      Seguridad: {label}
    </Text>
  );
}

export default function AuthForm({
  mode,
  onSubmit,
  isSaving = false,
  error = null,
}) {
  const isRegister = mode === 'register';

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validateField = (name, value, currentValues = values) => {
    let message = '';

    if (name === 'name' && isRegister) {
      if (!value.trim()) {
        message = 'Escribe tu nombre';
      } else if (value.trim().length < 3) {
        message = 'El nombre debe tener al menos 3 caracteres';
      } else if (value.trim().length > 60) {
        message = 'El nombre no puede superar los 60 caracteres';
      } else if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/.test(value.trim())) {
        message = 'El nombre contiene caracteres no válidos';
      }
    }

    if (name === 'email') {
      if (!value.trim()) {
        message = 'Escribe tu correo';
      } else if (
        value.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        message = 'Escribe un correo válido';
      }
    }

    if (name === 'password') {
      if (!value) {
        message = 'Escribe una contraseña';
      } else if (value.length < 6) {
        message = 'Mínimo 6 caracteres';
      } else if (value.length > 72) {
        message = 'La contraseña no puede superar los 72 caracteres';
      } else if (/\s/.test(value)) {
        message = 'La contraseña no debe contener espacios';
      }
    }

    if (name === 'confirm' && isRegister) {
      if (!value) {
        message = 'Confirma tu contraseña';
      } else if (value !== currentValues.password) {
        message = 'Las contraseñas no coinciden';
      }
    }

    return message;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedValues = {
      ...values,
      [name]: value,
    };

    setValues(updatedValues);

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, updatedValues),
      ...(name === 'password' && isRegister
        ? {
            confirm: updatedValues.confirm
              ? validateField('confirm', updatedValues.confirm, updatedValues)
              : prev.confirm,
          }
        : {}),
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = isRegister
      ? ['name', 'email', 'password', 'confirm']
      : ['email', 'password'];

    const newErrors = {};

    fields.forEach((field) => {
      newErrors[field] = validateField(field, values[field]);
    });

    setErrors(newErrors);

    if (fields.some((field) => newErrors[field])) {
      return;
    }

    onSubmit(
      isRegister
        ? {
            name: values.name.trim(),
            email: values.email.trim(),
            password: values.password,
          }
        : {
            email: values.email.trim(),
            password: values.password,
          }
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={4}>
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {isRegister && (
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              maxLength={60}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <CharacterCounter value={values.name} max={60} />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
        )}

        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Correo</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <CharacterCounter value={values.email} max={254} />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Contraseña</FormLabel>

          <InputGroup>
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete={
                isRegister ? 'new-password' : 'current-password'
              }
              maxLength={72}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              pr="3rem"
            />

            <InputRightElement>
              <IconButton
                variant="ghost"
                size="sm"
                aria-label={
                  showPassword
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
                icon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>

          <CharacterCounter value={values.password} max={72} />

          {isRegister && (
            <PasswordStrength password={values.password} />
          )}

          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        {isRegister && (
          <FormControl isInvalid={!!errors.confirm}>
            <FormLabel htmlFor="confirm">
              Repite la contraseña
            </FormLabel>

            <InputGroup>
              <Input
                id="confirm"
                name="confirm"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                maxLength={72}
                value={values.confirm}
                onChange={handleChange}
                onBlur={handleBlur}
                pr="3rem"
              />

              <InputRightElement>
                <IconButton
                  variant="ghost"
                  size="sm"
                  aria-label={
                    showConfirm
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                  icon={showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              </InputRightElement>
            </InputGroup>

            <CharacterCounter value={values.confirm} max={72} />
            <FormErrorMessage>{errors.confirm}</FormErrorMessage>
          </FormControl>
        )}

        <Button
          type="submit"
          colorScheme="brand"
          isLoading={isSaving}
          loadingText="Procesando"
        >
          {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
        </Button>
      </Stack>
    </form>
  );
}
