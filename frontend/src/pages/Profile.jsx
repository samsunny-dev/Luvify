import React, { useState, useEffect } from 'react';
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
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react';
import {
  FaCamera,
  FaInstagram,
  FaSpotify,
  FaCog,
  FaHeart,
  FaEye,
  FaStar,
  FaPlus,
  FaTrash,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data);
      setEditedProfile(response.data);
      setInterests(response.data.interests || []);
    } catch (error) {
      toast({
        title: 'Error fetching profile',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
      });
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('index', index);

    try {
      setUploadingPhoto(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/profile/photos`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setProfile((prev) => ({
        ...prev,
        photos: response.data.photos,
      }));
      toast({
        title: 'Photo uploaded successfully',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error uploading photo',
        description: error.response?.data?.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        {
          ...editedProfile,
          interests,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data);
      toast({
        title: 'Profile updated successfully',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error updating profile',
        description: error.response?.data?.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    if (interests.includes(newInterest.trim())) {
      toast({
        title: 'Interest already exists',
        status: 'warning',
        duration: 2000,
      });
      return;
    }
    setInterests((prev) => [...prev, newInterest.trim()]);
    setNewInterest('');
  };

  const handleRemoveInterest = (interest) => {
    setInterests((prev) => prev.filter((i) => i !== interest));
  };

  const handleConnectService = async (service) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/profile/connect/${service}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast({
        title: `Connected to ${service}`,
        status: 'success',
        duration: 2000,
      });
      fetchProfile();
    } catch (error) {
      toast({
        title: `Error connecting to ${service}`,
        description: error.response?.data?.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  if (!profile) {
    return (
      <Center minH="100vh">
        <Text>No profile found. Please log in.</Text>
      </Center>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="7xl" py={{ base: 20, md: 28 }}>
        <Grid templateColumns={{ base: '1fr', lg: '350px 1fr' }} gap={8}>
          {/* Left Sidebar */}
          <GridItem>
            <VStack spacing={6}>
              {/* Profile Photo */}
              <Box position="relative" w="full">
                <Image
                  src={profile.photos[0] || '/default-avatar.jpg'}
                  alt={profile.name}
                  w="full"
                  h="350px"
                  objectFit="cover"
                  rounded="2xl"
                  fallbackSrc="/default-avatar.jpg"
                />
                <IconButton
                  icon={uploadingPhoto ? <Spinner /> : <FaCamera />}
                  position="absolute"
                  bottom={4}
                  right={4}
                  colorScheme="brand"
                  rounded="full"
                  onClick={onOpen}
                  isDisabled={uploadingPhoto}
                  aria-label="Upload photo"
                />
              </Box>

              {/* Quick Stats */}
              <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full">
                <Stat textAlign="center" p={4} bg={cardBg} rounded="xl">
                  <StatLabel>Matches</StatLabel>
                  <StatNumber color="brand.500">{profile.stats?.matches || 0}</StatNumber>
                </Stat>
                <Stat textAlign="center" p={4} bg={cardBg} rounded="xl">
                  <StatLabel>Likes</StatLabel>
                  <StatNumber color="brand.500">{profile.stats?.likes || 0}</StatNumber>
                </Stat>
                <Stat textAlign="center" p={4} bg={cardBg} rounded="xl">
                  <StatLabel>Views</StatLabel>
                  <StatNumber color="brand.500">{profile.stats?.views || 0}</StatNumber>
                </Stat>
              </Grid>

              {/* Quick Actions */}
              <VStack w="full" spacing={4}>
                <Button
                  leftIcon={<FaInstagram />}
                  w="full"
                  colorScheme="pink"
                  variant={profile.instagram?.connected ? 'solid' : 'outline'}
                  onClick={() => handleConnectService('instagram')}
                >
                  {profile.instagram?.connected ? 'Instagram Connected' : 'Connect Instagram'}
                </Button>
                <Button
                  leftIcon={<FaSpotify />}
                  w="full"
                  colorScheme="green"
                  variant={profile.spotify?.connected ? 'solid' : 'outline'}
                  onClick={() => handleConnectService('spotify')}
                >
                  {profile.spotify?.connected ? 'Spotify Connected' : 'Connect Spotify'}
                </Button>
                <Button
                  leftIcon={<FaCog />}
                  w="full"
                  colorScheme="gray"
                  variant="outline"
                  onClick={() => navigate('/settings')}
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
                        <Input
                          name="name"
                          value={editedProfile.name || ''}
                          onChange={handleInputChange}
                          size="lg"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Textarea
                          name="bio"
                          value={editedProfile.bio || ''}
                          onChange={handleInputChange}
                          size="lg"
                          rows={4}
                        />
                      </FormControl>

                      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <FormControl>
                          <FormLabel>Location</FormLabel>
                          <Input
                            name="location"
                            value={editedProfile.location || ''}
                            onChange={handleInputChange}
                            size="lg"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Occupation</FormLabel>
                          <Input
                            name="occupation"
                            value={editedProfile.occupation || ''}
                            onChange={handleInputChange}
                            size="lg"
                          />
                        </FormControl>
                      </Grid>

                      <Button
                        colorScheme="brand"
                        size="lg"
                        onClick={handleProfileUpdate}
                        isLoading={updating}
                      >
                        Save Changes
                      </Button>
                    </VStack>
                  </TabPanel>

                  {/* Photos Tab */}
                  <TabPanel>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      {profile.photos.map((photo, index) => (
                        <Box
                          key={index}
                          position="relative"
                          as={MotionBox}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Image
                            src={photo || '/default-photo.jpg'}
                            alt={`Photo ${index + 1}`}
                            w="full"
                            h="200px"
                            objectFit="cover"
                            rounded="xl"
                            fallbackSrc="/default-photo.jpg"
                          />
                          <input
                            type="file"
                            id={`photo-upload-${index}`}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, index)}
                          />
                          <IconButton
                            icon={uploadingPhoto ? <Spinner /> : <FaCamera />}
                            position="absolute"
                            top={2}
                            right={2}
                            size="sm"
                            colorScheme="brand"
                            rounded="full"
                            onClick={() => document.getElementById(`photo-upload-${index}`).click()}
                            isDisabled={uploadingPhoto}
                            aria-label="Change photo"
                          />
                        </Box>
                      ))}
                    </Grid>
                  </TabPanel>

                  {/* Interests Tab */}
                  <TabPanel>
                    <VStack spacing={6} align="stretch">
                      <HStack>
                        <Input
                          placeholder="Add new interest..."
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddInterest();
                            }
                          }}
                        />
                        <IconButton
                          icon={<FaPlus />}
                          colorScheme="brand"
                          onClick={handleAddInterest}
                          aria-label="Add interest"
                        />
                      </HStack>

                      <Wrap spacing={4}>
                        {interests.map((interest, index) => (
                          <WrapItem key={index}>
                            <Tag
                              size="lg"
                              colorScheme="brand"
                              borderRadius="full"
                              px={6}
                              py={2}
                            >
                              {interest}
                              <IconButton
                                icon={<FaTrash />}
                                size="xs"
                                ml={2}
                                colorScheme="red"
                                variant="ghost"
                                onClick={() => handleRemoveInterest(interest)}
                                aria-label="Remove interest"
                              />
                            </Tag>
                          </WrapItem>
                        ))}
                      </Wrap>
                    </VStack>
                  </TabPanel>

                  {/* Music Tab */}
                  <TabPanel>
                    <VStack spacing={8} align="stretch">
                      {profile.spotify?.connected ? (
                        <>
                          <Box>
                            <Text fontWeight="bold" mb={4}>
                              Top Artists
                            </Text>
                            <VStack align="stretch" spacing={2}>
                              {profile.spotify?.topArtists?.map((artist, index) => (
                                <HStack key={index} p={2} bg={bgColor} rounded="md">
                                  <Text>{artist}</Text>
                                </HStack>
                              ))}
                            </VStack>
                          </Box>
                          <Box>
                            <Text fontWeight="bold" mb={4}>
                              Favorite Genres
                            </Text>
                            <Wrap>
                              {profile.spotify?.favoriteGenres?.map((genre, index) => (
                                <WrapItem key={index}>
                                  <Tag colorScheme="green" size="lg">
                                    {genre}
                                  </Tag>
                                </WrapItem>
                              ))}
                            </Wrap>
                          </Box>
                        </>
                      ) : (
                        <VStack spacing={4}>
                          <Text>Connect your Spotify account to share your music taste</Text>
                          <Button
                            leftIcon={<FaSpotify />}
                            colorScheme="green"
                            onClick={() => handleConnectService('spotify')}
                          >
                            Connect Spotify
                          </Button>
                        </VStack>
                      )}
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
