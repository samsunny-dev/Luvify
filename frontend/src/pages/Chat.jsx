<<<<<<< HEAD
import { Box, Text, Input, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = () => {
    setChatMessages([...chatMessages, message]);
    setMessage("");
  };

  return (
    <Box p={8}>
      <Stack spacing={4}>
        <Box border="1px solid gray" p={4} borderRadius="md">
          <Text fontSize="lg">Chat Room</Text>
          <Stack spacing={2}>
            {chatMessages.map((msg, index) => (
              <Text key={index}>{msg}</Text>
            ))}
          </Stack>
        </Box>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <Button onClick={handleSendMessage} colorScheme="blue">Send</Button>
      </Stack>
=======
import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  Avatar,
  Flex,
  Divider,
  useColorModeValue,
  Badge,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
} from '@chakra-ui/react';
import { FaSearch, FaSmile, FaPaperPlane, FaImage, FaVideo, FaPhone } from 'react-icons/fa';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

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
    </Flex>
  );
};

const ChatSidebar = ({ chats, activeChat, onChatSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      w="300px"
      borderRight="1px"
      borderColor={borderColor}
      h="full"
      overflowY="auto"
    >
      <VStack spacing={4} p={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>

        <VStack spacing={2} align="stretch" w="full">
          {chats.map((chat) => (
            <Box
              key={chat.id}
              p={3}
              cursor="pointer"
              borderRadius="md"
              bg={activeChat?.id === chat.id ? 'brand.50' : undefined}
              _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              onClick={() => onChatSelect(chat)}
            >
              <HStack spacing={3}>
                <Avatar size="md" name={chat.name} src={chat.avatar} />
                <Box flex={1}>
                  <HStack justify="space-between">
                    <Text fontWeight="bold">{chat.name}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {chat.lastMessageTime}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" noOfLines={1} color="gray.500">
                    {chat.lastMessage}
                  </Text>
                </Box>
                {chat.unreadCount > 0 && (
                  <Badge colorScheme="brand" borderRadius="full">
                    {chat.unreadCount}
                  </Badge>
                )}
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  // Mock data
  const chats = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://bit.ly/sage-adebayo',
      lastMessage: 'Looking forward to our coffee date! ☕',
      lastMessageTime: '2m ago',
      unreadCount: 2,
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://bit.ly/ryan-florence',
      lastMessage: 'Great meeting you yesterday!',
      lastMessageTime: '1h ago',
      unreadCount: 0,
    },
    {
      id: 3,
      name: 'Emily Brown',
      avatar: 'https://bit.ly/prosper-baba',
      lastMessage: 'How about dinner this weekend?',
      lastMessageTime: '3h ago',
      unreadCount: 1,
    },
  ];

  const messages = [
    {
      id: 1,
      content: 'Hey there! How are you?',
      sender: 'Sarah Johnson',
      avatar: 'https://bit.ly/sage-adebayo',
      time: '10:00 AM',
      isOwn: false,
    },
    {
      id: 2,
      content: "I'm good, thanks! How about you?",
      sender: 'You',
      time: '10:02 AM',
      isOwn: true,
    },
    {
      id: 3,
      content: 'Looking forward to our coffee date! ☕',
      sender: 'Sarah Johnson',
      avatar: 'https://bit.ly/sage-adebayo',
      time: '10:05 AM',
      isOwn: false,
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message to chat
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const onEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <Box minH="100vh" bg={bgColor} pt={20}>
      <Container maxW="7xl" h="calc(100vh - 80px)">
        <Flex h="full" borderRadius="xl" overflow="hidden" bg={useColorModeValue('white', 'gray.800')} shadow="xl">
          <ChatSidebar
            chats={chats}
            activeChat={activeChat}
            onChatSelect={setActiveChat}
          />

          {activeChat ? (
            <Flex flex={1} direction="column">
              {/* Chat Header */}
              <HStack p={4} borderBottom="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <Avatar size="sm" name={activeChat.name} src={activeChat.avatar} />
                <Box flex={1}>
                  <Text fontWeight="bold">{activeChat.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Online
                  </Text>
                </Box>
                <HStack>
                  <IconButton
                    icon={<FaPhone />}
                    variant="ghost"
                    aria-label="Call"
                  />
                  <IconButton
                    icon={<FaVideo />}
                    variant="ghost"
                    aria-label="Video call"
                  />
                </HStack>
              </HStack>

              {/* Messages */}
              <Box flex={1} overflowY="auto" p={4}>
                <VStack spacing={4} align="stretch">
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} isOwn={msg.isOwn} />
                  ))}
                </VStack>
              </Box>

              {/* Message Input */}
              <Box p={4} borderTop="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <HStack spacing={2}>
                  <IconButton
                    icon={<FaImage />}
                    variant="ghost"
                    aria-label="Send image"
                  />
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <IconButton
                    icon={<FaSmile />}
                    variant="ghost"
                    aria-label="Add emoji"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  />
                  <IconButton
                    icon={<FaPaperPlane />}
                    colorScheme="brand"
                    aria-label="Send message"
                    onClick={handleSendMessage}
                  />
                </HStack>
                {showEmojiPicker && (
                  <Box position="absolute" bottom="100%" right={0} zIndex={1}>
                    <Picker
                      data={data}
                      onEmojiSelect={onEmojiSelect}
                      theme={useColorModeValue('light', 'dark')}
                    />
                  </Box>
                )}
              </Box>
            </Flex>
          ) : (
            <Flex
              flex={1}
              justify="center"
              align="center"
              direction="column"
              p={8}
              textAlign="center"
            >
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Welcome to Messages
              </Text>
              <Text color="gray.500">
                Select a conversation or start a new one
              </Text>
              <Button
                mt={4}
                colorScheme="brand"
                leftIcon={<FaPaperPlane />}
              >
                New Message
              </Button>
            </Flex>
          )}
        </Flex>
      </Container>
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
    </Box>
  );
};

export default Chat;
