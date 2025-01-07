import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
  Text,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Switch,
  Select,
} from '@chakra-ui/react';
import { FaSliders, FaMapMarkerAlt, FaHeart, FaStar, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import UserCard from '../components/UserCard';
import MatchNotification from '../components/MatchNotification';

const MotionBox = motion(Box);

const Discover = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  // Mock user data
  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 28,
      location: 'New York City',
      distance: '2 miles away',
      bio: 'Adventure seeker | Coffee enthusiast | Dog lover 🐕',
      interests: ['Travel', 'Photography', 'Hiking'],
      verified: true,
      images: ['https://bit.ly/sage-adebayo'],
      spotify: 'Taylor Swift - Love Story',
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 30,
      location: 'Brooklyn',
      distance: '5 miles away',
      bio: 'Foodie | Tech enthusiast | Basketball player 🏀',
      interests: ['Cooking', 'Technology', 'Sports'],
      verified: true,
      images: ['https://bit.ly/ryan-florence'],
      spotify: 'Ed Sheeran - Perfect',
    },
    // Add more mock users as needed
  ];

  const handleLike = () => {
    // 30% chance of match
    if (Math.random() < 0.3) {
      setShowMatch(true);
    }
    setCurrentIndex((prev) => (prev + 1) % users.length);
  };

  const handlePass = () => {
    setCurrentIndex((prev) => (prev + 1) % users.length);
  };

  const handleSuperLike = () => {
    // 50% chance of match for super likes
    if (Math.random() < 0.5) {
      setShowMatch(true);
    }
    setCurrentIndex((prev) => (prev + 1) % users.length);
  };

  return (
    <Box minH="100vh" bg={bgColor} pt={20}>
      <Container maxW="7xl">
        <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
          {/* Main Card Stack */}
          <VStack flex={1} spacing={8} align="center">
            <HStack spacing={4}>
              <IconButton
                icon={<FaSliders />}
                aria-label="Filters"
                onClick={onOpen}
                variant="ghost"
                colorScheme="brand"
              />
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={<FaMapMarkerAlt />}
                  variant="ghost"
                  colorScheme="brand"
                >
                  Location
                </MenuButton>
                <MenuList>
                  <MenuItem>Current Location</MenuItem>
                  <MenuItem>Set Custom Location</MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <AnimatePresence mode="wait">
              <MotionBox
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <UserCard
                  user={users[currentIndex]}
                  onLike={handleLike}
                  onPass={handlePass}
                  onSuperLike={handleSuperLike}
                />
              </MotionBox>
            </AnimatePresence>
          </VStack>
        </Flex>
      </Container>

      {/* Filters Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Discovery Settings</DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="stretch">
              <FormControl>
                <FormLabel>Age Range</FormLabel>
                <RangeSlider defaultValue={[18, 35]} min={18} max={70}>
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
              </FormControl>

              <FormControl>
                <FormLabel>Maximum Distance</FormLabel>
                <RangeSlider defaultValue={[10]} min={1} max={100}>
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                </RangeSlider>
              </FormControl>

              <FormControl>
                <FormLabel>Show Me</FormLabel>
                <Select defaultValue="both">
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="both">Everyone</option>
                </Select>
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Only Show Verified Profiles</FormLabel>
                <Switch colorScheme="brand" />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Global Mode</FormLabel>
                <Switch colorScheme="brand" />
              </FormControl>

              <Button colorScheme="brand" onClick={onClose}>
                Apply Filters
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Match Notification */}
      <MatchNotification
        isOpen={showMatch}
        onClose={() => setShowMatch(false)}
        match={users[currentIndex]}
        onMessage={() => {
          setShowMatch(false);
          // Navigate to chat
        }}
      />
    </Box>
  );
};

export default Discover;
