<<<<<<< HEAD
import { useState } from "react";
import { Box, FormControl, FormLabel, Input, Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login({ email, password });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
=======
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Link as ChakraLink,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/assets/logo.svg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
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
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Required fields missing",
        description: "Please enter both email and password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: Add your API call here
      // const response = await axios.post('/api/login', formData);
      
      toast({
        title: "Login successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
    }
  };

  return (
<<<<<<< HEAD
    <Box p={8} maxW="lg" mx="auto">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg">Log In</Button>
        </Stack>
      </form>
=======
    <Box bg={bgColor} minH="100vh">
      {/* Logo */}
      <Box position="absolute" top={4} left={4}>
        <Link to="/">
          <Image src={Logo} alt="Luvify Logo" h="40px" />
        </Link>
      </Box>

      <Container maxW="7xl" py={{ base: 20, md: 28 }}>
        <Grid
          templateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gap={8}
          alignItems="center"
        >
          {/* Form Section */}
          <Box
            bg={cardBg}
            p={8}
            rounded="2xl"
            shadow="xl"
            w="full"
            maxW="md"
            mx="auto"
          >
            <VStack spacing={6} align="center" as="form" onSubmit={handleSubmit}>
              <Icon as={FaHeart} w={12} h={12} color="brand.500" />
              <Heading size="xl" color="brand.500">
                Welcome Back
              </Heading>
              <Text color="gray.600" textAlign="center">
                Sign in to continue your journey to love
              </Text>

              <Stack spacing={4} w="full">
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    size="lg"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      size="lg"
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

                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  w="full"
                  mt={6}
                  isLoading={loading}
                  loadingText="Signing in..."
                >
                  Sign In
                </Button>

                <Text textAlign="center" mt={4}>
                  Don't have an account?{' '}
                  <ChakraLink
                    as={Link}
                    to="/signup"
                    color="brand.500"
                    fontWeight="semibold"
                  >
                    Create Account
                  </ChakraLink>
                </Text>

                <ChakraLink
                  as={Link}
                  to="/forgot-password"
                  textAlign="center"
                  color="brand.500"
                  fontWeight="medium"
                >
                  Forgot your password?
                </ChakraLink>
              </Stack>
            </VStack>
          </Box>

          {/* Image Section */}
          <Box display={{ base: 'none', md: 'block' }}>
            <VStack spacing={8} align="start">
              <Image
                src="/assets/couple-illustration.svg"
                alt="Love Illustration"
                borderRadius="2xl"
                shadow="2xl"
              />
              <Box>
                <Heading size="md" mb={4}>
                  Find Your Perfect Match
                </Heading>
                <Text color="gray.600" fontSize="lg">
                  Join thousands of singles who have found meaningful relationships through Luvify.
                  Your perfect match is just a click away!
                </Text>
              </Box>
            </VStack>
          </Box>
        </Grid>
      </Container>
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
    </Box>
  );
};

export default Login;
