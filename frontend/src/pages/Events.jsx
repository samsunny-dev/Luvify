import React from 'react';
import { Box, Heading, VStack, SimpleGrid, Text, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MotionBox = motion(Box);

const events = [
  { id: 1, name: 'Movie Night', date: '2024-12-01', description: 'Watch a movie with friends.' },
  { id: 2, name: 'Cooking Workshop', date: '2024-12-05', description: 'Learn to cook exotic dishes.' },
  { id: 3, name: 'Hiking Trip', date: '2024-12-10', description: 'Join us for an adventure.' },
];

const Events = () => (
  <>
    <Navbar />
    <Box as="main" py={10} px={5}>
      <Heading textAlign="center" color="pink.500" mb={8}>
        Upcoming Events
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {events.map((event) => (
          <MotionBox
            key={event.id}
            bg="blue.100"
            p={5}
            borderRadius="md"
            shadow="sm"
            whileHover={{ scale: 1.05, translateY: -10 }}
            transition={{ duration: 0.3 }}
          >
            <VStack spacing={3}>
              <Heading size="md">{event.name}</Heading>
              <Text fontSize="sm" color="blue.600">
                {event.date}
              </Text>
              <Text>{event.description}</Text>
              <Button size="sm" colorScheme="blue">
                RSVP
              </Button>
            </VStack>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
    <Footer />
  </>
);

export default Events;
