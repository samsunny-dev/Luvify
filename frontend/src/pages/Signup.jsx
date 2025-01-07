import React, { useState } from 'react';
import {
  Box,
  Container,
  Input,
  Button,
  Text,
  VStack,
  Image,
  Select,
  useColorModeValue,
  FormControl,
  FormLabel,
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Logo from '/assets/logo.svg';

const MotionBox = motion(Box);

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '',
    preferredGenders: '',
    interests: '',
    location: '',
  });

  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: Add your API call here
      // const response = await axios.post('/api/signup', formData);
      
      toast({
        title: "Account created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Error creating account",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Logo */}
      <Box position="absolute" top={4} left={4}>
        <RouterLink to="/">
          <Image src={Logo} alt="Luvify Logo" h="40px" />
        </RouterLink>
      </Box>

      <Container maxW="7xl" py={{ base: 20, md: 28 }}>
        <Box
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          gap={8}
          alignItems="center"
        >
          {/* Left Side - Image */}
          <MotionBox
            flex={1}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/assets/couple-illustration.svg"
              alt="Couple Illustration"
              w="full"
              h="auto"
              objectFit="cover"
              rounded="2xl"
            />
          </MotionBox>

          {/* Right Side - Sign Up Form */}
          <MotionBox
            flex={1}
            bg={cardBg}
            p={8}
            rounded="2xl"
            shadow="xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <VStack spacing={6} align="stretch">
              <Text fontSize="3xl" fontWeight="bold">
                Create Account
              </Text>

              <Text fontSize="lg" color="gray.600">
                Find meaningful connections with Luvify
              </Text>

              <VStack as="form" spacing={4} onSubmit={handleSubmit}>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    size="lg"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    size="lg"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    placeholder="E-mail"
                    size="lg"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      placeholder="Password"
                      size="lg"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <InputRightElement h="full">
                      <Button
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      size="lg"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <InputRightElement h="full">
                      <Button
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    name="dob"
                    placeholder="D.O.B"
                    size="lg"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    name="gender"
                    placeholder="Select Gender"
                    size="lg"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Interested In</FormLabel>
                  <Select
                    name="preferredGenders"
                    placeholder="Select Preference"
                    size="lg"
                    value={formData.preferredGenders}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="all">All</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Interests</FormLabel>
                  <Input
                    name="interests"
                    placeholder="Interests (comma separated)"
                    size="lg"
                    value={formData.interests}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    name="location"
                    placeholder="Location"
                    size="lg"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </FormControl>

                <Button
                  type="submit"
                  size="lg"
                  colorScheme="brand"
                  w="full"
                  rounded="xl"
                  isLoading={loading}
                  loadingText="Creating Account..."
                >
                  Sign Up
                </Button>

                <Text textAlign="center">
                  Already have an account?{' '}
                  <RouterLink to="/login" style={{ color: 'var(--chakra-colors-brand-500)', fontWeight: 'semibold' }}>
                    Sign In
                  </RouterLink>
                </Text>
              </VStack>
            </VStack>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
