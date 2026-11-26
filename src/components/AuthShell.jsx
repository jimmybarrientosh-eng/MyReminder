import { Box, Container, Heading, Text } from '@chakra-ui/react';

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <Box bgGradient="linear(to-b, glacier.100, polar.50)" minH="calc(100vh - 140px)" py={{ base: 8, md: 14 }}>
      <Container maxW="md">
        <Box bg="white" p={{ base: 6, md: 8 }} borderRadius="2xl" boxShadow="0 12px 40px rgba(16,40,54,0.10)">
          <Heading as="h1" size="lg" mb={1}>{title}</Heading>
          <Text color="gray.600" mb={6}>{subtitle}</Text>
          {children}
          <Text mt={6} textAlign="center" fontSize="sm" color="gray.600">{footer}</Text>
        </Box>
      </Container>
    </Box>
  );
}