<<<<<<< HEAD
import React from 'react'

export default function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}
=======
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Image,
  Text,
  IconButton,
  useToast,
  Heading,
  Badge,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";
import {
  FaHeart,
  FaTimes,
  FaStar,
  FaUndo,
  FaComments,
  FaBell,
  FaUser,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const toast = useToast();

  // Simulated profiles data - replace with API call
  useEffect(() => {
    setProfiles([
      {
        id: 1,
        name: "Sarah",
        age: 28,
        location: "New York",
        bio: "Adventure seeker and coffee lover ☕",
        interests: ["Hiking", "Photography", "Travel"],
        images: ["/profile1.jpg"],
        distance: "5 miles away",
      },
      // Add more profiles here
    ]);
  }, []);

  useEffect(() => {
    if (profiles.length > 0 && !currentProfile) {
      setCurrentProfile(profiles[0]);
    }
  }, [profiles, currentProfile]);

  const handleSwipe = (direction) => {
    if (!currentProfile) return;

    // Animation and logic for swiping
    const isLike = direction === "right";
    const isSuperLike = direction === "up";

    if (isLike || isSuperLike) {
      toast({
        title: isSuperLike ? "Super Like!" : "It's a Match!",
        status: "success",
        duration: 2000,
      });
    }

    // Remove current profile and show next
    setProfiles((prev) => prev.filter((p) => p.id !== currentProfile.id));
    setCurrentProfile(profiles[1] || null);
  };

  if (!currentProfile) {
    return (
      <Container centerContent py={20}>
        <VStack spacing={4}>
          <Heading>No More Profiles</Heading>
          <Text>Check back later for more matches!</Text>
          <Button colorScheme="purple" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Navigation Bar */}
      <Box bg="white" py={4} shadow="sm">
        <Container maxW="container.xl">
          <Flex align="center">
            <Heading size="md" color="purple.500">
              Luvify
            </Heading>
            <Spacer />
            <HStack spacing={4}>
              <IconButton
                icon={<FaComments />}
                variant="ghost"
                aria-label="Messages"
              />
              <IconButton
                icon={<FaBell />}
                variant="ghost"
                aria-label="Notifications"
              />
              <IconButton
                icon={<FaUser />}
                variant="ghost"
                aria-label="Profile"
              />
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.md" py={8}>
        <AnimatePresence>
          <motion.div
            key={currentProfile.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              bg="white"
              borderRadius="2xl"
              overflow="hidden"
              shadow="xl"
              position="relative"
            >
              <Image
                src={currentProfile.images[0]}
                alt={currentProfile.name}
                w="100%"
                h="600px"
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/600"
              />

              {/* Profile Info Overlay */}
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="rgba(0,0,0,0.5)"
                color="white"
                p={6}
              >
                <VStack align="start" spacing={2}>
                  <Heading size="lg">
                    {currentProfile.name}, {currentProfile.age}
                  </Heading>
                  <Text>{currentProfile.location}</Text>
                  <Text>{currentProfile.distance}</Text>
                  <HStack spacing={2}>
                    {currentProfile.interests.map((interest, index) => (
                      <Badge
                        key={index}
                        colorScheme="purple"
                        variant="solid"
                        rounded="full"
                        px={3}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </HStack>
                  <Text>{currentProfile.bio}</Text>
                </VStack>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <HStack justify="center" spacing={8} mt={8}>
          <IconButton
            icon={<FaUndo />}
            aria-label="Undo"
            colorScheme="gray"
            size="lg"
            isRound
            onClick={() => handleSwipe("undo")}
          />
          <IconButton
            icon={<FaTimes />}
            aria-label="Dislike"
            colorScheme="red"
            size="lg"
            isRound
            onClick={() => handleSwipe("left")}
          />
          <IconButton
            icon={<FaStar />}
            aria-label="Super Like"
            colorScheme="blue"
            size="lg"
            isRound
            onClick={() => handleSwipe("up")}
          />
          <IconButton
            icon={<FaHeart />}
            aria-label="Like"
            colorScheme="green"
            size="lg"
            isRound
            onClick={() => handleSwipe("right")}
          />
        </HStack>
      </Container>
    </Box>
  );
};

export default Dashboard;
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
