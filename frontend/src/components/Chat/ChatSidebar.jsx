import React from 'react';
import {
  Box,
  VStack,
  Text,
  Avatar,
  Flex,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useChat } from '../../context/ChatContext';

const ChatSidebar = () => {
  const { conversations, currentChat, setCurrentChat } = useChat();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box
      w="300px"
      h="full"
      borderRight="1px"
      borderColor={borderColor}
      bg={bgColor}
      p={4}
    >
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search conversations..."
          variant="filled"
          _focus={{ borderColor: 'brand.500' }}
        />
      </InputGroup>

      <VStack spacing={2} align="stretch">
        {conversations?.map((conversation) => (
          <Flex
            key={conversation._id}
            p={3}
            alignItems="center"
            cursor="pointer"
            borderRadius="md"
            bg={currentChat?._id === conversation._id ? hoverBg : 'transparent'}
            _hover={{ bg: hoverBg }}
            onClick={() => setCurrentChat(conversation)}
          >
            <Avatar
              size="sm"
              name={conversation.participants[0].name}
              src={conversation.participants[0].avatar}
              mr={3}
            />
            <Box flex={1}>
              <Flex justify="space-between" align="center">
                <Text fontWeight="medium">
                  {conversation.participants[0].name}
                </Text>
                {conversation.unreadCount > 0 && (
                  <Badge colorScheme="brand" borderRadius="full">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </Flex>
              <Text fontSize="sm" color="gray.500" noOfLines={1}>
                {conversation.lastMessage?.content}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default ChatSidebar;
