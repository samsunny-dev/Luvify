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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Badge,
  Avatar,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import {
  FaSearch,
  FaUsers,
  FaMapMarkerAlt,
  FaHeart,
  FaPlus,
  FaEdit,
  FaComment,
  FaShare,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
    tags: [],
    location: "",
    image: null,
  });
  
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    fetchCommunities();
  }, [filter]);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/communities${
          filter !== "all" ? `?filter=${filter}` : ""
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCommunities(response.data);
    } catch (error) {
      toast({
        title: "Error fetching communities",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCommunity = async (communityId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/communities/${communityId}/join`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Update local state
      setCommunities((prev) =>
        prev.map((comm) =>
          comm._id === communityId ? { ...comm, isJoined: true } : comm
        )
      );

      toast({
        title: "Joined community!",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error joining community",
        description: error.response?.data?.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      Object.keys(newCommunity).forEach((key) => {
        if (newCommunity[key]) {
          formData.append(key, newCommunity[key]);
        }
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/communities`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCommunities((prev) => [...prev, response.data]);
      onCreateClose();
      toast({
        title: "Community created!",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error creating community",
        description: error.response?.data?.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  const filteredCommunities = communities.filter(
    (community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const CommunityCard = ({ community }) => (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-4px)" }}
    >
      <Image
        src={community.image}
        alt={community.name}
        h="200px"
        w="full"
        objectFit="cover"
      />
      <Box p={6}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md">{community.name}</Heading>
          <HStack>
            <FaUsers />
            <Text>{community.members} members</Text>
          </HStack>
        </Flex>
        <Text noOfLines={2} mb={4}>
          {community.description}
        </Text>
        <HStack spacing={2} mb={4}>
          {community.tags.map((tag, index) => (
            <Tag
              key={index}
              colorScheme="brand"
              size="sm"
            >
              {tag}
            </Tag>
          ))}
        </HStack>
        <Flex justify="space-between" align="center">
          <HStack>
            <FaMapMarkerAlt />
            <Text fontSize="sm">{community.location}</Text>
          </HStack>
          <Button
            colorScheme={community.isJoined ? "gray" : "brand"}
            onClick={() =>
              community.isJoined
                ? null
                : handleJoinCommunity(community._id)
            }
          >
            {community.isJoined ? "Joined" : "Join"}
          </Button>
        </Flex>
      </Box>
    </Box>
  );

  const CreateCommunityModal = () => (
    <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Community</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleCreateCommunity}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Community Name</FormLabel>
                <Input
                  value={newCommunity.name}
                  onChange={(e) =>
                    setNewCommunity({ ...newCommunity, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newCommunity.description}
                  onChange={(e) =>
                    setNewCommunity({
                      ...newCommunity,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  value={newCommunity.location}
                  onChange={(e) =>
                    setNewCommunity({
                      ...newCommunity,
                      location: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Community Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewCommunity({
                      ...newCommunity,
                      image: e.target.files[0],
                    })
                  }
                />
              </FormControl>

              <Button type="submit" colorScheme="brand" w="full">
                Create Community
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading>Communities</Heading>
        <Button
          leftIcon={<FaPlus />}
          colorScheme="brand"
          onClick={onCreateOpen}
        >
          Create Community
        </Button>
      </Flex>

      <Flex gap={4} mb={8} wrap="wrap">
        <InputGroup maxW="md">
          <InputLeftElement>
            <FaSearch />
          </InputLeftElement>
          <Input
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>

        <Select
          maxW="200px"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Communities</option>
          <option value="joined">My Communities</option>
          <option value="trending">Trending</option>
          <option value="new">Newest</option>
        </Select>
      </Flex>

      {loading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Box
              key={i}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Skeleton height="200px" />
              <Box p={6}>
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : filteredCommunities.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Heading size="md">No communities found</Heading>
          <Text mt={2}>Try adjusting your search or create a new community</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredCommunities.map((community) => (
            <CommunityCard key={community._id} community={community} />
          ))}
        </SimpleGrid>
      )}

      <CreateCommunityModal />
    </Container>
  );
};

export default Communities;
