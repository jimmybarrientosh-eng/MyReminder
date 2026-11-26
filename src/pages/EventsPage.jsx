import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Flex, Heading, Input, Select } from '@chakra-ui/react';
import EventList from '../components/EventList';
import FilterChips from '../components/FilterChips';
import LoadError from '../components/LoadError';
import Pagination from '../components/Pagination';
import PartialHint from '../components/PartialHint';
import { useDebounce } from '../hooks/useDebounce';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useEvents } from '../hooks/useEvents';
import { useNotify } from '../hooks/useNotify';
import { CATEGORIES, PAGE_SIZE } from '../utils/constants';

export default function EventsPage() {
  useDocumentTitle('Eventos');
  const { events, loading, error, reload, addEvent, removeEvent } = useEvents();
  const notify = useNotify();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('todas');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);
  const activeFilters = (search.trim() ? 1 : 0) + (category !== 'todas' ? 1 : 0);

  const visible = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return events
      .filter((e) => (category === 'todas' || e.category === category) && e.title.toLowerCase().includes(query))
      .sort((a, b) => (order === 'asc' ? 1 : -1) * (new Date(a.start_at) - new Date(b.start_at)));
  }, [events, debouncedSearch, category, order]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, order]);

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = useMemo(
    () => visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [visible, currentPage]
  );
  const suggestions = useMemo(() => [...new Set(events.map((e) => e.title))].slice(0, 20), [events]);

  const clearFilters = () => {
    setSearch('');
    setCategory('todas');
  };

  const handleDelete = useCallback(async (event) => {
    try {
      await removeEvent(event.id);
      notify({
        title: 'Evento eliminado',
        actionLabel: 'Deshacer',
        duration: 6000,
        onAction: () => addEvent(event).catch((err) => notify({ title: 'No pudimos restaurar el evento', description: err.message })),
      });
    } catch (err) {
      notify({ title: 'No pudimos eliminar el evento', description: err.message });
    }
  }, [removeEvent, addEvent, notify]);

  return (
    <>
      <Heading as="h1" size="lg" mb={5}>Tus eventos</Heading>
      <Flex gap={3} mb={4} wrap="wrap">
        <Input bg="white" flex="1" minW="220px" placeholder="Buscar por titulo" aria-label="Buscar" list="titulos-sugeridos"
          value={search} onChange={(e) => setSearch(e.target.value)} />
        <datalist id="titulos-sugeridos">
          {suggestions.map((t) => <option key={t} value={t} />)}
        </datalist>
        <Select bg="white" maxW="230px" aria-label="Orden" value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Mas proximos primero</option>
          <option value="desc">Mas lejanos primero</option>
        </Select>
      </Flex>
      <Box mb={5}>
        <FilterChips options={CATEGORIES} value={category} onChange={setCategory} activeCount={activeFilters} onClear={clearFilters} />
      </Box>

      {error ? (
        <LoadError onRetry={reload} />
      ) : (
        <>
          <EventList events={pageItems} loading={loading} onDelete={handleDelete} isFiltered={activeFilters > 0} />
          <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
          {!loading && activeFilters === 0 && visible.length > 0 && visible.length < 3 && <PartialHint />}
        </>
      )}
    </>
  );
}
