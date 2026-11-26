import { Box, Button, Flex, Text } from '@chakra-ui/react';

export default function FilterChips({ options, value, onChange, activeCount, onClear }) {
  const all = [{ value: 'todas', label: 'Todas' }, ...options];
  return (
    <Box>
      <Flex gap={2} wrap="wrap" role="group" aria-label="Filtrar por categoria">
        {all.map((o) => {
          const active = value === o.value;
          return (
            <Button key={o.value} size="sm" borderRadius="full" aria-pressed={active}
              variant={active ? 'solid' : 'outline'} colorScheme={active ? 'brand' : 'gray'} bg={active ? undefined : 'white'}
              onClick={() => onChange(active ? 'todas' : o.value)}>
              {o.label}
              {active && o.value !== 'todas' && <span aria-hidden="true">&nbsp;✕</span>}
            </Button>
          );
        })}
      </Flex>
      <Flex mt={3} pt={2} borderTopWidth="1px" justify="space-between" align="center" fontSize="sm" color="gray.600">
        <Text>{activeCount === 0 ? 'Sin filtros activos' : `${activeCount} ${activeCount === 1 ? 'filtro activo' : 'filtros activos'}`}</Text>
        <Button variant="link" size="sm" onClick={onClear} isDisabled={activeCount === 0}>Limpiar</Button>
      </Flex>
    </Box>
  );
}
