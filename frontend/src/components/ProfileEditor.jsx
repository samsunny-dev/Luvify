import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  IconButton,
  Image,
  SimpleGrid,
  Textarea,
  useColorModeValue,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Badge,
  useToast,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaCamera,
  FaSpotify,
  FaInstagram,
  FaTrash,
  FaStar,
  FaPlus,
  FaCheck,
} from 'react-icons/fa';

const MotionBox = motion(Box);

const ProfileEditor = ({
  initialProfile = {
    name: 'Sarah Johnson',
    age: 28,
    location: 'New York City',
    bio: 'Adventure seeker | Coffee enthusiast | Dog lover 🐕',
    interests: ['Travel', 'Photography', 'Hiking'],
    photos: ['https://bit.ly/sage-adebayo'],
    spotify: '',
    instagram: '',
  },
  onSave,
}) => {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          photos: [...prev.photos, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (index) => {
    setProfile(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleAddInterest = () => {
    const interest = prompt('Enter new interest:');
    if (interest) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, interest],
      }));
    }
  };

  const handleRemoveInterest = (index) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    onSave?.(profile);
    toast({
      title: 'Profile updated',
      description: 'Your changes have been saved successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setIsEditing(false);
  };

  return (
    <Box
      bg={bgColor}
      borderRadius="2xl"
      shadow="xl"
      overflow="hidden"
      border="1px"
      borderColor={borderColor}
    >
      {/* Photos Section */}
      <Box p={6}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Photos
        </Text>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
          {profile.photos.map((photo, index) => (
            <MotionBox
              key={index}
              position="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={photo}
                alt={`Photo ${index + 1}`}
                borderRadius="xl"
                objectFit="cover"
                h="200px"
                w="100%"
              />
              {isEditing && (
                <IconButton
                  icon={<FaTrash />}
                  position="absolute"
                  top={2}
                  right={2}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleRemovePhoto(index)}
                />
              )}
              {index === 0 && (
                <Badge
                  position="absolute"
                  bottom={2}
                  left={2}
                  colorScheme="brand"
                >
                  Main Photo
                </Badge>
              )}
            </MotionBox>
          ))}
          {isEditing && profile.photos.length < 6 && (
            <Box
              as="label"
              cursor="pointer"
              borderRadius="xl"
              border="2px dashed"
              borderColor={borderColor}
              h="200px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
            >
              <Input
                type="file"
                accept="image/*"
                display="none"
                onChange={handlePhotoUpload}
              />
              <VStack spacing={2}>
                <Icon as={FaCamera} boxSize={6} />
                <Text fontSize="sm">Add Photo</Text>
              </VStack>
            </Box>
          )}
        </SimpleGrid>
      </Box>

      {/* Profile Information */}
      <Box p={6} borderTop="1px" borderColor={borderColor}>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold">
              Profile Information
            </Text>
            <Button
              size="sm"
              colorScheme={isEditing ? 'green' : 'brand'}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              leftIcon={isEditing ? <FaCheck /> : undefined}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Looking For</FormLabel>
              <Select
                isDisabled={!isEditing}
                defaultValue="both"
              >
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="both">Everyone</option>
              </Select>
            </FormControl>
          </SimpleGrid>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              isReadOnly={!isEditing}
              resize="vertical"
              minH="100px"
            />
          </FormControl>

          <Box>
            <HStack justify="space-between" mb={4}>
              <Text fontWeight="bold">Interests</Text>
              {isEditing && (
                <IconButton
                  icon={<FaPlus />}
                  size="sm"
                  colorScheme="brand"
                  onClick={handleAddInterest}
                />
              )}
            </HStack>
            <Flex wrap="wrap" gap={2}>
              {profile.interests.map((interest, index) => (
                <Badge
                  key={index}
                  colorScheme="brand"
                  p={2}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                >
                  {interest}
                  {isEditing && (
                    <Icon
                      as={FaTrash}
                      ml={2}
                      cursor="pointer"
                      onClick={() => handleRemoveInterest(index)}
                    />
                  )}
                </Badge>
              ))}
            </Flex>
          </Box>

          {/* Social Media Integration */}
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Spotify</FormLabel>
              <Input
                value={profile.spotify}
                onChange={(e) => setProfile(prev => ({ ...prev, spotify: e.target.value }))}
                isReadOnly={!isEditing}
                placeholder="Connect your Spotify account"
                leftElement={
                  <Box pl={2}>
                    <FaSpotify />
                  </Box>
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Instagram</FormLabel>
              <Input
                value={profile.instagram}
                onChange={(e) => setProfile(prev => ({ ...prev, instagram: e.target.value }))}
                isReadOnly={!isEditing}
                placeholder="Connect your Instagram account"
                leftElement={
                  <Box pl={2}>
                    <FaInstagram />
                  </Box>
                }
              />
            </FormControl>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileEditor;
