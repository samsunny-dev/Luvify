import React from 'react';
import { Box, Text, Avatar, Flex, useColorModeValue } from '@chakra-ui/react';

const ChatMessage = ({ message, isOwn }) => {
  const messageBg = useColorModeValue(
    isOwn ? 'brand.500' : 'gray.100',
    isOwn ? 'brand.500' : 'gray.700'
  );
  const messageColor = isOwn ? 'white' : undefined;

  return (
    <Flex justify={isOwn ? 'flex-end' : 'flex-start'} mb={4}>
      {!isOwn && (
        <Avatar
          size="sm"
          name={message.sender}
          src={message.avatar}
          mr={2}
        />
      )}
      <Box
        maxW="70%"
        bg={messageBg}
        color={messageColor}
        px={4}
        py={2}
        borderRadius="lg"
        borderBottomLeftRadius={!isOwn ? 0 : undefined}
        borderBottomRightRadius={isOwn ? 0 : undefined}
      >
        <Text>{message.content}</Text>
        <Text fontSize="xs" opacity={0.8} textAlign={isOwn ? 'right' : 'left'}>
          {message.time}
        </Text>
      </Box>
      {isOwn && (
        <Avatar
          size="sm"
          name={message.sender}
          src={message.avatar}
          ml={2}
        />
      )}
    </Flex>
  );
};

export default ChatMessage;
