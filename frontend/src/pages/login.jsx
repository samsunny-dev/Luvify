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
import { authService } from '../services/api';
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
    try {
      setLoading(true);
      const response = await authService.login(formData);
      
      toast({
        title: 'Login successful!',
        description: 'Welcome back to Luvify!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Store the token
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Logo */}
      <Box position="absolute" top={4} left={4}>
        <Link to="/">
          <Image src={Logo} alt="Luvify Logo" h="40px" />
        </Link>
      </Box>

      <Container maxW="7xl" py={20}>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
          {/* Left side - Login Form */}
          <Box
            p={8}
            bg={cardBg}
            borderRadius="xl"
            boxShadow="xl"
            w="full"
            maxW="md"
            mx="auto"
          >
            <VStack spacing={8} align="stretch">
              <VStack spacing={2}>
                <Heading size="xl" color="brand.500">
                  Welcome Back
                </Heading>
                <Text color="gray.500">
                  Find your perfect match with Luvify
                </Text>
              </VStack>

              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    w="full"
                    isLoading={loading}
                  >
                    Sign In
                  </Button>
                </VStack>
              </form>

              <Text textAlign="center">
                Don't have an account?{' '}
                <ChakraLink as={Link} to="/signup" color="brand.500">
                  Sign up
                </ChakraLink>
              </Text>
            </VStack>
          </Box>

          {/* Right side - Decorative */}
          <VStack
            display={{ base: 'none', md: 'flex' }}
            spacing={8}
            align="center"
            justify="center"
          >
            <Icon as={FaHeart} w={32} h={32} color="brand.500" />
            <VStack spacing={4} textAlign="center" maxW="md">
              <Heading size="2xl" color="brand.500">
                Find Love Today
              </Heading>
              <Text fontSize="xl" color="gray.500">
                Join thousands of people who have found their perfect match on
                Luvify
              </Text>
            </VStack>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
