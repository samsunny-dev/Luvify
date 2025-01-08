import React, { useState } from 'react';
import {
  Box,
  Container,
  Input,
  Button,
  Text,
  VStack,
  Image,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGoogle, FaInstagram } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Add sign in logic here
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
              src="/couple-minimal.jpg"
              alt="Couple"
              w="full"
              h="600px"
              objectFit="cover"
              rounded="2xl"
            />
          </MotionBox>

          {/* Right Side - Sign In Form */}
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
                Welcome Back!
              </Text>

              <VStack as="form" spacing={4} onSubmit={handleSignIn}>
                <Input
                  placeholder="E-mail"
                  size="lg"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  size="lg"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  size="lg"
                  colorScheme="brand"
                  w="full"
                  rounded="xl"
                >
                  Sign In
                </Button>
              </VStack>

              <Text textAlign="center" color="gray.500">
                Or continue with
              </Text>

              <HStack justify="center" spacing={4}>
                <IconButton
                  icon={<FaGoogle />}
                  aria-label="Sign in with Google"
                  rounded="full"
                  size="lg"
                  colorScheme="red"
                />
                <IconButton
                  icon={<FaInstagram />}
                  aria-label="Sign in with Instagram"
                  rounded="full"
                  size="lg"
                  colorScheme="pink"
                />
              </HStack>

              <Text textAlign="center" color="gray.600">
                Don't have an account?{' '}
                <RouterLink to="/signup">
                  <Text as="span" color="brand.500" fontWeight="bold">
                    Sign Up
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

export default SignIn;
