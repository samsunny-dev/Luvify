import React, { useState, useEffect } from "react";
import { 
  Box, 
  Container,
  Heading,
  FormControl, 
  FormLabel, 
  Input,
  Textarea, 
  Button, 
  Stack,
  VStack,
  HStack,
  Image,
  Text,
  IconButton,
  useToast,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  GridItem,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  Divider,
  Switch,
  Badge,
  Progress,
} from "@chakra-ui/react";
import {
  FaCamera,
  FaEdit,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaGlobe,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { profileService } from "../services/profileService";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    dateOfBirth: '',
    gender: '',
    occupation: '',
    education: '',
    interests: [],
    photos: [],
    socialLinks: {
      instagram: '',
      facebook: '',
      linkedin: '',
    },
    preferences: {
      ageRange: { min: 18, max: 35 },
      distance: 25,
      gender: 'all',
    },
    profileCompletion: 65,
    premium: false,
  });
  
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileService.getProfile();
      // Simulated data - replace with actual API response
      const mockData = {
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Adventure seeker and coffee enthusiast. Looking for someone to share lifes beautiful moments with.',
        location: 'New York, NY',
        dateOfBirth: '1995-06-15',
        gender: 'Male',
        occupation: 'Software Engineer',
        education: 'Masters in Computer Science',
        interests: ['Hiking', 'Photography', 'Cooking', 'Travel'],
        photos: ['/profile1.jpg', '/profile2.jpg', '/profile3.jpg'],
        socialLinks: {
          instagram: 'johndoe',
          facebook: 'johndoe',
          linkedin: 'johndoe',
        },
        preferences: {
          ageRange: { min: 25, max: 35 },
          distance: 25,
          gender: 'female',
        },
        profileCompletion: 65,
        premium: false,
      };
      setProfile(mockData);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        status: "error",
        duration: 3000,
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

  const handlePreferenceChange = (name, value) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value
      }
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handlePhotoUpload = (e) => {
    // Implement photo upload logic
    toast({
      title: "Photo Upload",
      description: "This feature will be implemented soon",
      status: "info",
      duration: 2000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await profileService.updateProfile(profile);
      toast({
        title: "Success",
        description: "Profile updated successfully",
        status: "success",
        duration: 2000,
      });
      setEditMode(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        status: "error",
        duration: 2000,
      });
    }
  };

  if (loading) return (
    <Container centerContent py={20}>
      <Text>Loading profile...</Text>
    </Container>
  );

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          {/* Profile Header */}
          <Box 
            w="100%" 
            bg={bgColor} 
            borderRadius="xl" 
            p={6}
            position="relative"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <HStack spacing={8} align="start">
              <Box position="relative">
                <Avatar
                  size="2xl"
                  src={profile.photos[0]}
                  name={profile.name}
                >
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="purple"
                    aria-label="Edit Profile Picture"
                    icon={<FaCamera />}
                    onClick={handlePhotoUpload}
                  />
                </Avatar>
              </Box>
              
              <VStack align="start" flex={1} spacing={4}>
                <HStack justify="space-between" w="100%">
                  <Box>
                    <Heading size="lg">{profile.name}</Heading>
                    <HStack color="gray.600" mt={2}>
                      <FaMapMarkerAlt />
                      <Text>{profile.location}</Text>
                    </HStack>
                  </Box>
                  <HStack>
                    {profile.premium && (
                      <Badge colorScheme="yellow" variant="solid" px={3} py={1}>
                        Premium
                      </Badge>
                    )}
                    <Button
                      leftIcon={<FaEdit />}
                      colorScheme="purple"
                      variant="outline"
                      onClick={() => setEditMode(!editMode)}
                    >
                      {editMode ? "Cancel Edit" : "Edit Profile"}
                    </Button>
                  </HStack>
                </HStack>

                <Box w="100%">
                  <Text color="gray.600" mb={2}>Profile Completion</Text>
                  <Progress
                    value={profile.profileCompletion}
                    colorScheme="purple"
                    borderRadius="full"
                  />
                </Box>
              </VStack>
            </HStack>
          </Box>

          {/* Main Content */}
          <Tabs width="100%" colorScheme="purple" isLazy>
            <TabList>
              <Tab>Basic Info</Tab>
              <Tab>Photos</Tab>
              <Tab>Preferences</Tab>
              <Tab>Settings</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={8}>
                  {/* Left Column - Basic Info */}
                  <GridItem>
                    <VStack
                      spacing={6}
                      align="stretch"
                      bg={bgColor}
                      p={6}
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor={borderColor}
                    >
                      <Heading size="md">About Me</Heading>
                      
                      <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Textarea
                          name="bio"
                          value={profile.bio}
                          onChange={handleChange}
                          disabled={!editMode}
                          rows={4}
                        />
                      </FormControl>

                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <FormControl>
                          <FormLabel>Occupation</FormLabel>
                          <Input
                            name="occupation"
                            value={profile.occupation}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Education</FormLabel>
                          <Input
                            name="education"
                            value={profile.education}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Date of Birth</FormLabel>
                          <Input
                            name="dateOfBirth"
                            type="date"
                            value={profile.dateOfBirth}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            name="gender"
                            value={profile.gender}
                            onChange={handleChange}
                            disabled={!editMode}
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Box>
                        <FormLabel>Interests</FormLabel>
                        <HStack mb={4}>
                          <Input
                            placeholder="Add an interest"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            disabled={!editMode}
                          />
                          <Button
                            onClick={handleAddInterest}
                            colorScheme="purple"
                            disabled={!editMode}
                          >
                            Add
                          </Button>
                        </HStack>
                        <Box>
                          {profile.interests.map((interest, index) => (
                            <Tag
                              key={index}
                              size="lg"
                              colorScheme="purple"
                              variant="subtle"
                              m={1}
                            >
                              <TagLabel>{interest}</TagLabel>
                              {editMode && (
                                <TagCloseButton
                                  onClick={() => handleRemoveInterest(interest)}
                                />
                              )}
                            </Tag>
                          ))}
                        </Box>
                      </Box>

                      {editMode && (
                        <Button
                          colorScheme="purple"
                          size="lg"
                          onClick={handleSubmit}
                        >
                          Save Changes
                        </Button>
                      )}
                    </VStack>
                  </GridItem>

                  {/* Right Column - Social & Stats */}
                  <GridItem>
                    <VStack spacing={6}>
                      {/* Social Links */}
                      <Box
                        bg={bgColor}
                        p={6}
                        borderRadius="xl"
                        w="100%"
                        borderWidth="1px"
                        borderColor={borderColor}
                      >
                        <Heading size="md" mb={4}>Social Links</Heading>
                        <VStack spacing={4}>
                          <FormControl>
                            <FormLabel>Instagram</FormLabel>
                            <Input
                              value={profile.socialLinks.instagram}
                              onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                              disabled={!editMode}
                              placeholder="@username"
                              leftElement={<FaInstagram />}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Facebook</FormLabel>
                            <Input
                              value={profile.socialLinks.facebook}
                              onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                              disabled={!editMode}
                              placeholder="username"
                              leftElement={<FaFacebook />}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>LinkedIn</FormLabel>
                            <Input
                              value={profile.socialLinks.linkedin}
                              onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                              disabled={!editMode}
                              placeholder="username"
                              leftElement={<FaLinkedin />}
                            />
                          </FormControl>
                        </VStack>
                      </Box>

                      {/* Profile Stats */}
                      <Box
                        bg={bgColor}
                        p={6}
                        borderRadius="xl"
                        w="100%"
                        borderWidth="1px"
                        borderColor={borderColor}
                      >
                        <Heading size="md" mb={4}>Profile Stats</Heading>
                        <VStack spacing={4} align="stretch">
                          <HStack justify="space-between">
                            <Text>Profile Views</Text>
                            <Text fontWeight="bold">1,234</Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text>Matches</Text>
                            <Text fontWeight="bold">56</Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text>Active Days</Text>
                            <Text fontWeight="bold">90</Text>
                          </HStack>
                        </VStack>
                      </Box>
                    </VStack>
                  </GridItem>
                </Grid>
              </TabPanel>

              {/* Photos Tab */}
              <TabPanel>
                <Box
                  bg={bgColor}
                  p={6}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Heading size="md" mb={6}>My Photos</Heading>
                  <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
                    {profile.photos.map((photo, index) => (
                      <Box
                        key={index}
                        position="relative"
                        borderRadius="lg"
                        overflow="hidden"
                      >
                        <Image
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          w="100%"
                          h="200px"
                          objectFit="cover"
                        />
                        {editMode && (
                          <IconButton
                            position="absolute"
                            top={2}
                            right={2}
                            icon={<FaEdit />}
                            colorScheme="purple"
                            onClick={() => handlePhotoUpload()}
                          />
                        )}
                      </Box>
                    ))}
                    {editMode && (
                      <Box
                        borderWidth="2px"
                        borderStyle="dashed"
                        borderColor="purple.200"
                        borderRadius="lg"
                        h="200px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        onClick={handlePhotoUpload}
                      >
                        <VStack>
                          <FaCamera size="24px" />
                          <Text>Add Photo</Text>
                        </VStack>
                      </Box>
                    )}
                  </Grid>
                </Box>
              </TabPanel>

              {/* Preferences Tab */}
              <TabPanel>
                <Box
                  bg={bgColor}
                  p={6}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Heading size="md" mb={6}>Match Preferences</Heading>
                  <VStack spacing={6} align="stretch">
                    <FormControl>
                      <FormLabel>I'm interested in</FormLabel>
                      <Select
                        value={profile.preferences.gender}
                        onChange={(e) => handlePreferenceChange('gender', e.target.value)}
                        disabled={!editMode}
                      >
                        <option value="male">Men</option>
                        <option value="female">Women</option>
                        <option value="all">Everyone</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Age Range</FormLabel>
                      <HStack>
                        <Input
                          type="number"
                          value={profile.preferences.ageRange.min}
                          onChange={(e) => handlePreferenceChange('ageRange', {
                            ...profile.preferences.ageRange,
                            min: parseInt(e.target.value)
                          })}
                          disabled={!editMode}
                        />
                        <Text>to</Text>
                        <Input
                          type="number"
                          value={profile.preferences.ageRange.max}
                          onChange={(e) => handlePreferenceChange('ageRange', {
                            ...profile.preferences.ageRange,
                            max: parseInt(e.target.value)
                          })}
                          disabled={!editMode}
                        />
                      </HStack>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Maximum Distance (miles)</FormLabel>
                      <Input
                        type="number"
                        value={profile.preferences.distance}
                        onChange={(e) => handlePreferenceChange('distance', parseInt(e.target.value))}
                        disabled={!editMode}
                      />
                    </FormControl>
                  </VStack>
                </Box>
              </TabPanel>

              {/* Settings Tab */}
              <TabPanel>
                <Box
                  bg={bgColor}
                  p={6}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Heading size="md" mb={6}>Account Settings</Heading>
                  <VStack spacing={6} align="stretch">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Profile Visibility</FormLabel>
                      <Switch colorScheme="purple" isChecked={true} />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Email Notifications</FormLabel>
                      <Switch colorScheme="purple" isChecked={true} />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Push Notifications</FormLabel>
                      <Switch colorScheme="purple" isChecked={true} />
                    </FormControl>

                    <Divider />

                    <VStack spacing={4} align="stretch">
                      <Button colorScheme="purple" variant="outline">
                        Change Password
                      </Button>
                      <Button colorScheme="purple" variant="outline">
                        Privacy Settings
                      </Button>
                      <Button colorScheme="red" variant="outline">
                        Delete Account
                      </Button>
                    </VStack>
                  </VStack>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
};

export default Profile;
