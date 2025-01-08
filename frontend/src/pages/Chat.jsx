import React, { useState, useEffect } from 'react';
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
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { FaPhone, FaVideo, FaImage, FaSmile, FaPaperPlane } from 'react-icons/fa';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import ChatSidebar from '../components/Chat/ChatSidebar';
import ChatMessage from '../components/Chat/ChatMessage';
import { useChat } from '../context/ChatContext';

const Chat = () => {
  const {
    activeChat,
    messages,
    loading,
    error,
    sendMessage,
    loadMessages,
    onlineUsers,
  } = useChat();
  
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const toast = useToast();

  useEffect(() => {
    if (activeChat) {
      loadMessages(activeChat);
    }
  }, [activeChat]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error]);

  const handleSendMessage = async () => {
    if (!messageInput.trim() && !selectedFile) return;

    const success = await sendMessage(activeChat, messageInput, selectedFile);
    if (success) {
      setMessageInput('');
      setSelectedFile(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessageInput((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Container maxW="container.xl" h="calc(100vh - 64px)" p={0}>
      <Flex h="full">
        <ChatSidebar />
        
        <Box flex="1" bg={bgColor}>
          {activeChat ? (
            <VStack h="full" spacing={0}>
              {/* Chat Header */}
              <HStack
                w="full"
                p={4}
                borderBottom="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                spacing={4}
              >
                <Avatar size="sm" name={activeChat.name} src={activeChat.avatar} />
                <Box flex="1">
                  <Text fontWeight="bold">{activeChat.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {onlineUsers.includes(activeChat._id) ? 'Online' : 'Offline'}
                  </Text>
                </Box>
                <IconButton
                  variant="ghost"
                  colorScheme="brand"
                  icon={<FaPhone />}
                  aria-label="Voice call"
                />
                <IconButton
                  variant="ghost"
                  colorScheme="brand"
                  icon={<FaVideo />}
                  aria-label="Video call"
                />
              </HStack>

              {/* Messages */}
              <Box
                flex="1"
                w="full"
                overflowY="auto"
                p={4}
                css={{
                  '&::-webkit-scrollbar': { width: '4px' },
                  '&::-webkit-scrollbar-track': { background: 'transparent' },
                  '&::-webkit-scrollbar-thumb': { background: '#718096' },
                }}
              >
                {loading ? (
                  <Flex justify="center" align="center" h="full">
                    <Spinner size="xl" color="brand.500" />
                  </Flex>
                ) : (
                  messages.map((msg) => (
                    <ChatMessage
                      key={msg._id}
                      message={msg}
                      isOwn={msg.senderId === localStorage.getItem('userId')}
                    />
                  ))
                )}
              </Box>

              {/* Message Input */}
              <Box w="full" p={4} bg={useColorModeValue('white', 'gray.800')}>
                {showEmojiPicker && (
                  <Box position="absolute" bottom="100%" right={4} zIndex={2}>
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                  </Box>
                )}
                <HStack spacing={2}>
                  <IconButton
                    variant="ghost"
                    colorScheme="brand"
                    icon={<FaSmile />}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  />
                  <Input
                    type="file"
                    id="file-input"
                    hidden
                    onChange={handleFileSelect}
                    accept="image/*"
                  />
                  <IconButton
                    as="label"
                    htmlFor="file-input"
                    variant="ghost"
                    colorScheme="brand"
                    icon={<FaImage />}
                    cursor="pointer"
                  />
                  <Input
                    flex="1"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <IconButton
                    colorScheme="brand"
                    icon={<FaPaperPlane />}
                    onClick={handleSendMessage}
                  />
                </HStack>
                {selectedFile && (
                  <Text fontSize="sm" mt={2}>
                    Selected file: {selectedFile.name}
                  </Text>
                )}
              </Box>
            </VStack>
          ) : (
            <Flex
              justify="center"
              align="center"
              h="full"
              color={useColorModeValue('gray.500', 'gray.400')}
            >
              <Text fontSize="lg">Select a chat to start messaging</Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default Chat;
