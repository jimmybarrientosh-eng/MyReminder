import { useState } from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AuthShell from '../components/AuthShell';
import { useAuth } from '../hooks/useAuth';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function LoginPage() {
  useDocumentTitle('Iniciar sesion');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data) => {
    setSaving(true);
    setError(null);
    try {
      await login(data);
      navigate(location.state?.from?.pathname || '/app', { replace: true });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <AuthShell title="Bienvenido de vuelta" subtitle="Entra para ver tu agenda."
      footer={<>Aun no tienes cuenta? <ChakraLink as={Link} to="/registro" color="brand.600" fontWeight="600">Crea una gratis</ChakraLink></>}>
      <AuthForm mode="login" onSubmit={handleSubmit} isSaving={saving} error={error} />
    </AuthShell>
  );
}
