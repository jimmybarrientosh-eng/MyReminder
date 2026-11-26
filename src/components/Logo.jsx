import { Box, Flex, Text, chakra } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const ring = keyframes`
  0%, 100% { transform: rotate(0); }
  20% { transform: rotate(14deg); }
  40% { transform: rotate(-12deg); }
  60% { transform: rotate(8deg); }
  80% { transform: rotate(-4deg); }
`;

export default function Logo({ size = 36, showSlogan = false }) {
  return (
    <Flex align="center" gap={3}>
      <Box as="svg" viewBox="0 0 32 32" w={`${size}px`} h={`${size}px`} role="img" aria-label="Logo de MyReminder" flexShrink={0}>
        <rect width="32" height="32" rx="8" fill="#102836" />
        <chakra.path
          d="M16 7a6 6 0 0 0-6 6v4l-1.5 3h15L22 17v-4a6 6 0 0 0-6-6zm-2 15a2 2 0 0 0 4 0z"
          fill="white"
          sx={{
            transformBox: 'fill-box',
            transformOrigin: '50% 0%',
            '@media (prefers-reduced-motion: no-preference)': { animation: `${ring} 1.1s ease-in-out 0.5s 1` },
          }}
        />
        <circle cx="23" cy="9" r="4" fill="#D3161C" />
      </Box>
      <Box lineHeight="1.1">
        <Text fontFamily="heading" fontWeight="800" fontSize="xl" letterSpacing="tight">MyReminder</Text>
        {showSlogan && <Text fontSize="xs" color="glacier.800">Lo importante, a tiempo.</Text>}
      </Box>
    </Flex>
  );
}
