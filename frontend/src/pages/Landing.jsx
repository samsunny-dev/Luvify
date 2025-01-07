import React from 'react';
import { Box, Container, Heading, Text, Button, Stack, Image, Grid, VStack, HStack, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaHeart, FaUserFriends, FaCalendarAlt } from 'react-icons/fa';

const Landing = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="orange.100" py={20}>
        <Container maxW="container.xl">
          <Stack spacing={8} direction={{ base: 'column', md: 'row' }} align="center">
            <Box flex={1}>
              <Heading as="h1" size="2xl" mb={4}>
                Match Me
              </Heading>
              <Text fontSize="xl" mb={6}>
                Find Your Perfect Match With Us.
              </Text>
              <Link to="/signup">
                <Button colorScheme="purple" size="lg" rounded="full">
                  Get Started
                </Button>
              </Link>
            </Box>
            <Box flex={1}>
              <Image 
                src="/couple-hero.jpg"
                alt="Happy couple"
                borderRadius="lg"
                fallbackSrc="https://via.placeholder.com/500x300"
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            {/* Main Feature Image */}
            <Box w="100%" position="relative">
              <Image
                src="/couple-outdoors.jpg"
                alt="Couple outdoors"
                w="100%"
                h="400px"
                objectFit="cover"
                borderRadius="xl"
              />
            </Box>

            {/* Swipe Match Celebrate Section */}
            <Box textAlign="center" w="100%">
              <Heading mb={8}>SWIPE. MATCH. CELEBRATE.</Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
                <Image
                  src="/card1.jpg"
                  alt="Dating card"
                  borderRadius="xl"
                  transform="rotate(-5deg)"
                />
                <Image
                  src="/card2.jpg"
                  alt="Dating card"
                  borderRadius="xl"
                />
                <Image
                  src="/card3.jpg"
                  alt="Dating card"
                  borderRadius="xl"
                  transform="rotate(5deg)"
                />
              </Grid>
            </Box>

            {/* Community Section */}
            <Box w="100%" bg="green.50" p={10} borderRadius="xl">
              <Stack direction={{ base: 'column', md: 'row' }} spacing={8} align="center">
                <Box flex={1}>
                  <Image
                    src="/community-couple.jpg"
                    alt="Community couple"
                    borderRadius="xl"
                  />
                </Box>
                <VStack flex={1} align="start" spacing={4}>
                  <Heading>"YOUR VIBE ATTRACTS YOUR TRIBE"</Heading>
                  <Text fontSize="lg">Join our vibrant communities and connect with like-minded people.</Text>
                  <Link to="/communities">
                    <Button colorScheme="green" size="lg" rounded="full">
                      Join Communities
                    </Button>
                  </Link>
                </VStack>
              </Stack>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Navigation */}
      <Box position="fixed" top={0} left={0} right={0} bg="white" py={4} px={8} boxShadow="sm">
        <Container maxW="container.xl">
          <HStack justify="space-between">
            <Link to="/">
              <Box fontSize="2xl" fontWeight="bold">Luvify</Box>
            </Link>
            <HStack spacing={8}>
              <Link to="/events">Events</Link>
              <Link to="/communities">Communities</Link>
              <Link to="/signin">Sign In</Link>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
