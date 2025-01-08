import React, { useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useChat } from '../../context/ChatContext';

const SearchMessages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { messages } = useChat();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const filteredMessages = messages?.filter((message) =>
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      position="absolute"
      top="0"
      right="0"
      w="300px"
      h="full"
      bg={bgColor}
      borderLeft="1px"
      borderColor={borderColor}
      p={4}
      zIndex={1}
    >
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search in conversation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="filled"
          _focus={{ borderColor: 'brand.500' }}
        />
      </InputGroup>

      <VStack spacing={2} align="stretch">
        {searchQuery &&
          filteredMessages?.map((message) => (
            <Box
              key={message._id}
              p={3}
              borderRadius="md"
              bg={useColorModeValue('gray.50', 'gray.700')}
            >
              <Text fontSize="sm" color="gray.500" mb={1}>
                {message.sender.name} •{' '}
                {new Date(message.timestamp).toLocaleString()}
              </Text>
              <Text>{message.content}</Text>
            </Box>
          ))}
      </VStack>
    </Box>
  );
};

export default SearchMessages;
