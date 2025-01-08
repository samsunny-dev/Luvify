<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { 
  Box, 
  Container,
  Heading,
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Stack,
  useToast
} from "@chakra-ui/react";
import { profileService } from "../services/profileService";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    location: ''
  });
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfile(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await profileService.updateProfile(profile);
      toast({
        title: "Success",
        description: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Box>Loading...</Box>;

  return (
    <Container maxW="container.md" py={10}>
      <Heading mb={6}>Profile</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              name="bio"
              value={profile.bio}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              name="location"
              value={profile.location}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Save Changes
          </Button>
        </Stack>
      </form>
    </Container>
=======
import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  IconButton,
  useColorModeValue,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Tag,
  Wrap,
  WrapItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
} from '@chakra-ui/react';
import { FaCamera, FaInstagram, FaSpotify, FaCog, FaHeart, FaEye, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';

const MotionBox = motion(Box);

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    name: 'Sarah Anderson',
    age: 24,
    bio: 'Adventure seeker and coffee enthusiast. Looking for someone to explore life with.',
    location: 'New York City',
    occupation: 'Professional Photographer',
    interests: ['Photography', 'Travel', 'Coffee', 'Hiking', 'Art', 'Music'],
    photos: [
      '/profile-1.jpg',
      '/profile-2.jpg',
      '/profile-3.jpg',
      '/profile-4.jpg',
      '/profile-5.jpg',
      '/profile-6.jpg',
    ],
    stats: {
      matches: 156,
      likes: 423,
      views: 1289,
    },
    spotify: {
      topArtists: ['The Weeknd', 'Taylor Swift', 'Ed Sheeran'],
      favoriteGenres: ['Pop', 'R&B', 'Indie'],
    },
    instagram: {
      connected: true,
      followers: '2.5K',
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handlePhotoUpload = (e) => {
    // Handle photo upload logic
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Navbar />

      <Container maxW="7xl" py={{ base: 20, md: 28 }}>
        <Grid templateColumns={{ base: '1fr', lg: '350px 1fr' }} gap={8}>
          {/* Left Sidebar */}
          <GridItem>
            <VStack spacing={6}>
              {/* Profile Photo */}
              <Box position="relative" w="full">
                <Image
                  src={userProfile.photos[0]}
                  alt={userProfile.name}
                  w="full"
                  h="350px"
                  objectFit="cover"
                  rounded="2xl"
                />
                <IconButton
                  icon={<FaCamera />}
                  position="absolute"
                  bottom={4}
                  right={4}
                  colorScheme="brand"
                  rounded="full"
                  onClick={onOpen}
                  aria-label="Upload photo"
                />
              </Box>

              {/* Quick Stats */}
              <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full">
                <Stat textAlign="center" p={4} bg={cardBg} rounded="xl">
                  <StatLabel>Matches</StatLabel>
                  <StatNumber color="brand.500">{userProfile.stats.matches}</StatNumber>
                </Stat>
                <Stat textAlign="center" p={4} bg={cardBg} rounded="xl">
                  <StatLabel>Likes</StatLabel>
                  <StatNumber color="brand.500">{userProfile.stats.likes}</StatNumber>
                </Stat>
                <Stat textAlign="center" p={4} bg={cardBg} rounded="xl">
                  <StatLabel>Views</StatLabel>
                  <StatNumber color="brand.500">{userProfile.stats.views}</StatNumber>
                </Stat>
              </Grid>

              {/* Quick Actions */}
              <VStack w="full" spacing={4}>
                <Button
                  leftIcon={<FaInstagram />}
                  w="full"
                  colorScheme="pink"
                  variant="outline"
                >
                  Connect Instagram
                </Button>
                <Button
                  leftIcon={<FaSpotify />}
                  w="full"
                  colorScheme="green"
                  variant="outline"
                >
                  Connect Spotify
                </Button>
                <Button
                  leftIcon={<FaCog />}
                  w="full"
                  colorScheme="gray"
                  variant="outline"
                >
                  Settings
                </Button>
              </VStack>
            </VStack>
          </GridItem>

          {/* Main Content */}
          <GridItem>
            <Box bg={cardBg} rounded="2xl" p={8} shadow="lg">
              <Tabs colorScheme="brand">
                <TabList mb={8}>
                  <Tab>Profile</Tab>
                  <Tab>Photos</Tab>
                  <Tab>Interests</Tab>
                  <Tab>Music</Tab>
                </TabList>

                <TabPanels>
                  {/* Profile Tab */}
                  <TabPanel>
                    <VStack spacing={6} align="stretch">
                      <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input defaultValue={userProfile.name} size="lg" />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Textarea
                          defaultValue={userProfile.bio}
                          size="lg"
                          rows={4}
                        />
                      </FormControl>

                      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <FormControl>
                          <FormLabel>Location</FormLabel>
                          <Input defaultValue={userProfile.location} size="lg" />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Occupation</FormLabel>
                          <Input defaultValue={userProfile.occupation} size="lg" />
                        </FormControl>
                      </Grid>

                      <Button colorScheme="brand" size="lg" onClick={handleProfileUpdate}>
                        Save Changes
                      </Button>
                    </VStack>
                  </TabPanel>

                  {/* Photos Tab */}
                  <TabPanel>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      {userProfile.photos.map((photo, index) => (
                        <Box
                          key={index}
                          position="relative"
                          as={MotionBox}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Image
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            w="full"
                            h="200px"
                            objectFit="cover"
                            rounded="xl"
                          />
                          <IconButton
                            icon={<FaCamera />}
                            position="absolute"
                            top={2}
                            right={2}
                            size="sm"
                            colorScheme="brand"
                            rounded="full"
                            onClick={() => handlePhotoUpload(index)}
                            aria-label="Change photo"
                          />
                        </Box>
                      ))}
                    </Grid>
                  </TabPanel>

                  {/* Interests Tab */}
                  <TabPanel>
                    <VStack spacing={6} align="stretch">
                      <Wrap spacing={4}>
                        {userProfile.interests.map((interest, index) => (
                          <WrapItem key={index}>
                            <Tag
                              size="lg"
                              colorScheme="brand"
                              borderRadius="full"
                              px={6}
                              py={2}
                            >
                              {interest}
                            </Tag>
                          </WrapItem>
                        ))}
                      </Wrap>
                      <Button
                        colorScheme="brand"
                        variant="outline"
                        leftIcon={<FaHeart />}
                      >
                        Add More Interests
                      </Button>
                    </VStack>
                  </TabPanel>

                  {/* Music Tab */}
                  <TabPanel>
                    <VStack spacing={8} align="stretch">
                      <Box>
                        <Text fontSize="lg" fontWeight="bold" mb={4}>
                          Top Artists
                        </Text>
                        <VStack align="stretch">
                          {userProfile.spotify.topArtists.map((artist, index) => (
                            <HStack
                              key={index}
                              p={4}
                              bg={useColorModeValue('gray.50', 'gray.700')}
                              rounded="xl"
                            >
                              <Text flex={1}>{artist}</Text>
                              <Badge colorScheme="green">Spotify</Badge>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>

                      <Box>
                        <Text fontSize="lg" fontWeight="bold" mb={4}>
                          Favorite Genres
                        </Text>
                        <Wrap>
                          {userProfile.spotify.favoriteGenres.map((genre, index) => (
                            <WrapItem key={index}>
                              <Tag
                                size="lg"
                                colorScheme="green"
                                borderRadius="full"
                                px={6}
                                py={2}
                              >
                                {genre}
                              </Tag>
                            </WrapItem>
                          ))}
                        </Wrap>
                      </Box>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>
        </Grid>
      </Container>

      {/* Photo Upload Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
              id="photo-upload"
            />
            <Button
              as="label"
              htmlFor="photo-upload"
              colorScheme="brand"
              w="full"
              h="200px"
              cursor="pointer"
            >
              <VStack spacing={4}>
                <FaCamera size={32} />
                <Text>Click to upload photo</Text>
              </VStack>
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
  );
};

export default Profile;
