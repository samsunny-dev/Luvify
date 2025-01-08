import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Image,
  Text,
  IconButton,
  HStack,
  useColorModeValue,
  Heading,
  Tag,
  Flex,
  Progress,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaTimes, FaStar, FaUndo } from 'react-icons/fa';
import Navbar from '../components/navbar';

const profiles = [
  {
    id: 1,
    name: 'Sarah',
    age: 25,
    bio: 'Professional photographer who loves to travel. Looking for someone to explore the world with! 📸✈️',
    distance: '3 miles away',
    images: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600'],
    interests: ['Photography', 'Travel', 'Art', 'Coffee'],
  },
  {
    id: 2,
    name: 'Emily',
    age: 27,
    bio: 'Yoga instructor and plant mom. Passionate about wellness and mindful living. 🧘‍♀️🌿',
    distance: '5 miles away',
    images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600'],
    interests: ['Yoga', 'Meditation', 'Cooking', 'Nature'],
  },
  // Add more profiles as needed
];

const SWIPE_THRESHOLD = 100;

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const currentProfile = profiles[currentIndex];
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleSwipe = (swipeDirection) => {
    setDirection(swipeDirection);
    setTimeout(() => {
      setCurrentIndex((prev) => Math.min(prev + 1, profiles.length - 1));
      setDirection(null);
      setDragPosition({ x: 0, y: 0 });
    }, 200);
  };

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      handleSwipe(info.offset.x > 0 ? 'right' : 'left');
    } else {
      setDragPosition({ x: 0, y: 0 });
    }
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Navbar />
      <Container maxW="xl" py={{ base: 20, md: 28 }} px={4}>
        <VStack spacing={8} align="stretch">
          {/* Profile Cards Stack */}
          <Box position="relative" h="600px">
            <AnimatePresence>
              {currentIndex < profiles.length && (
                <motion.div
                  key={currentProfile.id}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={1}
                  onDragEnd={handleDragEnd}
                  animate={{
                    x: direction === 'left' ? -500 : direction === 'right' ? 500 : dragPosition.x,
                    rotate: (dragPosition.x / 10),
                  }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <Box
                    bg={cardBg}
                    h="full"
                    w="full"
                    rounded="2xl"
                    overflow="hidden"
                    position="relative"
                    shadow="2xl"
                  >
                    <Image
                      src={currentProfile.images[0]}
                      alt={currentProfile.name}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                    
                    {/* Profile Info Overlay */}
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      bg="rgba(0,0,0,0.5)"
                      p={6}
                      color="white"
                    >
                      <VStack align="start" spacing={2}>
                        <Heading size="lg">
                          {currentProfile.name}, {currentProfile.age}
                        </Heading>
                        <Text fontSize="sm">{currentProfile.distance}</Text>
                        <Text>{currentProfile.bio}</Text>
                        
                        <HStack spacing={2} mt={2}>
                          {currentProfile.interests.map((interest, index) => (
                            <Tag
                              key={index}
                              size="sm"
                              variant="solid"
                              colorScheme="brand"
                              rounded="full"
                            >
                              {interest}
                            </Tag>
                          ))}
                        </HStack>
                      </VStack>
                    </Box>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          {/* Action Buttons */}
          <HStack justify="center" spacing={8}>
            <IconButton
              icon={<FaTimes />}
              aria-label="Dislike"
              colorScheme="red"
              size="lg"
              isRound
              onClick={() => handleSwipe('left')}
              _hover={{ transform: 'scale(1.1)' }}
            />
            <IconButton
              icon={<FaUndo />}
              aria-label="Undo"
              colorScheme="yellow"
              size="lg"
              isRound
              _hover={{ transform: 'scale(1.1)' }}
            />
            <IconButton
              icon={<FaStar />}
              aria-label="Super Like"
              colorScheme="blue"
              size="lg"
              isRound
              _hover={{ transform: 'scale(1.1)' }}
            />
            <IconButton
              icon={<FaHeart />}
              aria-label="Like"
              colorScheme="green"
              size="lg"
              isRound
              onClick={() => handleSwipe('right')}
              _hover={{ transform: 'scale(1.1)' }}
            />
          </HStack>

          {/* Daily Picks Progress */}
          <Box>
            <Text textAlign="center" mb={2}>Daily Picks</Text>
            <Progress
              value={(currentIndex / profiles.length) * 100}
              colorScheme="brand"
              rounded="full"
            />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
