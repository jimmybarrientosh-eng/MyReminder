import { useCallback } from 'react';
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';

export function AppToast({ title, description, actionLabel, onAction, onClose }) {
  return (
    <Flex bg="glacier.900" color="white" px={4} py={3} borderRadius="xl" boxShadow="lg" align="center" gap={4} maxW="md">
      <Box flex="1">
        <Text fontWeight="600">{title}</Text>
        {description && <Text fontSize="sm" color="glacier.100">{description}</Text>}
      </Box>
      {actionLabel && (
        <Button size="sm" variant="outline" color="white" borderColor="glacier.300" _hover={{ bg: 'glacier.800' }}
          onClick={() => { onAction?.(); onClose(); }}>
          {actionLabel}
        </Button>
      )}
    </Flex>
  );
}

export function useNotify() {
  const toast = useToast();
  return useCallback(
    ({ title, description, actionLabel, onAction, duration = 3500 }) =>
      toast({
        duration,
        position: 'bottom',
        render: ({ onClose }) => (
          <AppToast title={title} description={description} actionLabel={actionLabel} onAction={onAction} onClose={onClose} />
        ),
      }),
    [toast]
  );
}
