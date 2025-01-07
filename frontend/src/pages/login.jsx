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
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { images } from '../assets/images';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bgColor} minH="100vh">
      <Navbar />
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
            <VStack spacing={6} align="center">
              <Icon as={FaHeart} w={12} h={12} color="brand.500" />
              <Heading size="xl" color="brand.500">
                Welcome Back
              </Heading>
              <Text color="gray.600" textAlign="center">
                Sign in to continue your journey to love
              </Text>
            </VStack>

            <Stack spacing={4} mt={8}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  size="lg"
                />
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    size="lg"
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

              <Button colorScheme="brand" size="lg" w="full" mt={6}>
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
                  Find Love Today
                </ChakraLink>
              </Text>

              <ChakraLink
                textAlign="center"
                color="brand.500"
                fontWeight="medium"
              >
                Forgot your password?
              </ChakraLink>
            </Stack>
          </Box>

          {/* Image Section */}
          <Box display={{ base: 'none', md: 'block' }}>
            <VStack spacing={8} align="start">
              <Image
                src={images.login}
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
    </Box>
  );
};

export default Login;
