import React from 'react';
import {
  VStack,
  Box,
  Text,
  Avatar,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

const MessageBubble = ({ message, isOwnMessage }) => {
  const bubbleBg = useColorModeValue(
    isOwnMessage ? 'brand.500' : 'gray.100',
    isOwnMessage ? 'brand.500' : 'gray.700'
  );
  const textColor = isOwnMessage ? 'white' : undefined;

  return (
    <Flex justify={isOwnMessage ? 'flex-end' : 'flex-start'} w="full">
      {!isOwnMessage && (
        <Avatar
          size="sm"
          name={message.sender.name}
          src={message.sender.avatar}
          mr={2}
        />
      )}
      <Box
        maxW="70%"
        bg={bubbleBg}
        color={textColor}
        p={3}
        borderRadius="lg"
        borderTopLeftRadius={!isOwnMessage ? 0 : undefined}
        borderTopRightRadius={isOwnMessage ? 0 : undefined}
      >
        <Text>{message.content}</Text>
        <Text fontSize="xs" opacity={0.8} mt={1}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </Box>
      {isOwnMessage && (
        <Avatar
          size="sm"
          name={message.sender.name}
          src={message.sender.avatar}
          ml={2}
        />
      )}
    </Flex>
  );
};

const MessageList = ({ messages }) => {
  const { user } = useAuth();

  return (
    <VStack spacing={4} p={4} overflowY="auto" flex={1}>
      {messages?.map((message) => (
        <MessageBubble
          key={message._id}
          message={message}
          isOwnMessage={message.sender._id === user._id}
        />
      ))}
    </VStack>
  );
};

export default MessageList;
