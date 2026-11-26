import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { getPageItems } from '../utils/pagination';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <Box as="nav" aria-label="Paginacion" mt={6}>
      <Flex gap={1} justify="center" wrap="wrap">
        <Button size="sm" variant="outline" aria-label="Pagina anterior" isDisabled={page === 1} onClick={() => onChange(page - 1)}>‹</Button>
        {getPageItems(page, totalPages).map((item, i) =>
          item === '…' ? (
            <Text key={`gap-${i}`} px={1} alignSelf="center" aria-hidden="true">…</Text>
          ) : (
            <Button key={item} size="sm" variant={item === page ? 'solid' : 'outline'} colorScheme={item === page ? 'brand' : 'gray'}
              aria-label={`Pagina ${item}`} aria-current={item === page ? 'page' : undefined} onClick={() => onChange(item)}>
              {item}
            </Button>
          )
        )}
        <Button size="sm" variant="outline" aria-label="Pagina siguiente" isDisabled={page === totalPages} onClick={() => onChange(page + 1)}>›</Button>
      </Flex>
      <Text textAlign="center" fontSize="sm" color="gray.600" mt={2}>Pagina {page} de {totalPages}</Text>
    </Box>
  );
}
