import { Box, Flex, Heading } from '@chakra-ui/react';

export default function Panel({ title, action, children, ...rest }) {
  return (
    <Box bg="white" borderRadius="2xl" borderWidth="1px" borderColor="glacier.100" p={5} boxShadow="0 2px 8px rgba(16,40,54,0.06)" {...rest}>
      <Flex justify="space-between" align="center" mb={4} pb={3} borderBottomWidth="1px" borderColor="glacier.100" gap={2}>
        <Heading as="h2" size="md">{title}</Heading>
        {action}
      </Flex>
      {children}
    </Box>
  );
}