import React from 'react';
import { Box, Heading, VStack, SimpleGrid, Text, Button, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MotionBox = motion(Box);

const users = [
  { id: 1, name: 'John Doe', role: 'Member' },
  { id: 2, name: 'Jane Smith', role: 'Moderator' },
  { id: 3, name: 'Sam Wilson', role: 'Member' },
];

const ModerationDashboard = () => (
  <>
    <Navbar />
    <Box as="main" py={10} px={5}>
      <Heading textAlign="center" color="red.500" mb={8}>
        Moderation Dashboard
      </Heading>
      <SimpleGrid columns={[1, 2]} spacing={6}>
        {users.map((user) => (
          <MotionBox
            key={user.id}
            bg="red.100"
            p={5}
            borderRadius="md"
            shadow="sm"
            whileHover={{ scale: 1.05, translateY: -10 }}
            transition={{ duration: 0.3 }}
          >
            <VStack spacing={3}>
              <Heading size="md">{user.name}</Heading>
              <Text>Role: {user.role}</Text>
              <HStack spacing={4}>
                <Button size="sm" colorScheme="red">
                  Ban
                </Button>
                <Button size="sm" colorScheme="yellow">
                  Promote
                </Button>
              </HStack>
            </VStack>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
    <Footer />
  </>
);

export default ModerationDashboard;
