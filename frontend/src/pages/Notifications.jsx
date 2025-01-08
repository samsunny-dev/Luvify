import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Avatar,
  IconButton,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Flex,
  Icon,
  Divider,
} from '@chakra-ui/react';
import {
  FaHeart,
  FaComment,
  FaUserFriends,
  FaBell,
  FaEllipsisV,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const NotificationItem = ({ notification, onAccept, onDecline, onDelete }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return { as: FaHeart, color: 'red.500' };
      case 'message':
        return { as: FaComment, color: 'blue.500' };
      case 'match':
        return { as: FaUserFriends, color: 'green.500' };
      default:
        return { as: FaBell, color: 'purple.500' };
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        p={4}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        _hover={{ bg: hoverBg }}
        transition="all 0.2s"
      >
        <HStack spacing={4}>
          <Avatar size="md" name={notification.user} src={notification.avatar} />
          <Box flex={1}>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">
                  {notification.user}
                  {notification.isVerified && (
                    <Badge ml={2} colorScheme="brand">
                      Verified
                    </Badge>
                  )}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {notification.time}
                </Text>
              </VStack>
              <Icon {...getIcon()} boxSize={5} />
            </HStack>
            <Text mt={2}>{notification.content}</Text>
            {notification.type === 'match' && (
              <HStack mt={4} spacing={2}>
                <Button
                  size="sm"
                  colorScheme="brand"
                  leftIcon={<FaCheck />}
                  onClick={onAccept}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="red"
                  leftIcon={<FaTimes />}
                  onClick={onDecline}
                >
                  Decline
                </Button>
              </HStack>
            )}
          </Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaEllipsisV />}
              variant="ghost"
              aria-label="More options"
            />
            <MenuList>
              <MenuItem onClick={onDelete}>Delete</MenuItem>
              <MenuItem>Mark as read</MenuItem>
              <MenuItem>Turn off notifications from this user</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
    </MotionBox>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      user: 'Sarah Johnson',
      avatar: 'https://bit.ly/sage-adebayo',
      content: 'liked your profile',
      time: '2 minutes ago',
      isVerified: true,
      isRead: false,
    },
    {
      id: 2,
      type: 'match',
      user: 'Michael Chen',
      avatar: 'https://bit.ly/ryan-florence',
      content: 'wants to connect with you',
      time: '1 hour ago',
      isVerified: true,
      isRead: false,
    },
    {
      id: 3,
      type: 'message',
      user: 'Emily Brown',
      avatar: 'https://bit.ly/prosper-baba',
      content: 'sent you a new message',
      time: '3 hours ago',
      isVerified: false,
      isRead: true,
    },
  ]);

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const handleAccept = (id) => {
    // Handle accept logic
    console.log('Accepted:', id);
  };

  const handleDecline = (id) => {
    // Handle decline logic
    console.log('Declined:', id);
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, isRead: true }))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <Box minH="100vh" bg={bgColor} pt={20}>
      <Container maxW="3xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                Notifications
              </Text>
              <Text color="gray.500">
                Stay updated with your matches and messages
              </Text>
            </Box>
            <HStack>
              <Button
                variant="ghost"
                colorScheme="brand"
                onClick={handleMarkAllRead}
              >
                Mark all as read
              </Button>
              <Button
                variant="ghost"
                colorScheme="red"
                onClick={handleClearAll}
              >
                Clear all
              </Button>
            </HStack>
          </Flex>

          {/* Notification List */}
          <VStack spacing={4} align="stretch">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onAccept={() => handleAccept(notification.id)}
                  onDecline={() => handleDecline(notification.id)}
                  onDelete={() => handleDelete(notification.id)}
                />
              ))
            ) : (
              <Box
                textAlign="center"
                py={10}
                px={6}
                borderWidth="1px"
                borderRadius="lg"
              >
                <Icon as={FaBell} boxSize={10} color="gray.400" mb={4} />
                <Text fontSize="lg" fontWeight="medium">
                  No notifications
                </Text>
                <Text color="gray.500">
                  You're all caught up! Check back later for new updates.
                </Text>
              </Box>
            )}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Notifications;
