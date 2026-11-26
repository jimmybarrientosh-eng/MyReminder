import { Box, Flex, Text } from '@chakra-ui/react';
import { growY, motionSafe } from '../utils/motion';

export default function BarChart({ data, label, height = 150 }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const summary = data.map((d) => `${d.label} ${d.value}`).join(', ');
  return (
    <Box role="img" aria-label={`${label}: ${summary}`}>
      <Flex align="flex-end" gap={{ base: 2, md: 4 }} h={`${height}px`}>
        {data.map((d, i) => (
          <Flex key={d.key} flex="1" direction="column" justify="flex-end" align="center" h="100%">
            <Text fontSize="xs" fontWeight="600" mb={1}>{d.value}</Text>
            <Box w="100%" maxW="44px" h={`${Math.max((d.value / max) * (height - 28), d.value ? 6 : 3)}px`}
              bg={d.isToday ? 'brand.500' : 'glacier.300'} borderTopRadius="md" transformOrigin="bottom"
              sx={motionSafe(`${growY} .6s cubic-bezier(.2,.8,.2,1) ${i * 70}ms both`)} />
          </Flex>
        ))}
      </Flex>
      <Flex gap={{ base: 2, md: 4 }} mt={2} pt={2} borderTopWidth="1px">
        {data.map((d) => (
          <Text key={d.key} flex="1" textAlign="center" fontSize="xs" color="gray.600" textTransform="capitalize">{d.label}</Text>
        ))}
      </Flex>
    </Box>
  );
}
