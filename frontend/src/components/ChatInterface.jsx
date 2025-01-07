import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  IconButton,
  VStack,
  HStack,
  Text,
  Avatar,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Badge,
  Image,
  Button,
} from '@chakra-ui/react';
import {
  FaPaperPlane,
  FaSmile,
  FaImage,
  FaVideo,
  FaPhone,
  FaEllipsisV,
  FaHeart,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const MotionBox = motion(Box);

const Message = ({ message, isOwn }) => {
  const ownBg = useColorModeValue('brand.500', 'brand.600');
  const otherBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      alignSelf={isOwn ? 'flex-end' : 'flex-start'}
      maxW="70%"
    >
      <Box
        bg={isOwn ? ownBg : otherBg}
        color={isOwn ? 'white' : 'inherit'}
        px={4}
        py={2}
        borderRadius={isOwn ? '20px 20px 4px 20px' : '20px 20px 20px 4px'}
        position="relative"
      >
        {message.type === 'text' && (
          <Text>{message.content}</Text>
        )}
        {message.type === 'image' && (
          <Image
            src={message.content}
            alt="Shared image"
            borderRadius="lg"
            maxH="200px"
            objectFit="cover"
          />
        )}
        <Text fontSize="xs" opacity={0.7} textAlign="right" mt={1}>
          {message.time}
        </Text>
      </Box>
    </MotionBox>
  );
};

const ChatInterface = ({
  match = {
    name: 'Sarah Johnson',
    image: 'https://bit.ly/sage-adebayo',
    lastSeen: 'Online',
    typing: false,
  },
}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: 'Hey there! 👋',
      type: 'text',
      time: '10:30 AM',
      isOwn: false,
    },
    {
      id: 2,
      content: 'Hi! How are you?',
      type: 'text',
      time: '10:31 AM',
      isOwn: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          content: newMessage,
          type: 'text',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: true,
        },
      ]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <Box
      h="100vh"
      bg={useColorModeValue('gray.50', 'gray.900')}
      position="relative"
    >
      {/* Chat Header */}
      <Flex
        p={4}
        bg={useColorModeValue('white', 'gray.800')}
        borderBottom="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        align="center"
        position="sticky"
        top={0}
        zIndex={1}
      >
        <Avatar src={match.image} name={match.name} size="md" />
        <VStack align="start" ml={4} flex={1}>
          <HStack>
            <Text fontWeight="bold">{match.name}</Text>
            <Badge
              colorScheme={match.lastSeen === 'Online' ? 'green' : 'gray'}
              variant="subtle"
              fontSize="xs"
            >
              {match.lastSeen}
            </Badge>
          </HStack>
          {match.typing && (
            <Text fontSize="xs" color="gray.500">
              typing...
            </Text>
          )}
        </VStack>
        <HStack spacing={2}>
          <IconButton
            aria-label="Voice call"
            icon={<FaPhone />}
            variant="ghost"
            colorScheme="brand"
          />
          <IconButton
            aria-label="Video call"
            icon={<FaVideo />}
            variant="ghost"
            colorScheme="brand"
          />
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaEllipsisV />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem>View Profile</MenuItem>
              <MenuItem>Clear Chat</MenuItem>
              <MenuItem color="red.500">Block User</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Messages Area */}
      <VStack
        spacing={4}
        p={4}
        overflowY="auto"
        h="calc(100vh - 140px)"
        align="stretch"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <Message key={message.id} message={message} isOwn={message.isOwn} />
          ))}
        </AnimatePresence>
      </VStack>

      {/* Input Area */}
      <Box
        p={4}
        bg={useColorModeValue('white', 'gray.800')}
        borderTop="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        position="sticky"
        bottom={0}
      >
        <HStack spacing={2}>
          <IconButton
            icon={<FaSmile />}
            variant="ghost"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          <IconButton
            icon={<FaImage />}
            variant="ghost"
          />
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="filled"
            bg={useColorModeValue('gray.100', 'gray.700')}
          />
          <IconButton
            icon={<FaPaperPlane />}
            colorScheme="brand"
            onClick={handleSendMessage}
            isDisabled={!newMessage.trim()}
          />
        </HStack>

        {/* Emoji Picker */}
        <AnimatePresence>
          {showEmojiPicker && (
            <MotionBox
              position="absolute"
              bottom="100%"
              left={0}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              zIndex={2}
            >
              <Box bg="white" borderRadius="lg" boxShadow="xl">
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme={useColorModeValue('light', 'dark')}
                />
              </Box>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default ChatInterface;
