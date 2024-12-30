import { Box, Text, Flex } from '@chakra-ui/react';

const ChatBubble = ({ message, sender, isUser }) => {
  return (
    <Flex justify={isUser ? 'flex-end' : 'flex-start'} mt="8px">
      <Box
        backgroundColor={isUser ? 'teal.200' : 'gray.200'}
        padding="12px"
        borderRadius="md"
        maxWidth="60%"
        boxShadow="sm"
      >
        <Text fontSize="sm" fontWeight="bold">
          {sender}
        </Text>
        <Text fontSize="md">{message}</Text>
      </Box>
    </Flex>
  );
};

export default ChatBubble;
