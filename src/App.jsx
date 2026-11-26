import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import ErrorBoundary from './components/ErrorBoundary';
import FullPageLoader from './components/FullPageLoader';
import PublicLayout from './components/PublicLayout';
import ThemeToggleFab from './components/ThemeToggleFab';
import { GuestOnly, RequireAuth } from './components/RouteGuards';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const TodayPage = lazy(() => import('./pages/TodayPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const EventFormPage = lazy(() => import('./pages/EventFormPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<GuestOnly><LoginPage /></GuestOnly>} />
            <Route path="registro" element={<GuestOnly><RegisterPage /></GuestOnly>} />
          </Route>

          <Route path="app" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
            <Route index element={<TodayPage />} />
            <Route path="resumen" element={<DashboardPage />} />
            <Route path="eventos" element={<EventsPage />} />
            <Route path="eventos/nuevo" element={<EventFormPage />} />
            <Route path="eventos/:id/editar" element={<EventFormPage />} />
            <Route path="calendario" element={<CalendarPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ThemeToggleFab />
    </ErrorBoundary>
  );
}
