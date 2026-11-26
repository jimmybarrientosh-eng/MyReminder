# MyReminder - Criterios del certificado

Proyecto elegido: **Aplicación de Gestión de Eventos y Recordatorios**.
Pruebas escritas: **50 casos en 19 archivos** (`src/__tests__`).

## 1. Requisitos técnicos

| Criterio | Cumple | Dónde está |
|---|---|---|
| React con Vite como base | ✅ | `vite.config.js`, `index.html`, `src/main.jsx` |
| React Router para navegar | ✅ | `src/App.jsx`, `src/components/RouteGuards.jsx` |
| React Context + useReducer para el estado global | ✅ | `context/AuthContext.jsx` + `authReducer.js`, `context/EventsContext.jsx` + `eventsReducer.js` |
| Biblioteca de UI | ✅ | Chakra UI, tema propio en `src/theme.js` |
| Pruebas unitarias con Jest y React Testing Library | ✅ | `jest.config.cjs`, `babel.config.cjs`, `jest.setup.cjs`, `src/__tests__/` |

## 2. Componentes principales

| Criterio | Cumple | Dónde está |
|---|---|---|
| Formulario de creación y edición | ✅ | `components/EventForm.jsx`, `pages/EventFormPage.jsx` (una sola página para crear y editar) |
| Vista de listado con filtrado y ordenación | ✅ | `pages/EventsPage.jsx`, `EventList.jsx`, `EventCard.jsx`, `FilterChips.jsx`, `Pagination.jsx` |
| Visualización de progreso (calendario o gráficos) | ✅ | Calendario: `CalendarView.jsx`. Dashboard: `DashboardPage.jsx`, `BarChart.jsx`, `CategoryBars.jsx`, `StatCard.jsx` |

## 3. Tareas generales

| Criterio | Cumple | Dónde está |
|---|---|---|
| Configuración inicial (Vite, Router, UI, Jest) | ✅ | `package.json` |
| Modelo de datos bien estructurado | ✅ | `supabase.sql`: tabla `events` (id, user_id, title, description, category, start_at, reminder_minutes, created_at) con validaciones |
| CRUD completo (agregar, editar, eliminar, actualizar) | ✅ | `services/eventsService.js` + acciones del reducer |
| Navegación fluida y clara | ✅ | Rutas públicas y privadas, breadcrumbs, `PageTransition.jsx`, carga diferida |
| Gestión de estado sincronizada entre vistas | ✅ | `EventsContext`: lista, dashboard y calendario leen el mismo estado |
| Pruebas de renderizado y funcionalidad | ✅ | Formularios, listas, calendario, gráficas, hooks, reducers, integración |

## 4. Requisitos del proyecto elegido

| Criterio | Cumple | Dónde está |
|---|---|---|
| Crear, actualizar y eliminar eventos | ✅ | `EventFormPage.jsx`, `EventList.jsx` (con confirmación y deshacer) |
| Recordatorios personalizados | ✅ | Campo `reminder_minutes` en el formulario, aviso con `hooks/useReminders.js` |
| Vista de calendario | ✅ | `/app/calendario` |
| Categorías (trabajo, personal, reuniones) | ✅ | `utils/constants.js`, chips de filtro, colores por categoría |

## 5. Temas del certificado

| Tema | Cumple | Evidencia |
|---|---|---|
| React JSX | ✅ | Todos los componentes en `components/` y `pages/` |
| React Hooks | ✅ | `useState`, `useEffect` en formularios, calendario y páginas |
| Hooks intermedios | ✅ | `useReducer` (2 reducers), `useContext`, `useMemo` (lista filtrada, estadísticas, calendario), `useCallback` (acciones del contexto), `useRef` (foco del formulario, avisos ya mostrados), `React.memo` (`EventCard`), `lazy` y `Suspense` |
| Custom hooks | ✅ | `useAuth`, `useEvents`, `useDebounce`, `useReminders`, `useNotify`, `useOnlineStatus`, `useSyncOnReconnect`, `useDocumentTitle`, `useCountUp` |
| React Forms | ✅ | `EventForm.jsx` y `AuthForm.jsx`: campos controlados, validación, errores que se limpian al corregir, envío solo de campos editables |
| React Router | ✅ | Rutas anidadas con `Outlet`, `NavLink`, `useParams`, `useNavigate`, `Navigate`, redirección guardando la ruta de origen |
| Librerías de UI | ✅ | Chakra UI: Grid, Menu, AlertDialog, Skeleton, Avatar, Breadcrumb, Alert, Toast personalizado |
| Unit testing | ✅ | 50 casos: reducers, hooks, formulario, lista, calendario, gráficas, paginación, ErrorBoundary, integración con Context |

