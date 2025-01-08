import React from 'react';
<<<<<<< HEAD
import { Box, Container, Heading, Text, Button, Stack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Stack spacing={8} direction={{ base: 'column', md: 'row' }} align="center">
        <Box flex={1}>
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to Luvfy
          </Heading>
          <Text fontSize="xl" mb={6}>
            Connect, Share, and Find Your Perfect Match
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
            <Link to="/signup">
              <Button colorScheme="teal" size="lg">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button colorScheme="teal" variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </Stack>
        </Box>
        <Box flex={1}>
          <Image 
            src="https://via.placeholder.com/500x300"
            alt="Dating illustration"
            borderRadius="lg"
            fallbackSrc="https://via.placeholder.com/500x300"
          />
        </Box>
      </Stack>
    </Container>
=======
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Flex,
  chakra,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaHeart,
  FaComments,
  FaUserFriends,
  FaSearch,
  FaStar,
  FaArrowRight,
} from 'react-icons/fa';
import { pageTransitions, staggerContainer, staggerItem, float, pulse } from '../components/animations';
import Logo from '/assets/logo.svg';
import HeroBg from '/assets/hero-bg.svg';
import CoupleIllustration from '/assets/couple-illustration.svg';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

const Feature = ({ icon, title, description }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      p={8}
      bg={useColorModeValue('white', 'gray.800')}
      rounded="2xl"
      shadow="lg"
      textAlign="center"
    >
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="brand.500"
        mb={4}
        mx="auto"
      >
        <Icon as={icon} boxSize={8} />
      </Flex>
      <Heading size="md" mb={4}>
        {title}
      </Heading>
      <Text color="gray.500">{description}</Text>
    </MotionBox>
  );
};

const Statistic = ({ number, label }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      textAlign="center"
    >
      <Heading
        size="3xl"
        bgGradient="linear(to-r, brand.400, brand.600)"
        bgClip="text"
      >
        {number}
      </Heading>
      <Text color="gray.500" fontSize="lg">
        {label}
      </Text>
    </MotionBox>
  );
};

const Landing = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.800', 'white');

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Hero Section */}
      <Box
        position="relative"
        bgImage={`url(${HeroBg})`}
        bgSize="cover"
        bgPosition="center"
        py={20}
      >
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={20} alignItems="center">
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Heading
                as="h1"
                size="3xl"
                color={headingColor}
                lineHeight="shorter"
                mb={6}
              >
                Find Your Perfect Match with{' '}
                <chakra.span color="brand.500">Luvify</chakra.span>
              </Heading>
              <Text fontSize="xl" color={textColor} mb={8}>
                Experience the magic of meaningful connections. Join thousands of people who have found their perfect match on Luvify.
              </Text>
              <HStack spacing={4}>
                <Button
                  as={RouterLink}
                  to="/signup"
                  size="lg"
                  colorScheme="brand"
                  rightIcon={<FaArrowRight />}
                >
                  Get Started
                </Button>
                <Button
                  as={RouterLink}
                  to="/login"
                  size="lg"
                  variant="outline"
                  colorScheme="brand"
                >
                  Sign In
                </Button>
              </HStack>
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image src={CoupleIllustration} alt="Couple Illustration" />
            </MotionBox>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <Box textAlign="center" maxW="2xl" mx="auto">
              <Heading color={headingColor} mb={4}>
                Why Choose Luvify?
              </Heading>
              <Text fontSize="lg" color={textColor}>
                Discover what makes Luvify the perfect platform for finding meaningful connections.
              </Text>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              <Feature
                icon={FaHeart}
                title="Smart Matching"
                description="Our advanced algorithm ensures you meet people who truly match your interests and values."
              />
              <Feature
                icon={FaUserFriends}
                title="Verified Profiles"
                description="Feel secure knowing that all profiles are verified and authentic."
              />
              <Feature
                icon={FaComments}
                title="Meaningful Conversations"
                description="Connect through rich conversations with icebreakers and conversation starters."
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box bg={useColorModeValue('white', 'gray.800')} py={20}>
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Statistic number="1M+" label="Active Users" />
            <Statistic number="500K" label="Successful Matches" />
            <Statistic number="4.8" label="App Rating" />
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20}>
        <Container maxW="3xl" textAlign="center">
          <Heading color={headingColor} mb={6}>
            Ready to Find Your Perfect Match?
          </Heading>
          <Text fontSize="lg" color={textColor} mb={8}>
            Join Luvify today and start your journey to finding meaningful connections. Your perfect match is just a click away.
          </Text>
          <Button
            as={RouterLink}
            to="/signup"
            size="lg"
            colorScheme="brand"
            rightIcon={<FaArrowRight />}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
  );
};

export default Landing;
