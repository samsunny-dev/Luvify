import { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { chatService } from '../services/api';

const ChatContext = createContext();
const SOCKET_URL = 'http://localhost:3000';

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Initialize socket connection
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const newSocket = io(SOCKET_URL, {
        auth: { token },
      });

      newSocket.on('connect', () => {
        console.log('Connected to chat server');
      });

      newSocket.on('receive_message', (message) => {
        setMessages((prev) => [...prev, message]);
      });

      newSocket.on('user_typing', ({ userId, isTyping }) => {
        // Handle typing indicator
      });

      newSocket.on('user_online', (userId) => {
        setOnlineUsers((prev) => [...prev, userId]);
      });

      newSocket.on('user_offline', (userId) => {
        setOnlineUsers((prev) => prev.filter((id) => id !== userId));
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  const sendMessage = async (receiverId, content, file = null) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('receiverId', receiverId);
      formData.append('content', content);
      if (file) {
        formData.append('file', file);
      }

      const response = await chatService.sendMessage(formData);
      
      if (socket) {
        socket.emit('send_message', {
          receiverId,
          content,
          messageId: response.data.messageId,
        });
      }

      setMessages((prev) => [...prev, response.data]);
      return true;
    } catch (error) {
      console.error('Send message error:', error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (receiverId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await chatService.getChatHistory(receiverId);
      setMessages(response.data);
      setActiveChat(receiverId);
    } catch (error) {
      console.error('Load messages error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      setLoading(true);
      setError(null);
      await chatService.deleteMessage(messageId);
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error('Delete message error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const vanishMessage = async (messageId) => {
    try {
      setLoading(true);
      setError(null);
      await chatService.vanishMessage(messageId);
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error('Vanish message error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    socket,
    activeChat,
    messages,
    loading,
    error,
    conversations,
    onlineUsers,
    sendMessage,
    loadMessages,
    deleteMessage,
    vanishMessage,
    setActiveChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
