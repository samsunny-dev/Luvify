import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Switch,
  Button,
  useColorModeValue,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  SimpleGrid,
  Icon,
  useToast,
} from '@chakra-ui/react';
import {
  FaBell,
  FaLock,
  FaGlobe,
  FaUserShield,
  FaSignOutAlt,
  FaTrash,
} from 'react-icons/fa';

const SettingSection = ({ title, icon, children }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      shadow="md"
    >
      <HStack mb={6}>
        <Icon as={icon} boxSize={5} color="brand.500" />
        <Heading size="md">{title}</Heading>
      </HStack>
      <VStack spacing={4} align="stretch">
        {children}
      </VStack>
    </Box>
  );
};

const Settings = () => {
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your preferences have been updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleLogout = () => {
    // Handle logout logic
  };

  const handleDeleteAccount = () => {
    // Handle account deletion logic
  };

  return (
    <Box minH="100vh" bg={bgColor} pt={20}>
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {/* Notifications Settings */}
            <SettingSection title="Notifications" icon={FaBell}>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Push Notifications</FormLabel>
                <Switch colorScheme="brand" defaultChecked />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Email Notifications</FormLabel>
                <Switch colorScheme="brand" defaultChecked />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">New Match Alerts</FormLabel>
                <Switch colorScheme="brand" defaultChecked />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Message Notifications</FormLabel>
                <Switch colorScheme="brand" defaultChecked />
              </FormControl>
            </SettingSection>

            {/* Privacy Settings */}
            <SettingSection title="Privacy" icon={FaLock}>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Profile Visibility</FormLabel>
                <Switch colorScheme="brand" defaultChecked />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Online Status</FormLabel>
                <Switch colorScheme="brand" defaultChecked />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Last Active</FormLabel>
                <Switch colorScheme="brand" defaultChecked />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Read Receipts</FormLabel>
                <Switch colorScheme="brand" defaultChecked />
              </FormControl>
            </SettingSection>

            {/* Location Settings */}
            <SettingSection title="Location" icon={FaGlobe}>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input placeholder="New York, USA" />
              </FormControl>
              <FormControl>
                <FormLabel>Distance Preference</FormLabel>
                <Select defaultValue="50">
                  <option value="10">10 miles</option>
                  <option value="25">25 miles</option>
                  <option value="50">50 miles</option>
                  <option value="100">100 miles</option>
                  <option value="any">Any Distance</option>
                </Select>
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Distance</FormLabel>
                <Switch colorScheme="brand" defaultChecked />
              </FormControl>
            </SettingSection>

            {/* Account Settings */}
            <SettingSection title="Account" icon={FaUserShield}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" value="user@example.com" isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input type="tel" placeholder="+1 (555) 000-0000" />
              </FormControl>
              <Button colorScheme="brand" onClick={() => {}}>
                Change Password
              </Button>
            </SettingSection>
          </SimpleGrid>

          <Divider />

          {/* Action Buttons */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Button
              leftIcon={<FaSignOutAlt />}
              variant="outline"
              colorScheme="brand"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
            <Button
              leftIcon={<FaTrash />}
              variant="outline"
              colorScheme="red"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </SimpleGrid>

          {/* Save Button */}
          <Button
            colorScheme="brand"
            size="lg"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default Settings;
