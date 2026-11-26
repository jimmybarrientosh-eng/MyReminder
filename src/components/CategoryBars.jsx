import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { CATEGORIES } from '../utils/constants';
import { growX, motionSafe } from '../utils/motion';

export default function CategoryBars({ counts }) {
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  return (
    <Stack spacing={4}>
      {CATEGORIES.map((c, i) => {
        const value = counts[c.value] || 0;
        const percent = total ? Math.round((value / total) * 100) : 0;
        return (
          <Box key={c.value}>
            <Flex justify="space-between" fontSize="sm" mb={1}>
              <Text fontWeight="600">{c.label}</Text>
              <Text color="gray.600">{value} ({percent}%)</Text>
            </Flex>
            <Box h="10px" bg="glacier.50" borderRadius="full" overflow="hidden" role="progressbar"
              aria-label={c.label} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
              <Box h="100%" w={`${percent}%`} bg={`${c.color}.400`} borderRadius="full" transformOrigin="left"
                sx={motionSafe(`${growX} .7s cubic-bezier(.2,.8,.2,1) ${i * 100}ms both`)} />
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
