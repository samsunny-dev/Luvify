import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Tag,
  useToast,
  Flex,
  Select,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaSearch, FaUsers, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { communityService } from "../services/communityService";

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const toast = useToast();
  
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const data = await communityService.getAllCommunities();
        // Simulated data - replace with actual API response
        const mockData = [
          {
            _id: "1",
            name: "Outdoor Adventures",
            description: "Connect with fellow adventure seekers and explore the great outdoors together!",
            members: 1234,
            location: "Global",
            image: "/community1.jpg",
            tags: ["Hiking", "Camping", "Nature"],
            isJoined: false,
          },
          {
            _id: "2",
            name: "Coffee Lovers",
            description: "For those who appreciate the perfect brew and great conversations.",
            members: 856,
            location: "New York",
            image: "/community2.jpg",
            tags: ["Coffee", "Cafes", "Social"],
            isJoined: true,
          },
          // Add more mock communities
        ];
        setCommunities(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const handleJoinCommunity = async (communityId) => {
    try {
      // Toggle join status
      setCommunities(communities.map(comm => 
        comm._id === communityId 
          ? { ...comm, isJoined: !comm.isJoined }
          : comm
      ));

      toast({
        title: "Success!",
        description: "Community membership updated",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update membership",
        status: "error",
        duration: 2000,
      });
    }
  };

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || 
                         (filter === "joined" && community.isJoined) ||
                         (filter === "available" && !community.isJoined);
    return matchesSearch && matchesFilter;
  });

  if (loading) return (
    <Container maxW="container.xl" centerContent py={20}>
      <Text>Loading communities...</Text>
    </Container>
  );

  if (error) return (
    <Container maxW="container.xl" centerContent py={20}>
      <Text color="red.500">Error: {error}</Text>
    </Container>
  );

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading size="xl" mb={2}>Find Your Tribe</Heading>
            <Text color="gray.600">
              Join communities that match your interests and connect with like-minded people
            </Text>
          </Box>

          {/* Search and Filter */}
          <Flex direction={{ base: "column", md: "row" }} gap={4}>
            <InputGroup flex={1}>
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Search communities..."
                bg={bgColor}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <Select
              w={{ base: "full", md: "200px" }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              bg={bgColor}
            >
              <option value="all">All Communities</option>
              <option value="joined">Joined</option>
              <option value="available">Available</option>
            </Select>
          </Flex>

          {/* Communities Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredCommunities.map((community) => (
              <Box
                key={community._id}
                bg={bgColor}
                borderRadius="xl"
                overflow="hidden"
                borderWidth="1px"
                borderColor={borderColor}
                transition="transform 0.2s"
                _hover={{ transform: "translateY(-4px)" }}
              >
                <Image
                  src={community.image}
                  alt={community.name}
                  h="200px"
                  w="100%"
                  objectFit="cover"
                  fallbackSrc="https://via.placeholder.com/400x200"
                />
                
                <Box p={6}>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md">{community.name}</Heading>
                    <Text color="gray.600" noOfLines={2}>
                      {community.description}
                    </Text>
                    
                    <HStack spacing={4}>
                      <HStack>
                        <FaUsers />
                        <Text>{community.members} members</Text>
                      </HStack>
                      <HStack>
                        <FaMapMarkerAlt />
                        <Text>{community.location}</Text>
                      </HStack>
                    </HStack>

                    <Box>
                      {community.tags.map((tag, index) => (
                        <Tag
                          key={index}
                          mr={2}
                          mb={2}
                          colorScheme="purple"
                          variant="subtle"
                        >
                          {tag}
                        </Tag>
                      ))}
                    </Box>

                    <Button
                      colorScheme={community.isJoined ? "gray" : "purple"}
                      variant={community.isJoined ? "outline" : "solid"}
                      onClick={() => handleJoinCommunity(community._id)}
                      leftIcon={<FaHeart />}
                    >
                      {community.isJoined ? "Leave Community" : "Join Community"}
                    </Button>
                  </VStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Communities;