## 6. Presentación (máximo 10 minutos)

| Parte | Tiempo | Cumple | Dónde está el guion |
|---|---|---|---|
| Introducción | 1 min | ✅ | `docs/EXPOSICION.txt`, sección 1 |
| Explicación técnica | 3 min | ✅ | sección 2 |
| Demostración en vivo | 5 min | ✅ | sección 3 |
| Cierre y preguntas | 1 min | ✅ | sección 4 y preguntas y respuestas |
| Enlace del repositorio con la implementación completa | ⬜ | Subir a GitHub y pegar el enlace en el campo de entrega |

## 7. Buenas prácticas incluidas

| Práctica | Dónde |
|---|---|
| Autenticación real (registro, login, logout, sesión persistente) | `services/authService.js`, `AuthContext.jsx` |
| Seguridad por usuario con RLS en la base de datos | `supabase.sql` |
| Rutas protegidas | `RouteGuards.jsx` |
| Capas separadas: UI, contexto, servicios, utilidades | estructura de `src/` |
| Reducers puros con pruebas | `eventsReducer.js`, `authReducer.js` |
| Carga diferida de páginas | `App.jsx` (`React.lazy` + `Suspense`) |
| ErrorBoundary para fallos inesperados | `ErrorBoundary.jsx` |
| Los 7 estados de interfaz (ideal, vacío, cargando, parcial, error, sin conexión, éxito) | `EventList`, `EventsSkeleton`, `DashboardSkeleton`, `PartialHint`, `LoadError`, `OfflineBanner`, `useNotify` |
| Funcionamiento sin conexión con cola de sincronización | `eventsService.js`, `useSyncOnReconnect.js` |
| Animaciones de carga (skeleton, barra superior, números que suben, barras que crecen, entrada escalonada) | `EventsSkeleton`, `TopProgress`, `StatCard`, `BarChart`, `EventCard` |
| Respeta "reducir movimiento" | `utils/motion.js`, `useCountUp.js` |
| Accesibilidad: HTML semántico, enlace para saltar al contenido, etiquetas, roles ARIA, título por página | `AppLayout`, `PublicLayout`, formularios, gráficas |
| Paleta 60/30/10 (blanco polar, azul glaciar, rojo racing) | `theme.js` |
| Textos sin tildes en la interfaz | toda `src/` |
| Código sin comentarios innecesarios | toda `src/` (las pruebas llevan solo un encabezado simple) |
| Variables de entorno fuera del repositorio | `.env.example`, `.gitignore` |
| Formato consistente | `.prettierrc`, `.editorconfig` |

## 8. Lista de verificación antes de entregar

Marca cada punto cuando lo hayas hecho en tu computadora:

- [ ] `npm install` termina sin errores
- [ ] `npm test` pasa todo en verde
- [ ] `npm run build` termina sin errores
- [ ] `npm run dev` abre la landing sin errores en la consola (F12)
- [ ] Ejecutaste `supabase.sql` y desactivaste "Confirm email"
- [ ] El `.env` tiene tu URL y tu anon key
- [ ] Creaste una cuenta, un evento, lo editaste y lo eliminaste con Deshacer
- [ ] Una segunda cuenta NO ve los eventos de la primera
- [ ] Probaste el modo sin conexión (DevTools > Network > Offline)
- [ ] El repositorio es público, el `.env` no está subido y se ve el README
- [ ] Ensayaste la exposición con cronómetro y dura menos de 10 minutos
- [ ] Pegaste el enlace del repositorio en el campo de entrega
