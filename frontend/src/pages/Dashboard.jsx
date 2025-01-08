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
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  FaHeart,
  FaTimes,
  FaStar,
  FaUndo,
  FaComments,
  FaBell,
  FaUser,
  FaMapMarkerAlt,
  FaBirthdayCake,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch potential matches
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/matches/potential`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfiles(response.data);
        if (response.data.length > 0) {
          setCurrentProfile(response.data[0]);
        }
      } catch (error) {
        toast({
          title: "Error fetching profiles",
          description: error.response?.data?.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Fetch user's matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/matches`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  const handleSwipe = async (liked) => {
    if (!currentProfile) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/matches/swipe`,
        {
          targetUserId: currentProfile.id,
          liked
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Check if it's a match
      if (liked && currentProfile.likedYou) {
        toast({
          title: "It's a match! 🎉",
          description: `You and ${currentProfile.name} liked each other!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onOpen(); // Open match modal
      }

      // Remove current profile and show next
      const nextProfiles = profiles.filter(p => p.id !== currentProfile.id);
      setProfiles(nextProfiles);
      setCurrentProfile(nextProfiles[0] || null);

    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUndo = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/matches/undo`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Refresh profiles
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/matches/potential`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfiles(response.data);
      setCurrentProfile(response.data[0] || null);

      toast({
        title: "Action undone",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Cannot undo",
        description: error.response?.data?.message || "No more actions to undo",
        status: "warning",
        duration: 3000,
      });
    }
  };

  const MatchModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">It's a Match! 🎉</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <Box position="relative" width="full">
              <Image
                src={currentProfile?.images[0]}
                alt={currentProfile?.name}
                borderRadius="full"
                boxSize="150px"
                mx="auto"
                objectFit="cover"
              />
            </Box>
            <Text fontSize="xl" fontWeight="bold">
              You and {currentProfile?.name} liked each other!
            </Text>
            <HStack spacing={4}>
              <Button
                colorScheme="brand"
                leftIcon={<FaComments />}
                onClick={() => {
                  onClose();
                  navigate("/chat", { state: { matchId: currentProfile.id } });
                }}
              >
                Send Message
              </Button>
              <Button variant="outline" onClick={onClose}>
                Keep Swiping
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  if (loading) {
    return (
      <Container maxW="xl" centerContent py={8}>
        <VStack spacing={4} w="full">
          <Skeleton height="400px" width="full" borderRadius="lg" />
          <HStack spacing={4} justify="center" w="full">
            <Skeleton height="50px" width="50px" borderRadius="full" />
            <Skeleton height="50px" width="50px" borderRadius="full" />
            <Skeleton height="50px" width="50px" borderRadius="full" />
          </HStack>
        </VStack>
      </Container>
    );
  }

  if (!currentProfile) {
    return (
      <Container maxW="xl" centerContent py={8}>
        <VStack spacing={4}>
          <Heading size="lg">No More Profiles</Heading>
          <Text>Check back later for more potential matches!</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="xl" centerContent py={8}>
      <AnimatePresence>
        <motion.div
          key={currentProfile.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ width: "100%" }}
        >
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            shadow="xl"
          >
            <Image
              src={currentProfile.images[0]}
              alt={currentProfile.name}
              objectFit="cover"
              w="full"
              h="400px"
            />
            <Box p={6}>
              <Flex align="center" mb={2}>
                <Heading size="lg">
                  {currentProfile.name}, {currentProfile.age}
                </Heading>
                <Spacer />
                <HStack>
                  <Icon as={FaMapMarkerAlt} color="gray.500" />
                  <Text color="gray.500">{currentProfile.distance}</Text>
                </HStack>
              </Flex>
              <Text fontSize="md" color="gray.600" mb={4}>
                {currentProfile.bio}
              </Text>
              <Flex wrap="wrap" gap={2}>
                {currentProfile.interests.map((interest, index) => (
                  <Badge
                    key={index}
                    colorScheme="brand"
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {interest}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>

      <HStack spacing={4} mt={8}>
        <IconButton
          icon={<FaUndo />}
          colorScheme="gray"
          rounded="full"
          size="lg"
          onClick={handleUndo}
        />
        <IconButton
          icon={<FaTimes />}
          colorScheme="red"
          rounded="full"
          size="lg"
          onClick={() => handleSwipe(false)}
        />
        <IconButton
          icon={<FaStar />}
          colorScheme="yellow"
          rounded="full"
          size="lg"
          onClick={() => handleSwipe(true)}
        />
        <IconButton
          icon={<FaHeart />}
          colorScheme="pink"
          rounded="full"
          size="lg"
          onClick={() => handleSwipe(true)}
        />
      </HStack>

      <MatchModal />
    </Container>
  );
};

export default Dashboard;
