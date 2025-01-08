import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Avatar,
  Flex,
  useColorModeValue,
  Icon,
  Divider,
  Tag,
  SimpleGrid,
  Image,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
} from '@chakra-ui/react';
import {
  FaHeart,
  FaComment,
  FaShare,
  FaBookmark,
  FaEllipsisV,
  FaImage,
  FaVideo,
  FaPoll,
  FaSmile,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <MotionBox
      bg={cardBg}
      rounded="xl"
      overflow="hidden"
      shadow="lg"
      border="1px"
      borderColor={borderColor}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Post Header */}
      <Flex p={4} align="center" justify="space-between">
        <HStack>
          <Avatar size="sm" name={post.author} src={post.authorAvatar} />
          <Box>
            <Text fontWeight="bold">{post.author}</Text>
            <Text fontSize="sm" color="gray.500">
              {post.time}
            </Text>
          </Box>
        </HStack>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaEllipsisV />}
            variant="ghost"
            aria-label="More options"
          />
          <MenuList>
            <MenuItem>Report Post</MenuItem>
            <MenuItem>Hide Post</MenuItem>
            <MenuItem>Follow User</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Post Content */}
      <Box px={4} pb={4}>
        <Text mb={4}>{post.content}</Text>
        {post.image && (
          <Image
            src={post.image}
            alt="Post image"
            borderRadius="lg"
            mb={4}
            w="100%"
            h="300px"
            objectFit="cover"
          />
        )}
        {post.tags && (
          <HStack spacing={2} mb={4}>
            {post.tags.map((tag, index) => (
              <Tag key={index} colorScheme="brand" size="sm">
                {tag}
              </Tag>
            ))}
          </HStack>
        )}
      </Box>

      <Divider />

      {/* Post Actions */}
      <Flex p={4} justify="space-between" align="center">
        <HStack spacing={4}>
          <HStack
            spacing={1}
            onClick={() => setLiked(!liked)}
            cursor="pointer"
            color={liked ? 'red.500' : undefined}
          >
            <Icon as={FaHeart} />
            <Text fontSize="sm">{post.likes + (liked ? 1 : 0)}</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaComment} />
            <Text fontSize="sm">{post.comments}</Text>
          </HStack>
          <Icon as={FaShare} cursor="pointer" />
        </HStack>
        <Icon
          as={FaBookmark}
          cursor="pointer"
          onClick={() => setSaved(!saved)}
          color={saved ? 'brand.500' : undefined}
        />
      </Flex>
    </MotionBox>
  );
};

const Community = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newPost, setNewPost] = useState('');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  // Mock posts data
  const posts = [
    {
      id: 1,
      author: 'Sarah Johnson',
      authorAvatar: 'https://bit.ly/sage-adebayo',
      time: '2 hours ago',
      content: 'Just had an amazing first date at Central Park! The weather was perfect for a picnic. 🌞 #FirstDate #Love',
      image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde',
      likes: 124,
      comments: 23,
      tags: ['FirstDate', 'Love'],
    },
    {
      id: 2,
      author: 'Michael Chen',
      authorAvatar: 'https://bit.ly/ryan-florence',
      time: '4 hours ago',
      content: 'Looking for recommendations for romantic restaurants in NYC! Taking someone special out this weekend. 🍷',
      likes: 89,
      comments: 45,
      tags: ['Dating', 'NYC', 'Foodie'],
    },
    {
      id: 3,
      author: 'Emily Brown',
      authorAvatar: 'https://bit.ly/prosper-baba',
      time: '6 hours ago',
      content: 'Successfully planned a surprise date night! Movie under the stars followed by dessert at their favorite place. The smile on their face was priceless! ❤️',
      image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580',
      likes: 256,
      comments: 34,
      tags: ['DateNight', 'Surprise', 'Relationship'],
    },
  ];

  const handleCreatePost = () => {
    // Handle post creation
    console.log('Creating post:', newPost);
    setNewPost('');
    onClose();
  };

  return (
    <Box minH="100vh" bg={bgColor} pt={20}>
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          {/* Create Post Button */}
          <Button
            leftIcon={<Icon as={FaImage} />}
            colorScheme="brand"
            size="lg"
            onClick={onOpen}
          >
            Create Post
          </Button>

          {/* Posts Grid */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Create Post Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                minH="150px"
              />
              <HStack spacing={4}>
                <IconButton
                  icon={<FaImage />}
                  aria-label="Add image"
                  colorScheme="brand"
                  variant="ghost"
                />
                <IconButton
                  icon={<FaVideo />}
                  aria-label="Add video"
                  colorScheme="brand"
                  variant="ghost"
                />
                <IconButton
                  icon={<FaPoll />}
                  aria-label="Create poll"
                  colorScheme="brand"
                  variant="ghost"
                />
                <IconButton
                  icon={<FaSmile />}
                  aria-label="Add emoji"
                  colorScheme="brand"
                  variant="ghost"
                />
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              onClick={handleCreatePost}
              isDisabled={!newPost.trim()}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Community;
