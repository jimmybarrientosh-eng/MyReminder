import { Box, Text, VisuallyHidden } from '@chakra-ui/react';
import { useCountUp } from '../hooks/useCountUp';
import { fadeUp, motionSafe } from '../utils/motion';

export default function StatCard({ label, value, hint, accent = 'glacier.400', index = 0 }) {
  const shown = useCountUp(value);
  return (
    <Box bg="white" borderRadius="2xl" p={{ base: 3, md: 5 }} borderWidth="1px" borderColor="glacier.100" borderTopWidth="4px" borderTopColor={accent} boxShadow="0 1px 2px rgba(16,40,54,0.06)"
      transition="transform .2s, box-shadow .2s" _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
      sx={motionSafe(`${fadeUp} .5s ease-out ${index * 80}ms both`)}>
      <Text fontSize="sm" color="gray.600">{label}</Text>
      <Text aria-hidden="true" fontFamily="heading" fontWeight="800" fontSize="4xl" lineHeight="1.15">{shown}</Text>
      <VisuallyHidden>{value}</VisuallyHidden>
      {hint && <Text fontSize="xs" color="gray.500">{hint}</Text>}
    </Box>
  );
}