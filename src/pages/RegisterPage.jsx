import { useState } from 'react';
import { Alert, AlertIcon, Link as ChakraLink } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AuthShell from '../components/AuthShell';
import { useAuth } from '../hooks/useAuth';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function RegisterPage() {
  useDocumentTitle('Crear cuenta');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const handleSubmit = async (data) => {
    setSaving(true);
    setError(null);
    try {
      const result = await register(data);
      if (result.needsConfirmation) {
        setNeedsConfirmation(true);
        setSaving(false);
      } else {
        navigate('/app', { replace: true });
      }
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <AuthShell title="Crea tu cuenta" subtitle="Empieza a organizar tus eventos en menos de un minuto."
      footer={<>Ya tienes cuenta? <ChakraLink as={Link} to="/login" color="brand.600" fontWeight="600">Inicia sesion</ChakraLink></>}>
      {needsConfirmation ? (
        <Alert status="success" borderRadius="xl" alignItems="flex-start">
          <AlertIcon />
          Te enviamos un correo para confirmar tu cuenta. Confirmalo y luego inicia sesion.
        </Alert>
      ) : (
        <AuthForm mode="register" onSubmit={handleSubmit} isSaving={saving} error={error} />
      )}
    </AuthShell>
  );
}
