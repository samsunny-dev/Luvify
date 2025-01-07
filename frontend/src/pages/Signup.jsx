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
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add sign up logic here
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Logo */}
      <Box position="absolute" top={4} left={4}>
        <RouterLink to="/">
          <Image src="/logo.png" alt="Luvify Logo" h="40px" />
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
              src="/couple-beach.jpg"
              alt="Couple on Beach"
              w="full"
              h="800px"
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
                "You deserve better, so we've designed great ways for you to date more and stress less."
              </Text>

              <VStack as="form" spacing={4} onSubmit={handleSubmit}>
                <FormControl>
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    size="lg"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    size="lg"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    name="email"
                    placeholder="E-mail"
                    size="lg"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
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
                  <Select
                    name="gender"
                    placeholder="Gender"
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
                  <Select
                    name="preferredGenders"
                    placeholder="Preferred Genders"
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
                  <Input
                    name="interests"
                    placeholder="Interests (comma separated)"
                    size="lg"
                    value={formData.interests}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
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
                  colorScheme="blue"
                  w="full"
                  rounded="xl"
                >
                  Sign Up
                </Button>
              </VStack>

              <Text textAlign="center" color="gray.600">
                Already have an account?{' '}
                <RouterLink to="/signin">
                  <Text as="span" color="blue.500" fontWeight="bold">
                    Sign In
                  </Text>
                </RouterLink>
              </Text>
            </VStack>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
