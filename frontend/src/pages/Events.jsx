import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  Tag,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
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
  IconButton,
  Flex,
  Spacer,
  useColorModeValue,
  Badge,
  Skeleton,
  SkeletonText,
  Avatar,
  AvatarGroup,
} from '@chakra-ui/react';
import {
  FaSearch,
  FaCalendar,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaPlus,
  FaHeart,
  FaShare,
} from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('upcoming');
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: null,
    maxParticipants: '',
    category: '',
  });

  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events?filter=${filter}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEvents(response.data);
    } catch (error) {
      toast({
        title: 'Error fetching events',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      Object.keys(newEvent).forEach((key) => {
        if (newEvent[key]) {
          formData.append(key, newEvent[key]);
        }
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setEvents((prev) => [...prev, response.data]);
      onClose();
      toast({
        title: 'Event created!',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error creating event',
        description: error.response?.data?.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleJoinEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/join`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state
      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId
            ? {
                ...event,
                isJoined: true,
                participants: [...event.participants, { _id: 'currentUser' }],
              }
            : event
        )
      );

      toast({
        title: 'Joined event!',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error joining event',
        description: error.response?.data?.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const EventCard = ({ event }) => (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-4px)' }}
    >
      <Image
        src={event.image}
        alt={event.title}
        h="200px"
        w="full"
        objectFit="cover"
      />
      <Box p={6}>
        <VStack align="stretch" spacing={4}>
          <Heading size="md">{event.title}</Heading>
          <Text noOfLines={2} color="gray.600">
            {event.description}
          </Text>

          <HStack>
            <Icon as={FaCalendar} color="brand.500" />
            <Text>
              {format(new Date(event.date), 'MMM dd, yyyy')} at {event.time}
            </Text>
          </HStack>

          <HStack>
            <Icon as={FaMapMarkerAlt} color="brand.500" />
            <Text>{event.location}</Text>
          </HStack>

          <HStack>
            <Icon as={FaUsers} color="brand.500" />
            <Text>
              {event.participants.length}/{event.maxParticipants} participants
            </Text>
          </HStack>

          <Badge colorScheme="brand" alignSelf="start">
            {event.category}
          </Badge>

          <Flex align="center" justify="space-between">
            <AvatarGroup size="sm" max={3}>
              {event.participants.map((participant) => (
                <Avatar
                  key={participant._id}
                  name={participant.name}
                  src={participant.avatar}
                />
              ))}
            </AvatarGroup>

            <HStack>
              <IconButton
                icon={<FaShare />}
                variant="ghost"
                colorScheme="brand"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/events/${event._id}`
                  );
                  toast({
                    title: 'Link copied!',
                    status: 'success',
                    duration: 2000,
                  });
                }}
              />
              <Button
                colorScheme="brand"
                isDisabled={
                  event.isJoined ||
                  event.participants.length >= event.maxParticipants
                }
                onClick={() => handleJoinEvent(event._id)}
              >
                {event.isJoined
                  ? 'Joined'
                  : event.participants.length >= event.maxParticipants
                  ? 'Full'
                  : 'Join'}
              </Button>
            </HStack>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );

  const CreateEventModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleCreateEvent}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Event Title</FormLabel>
                <Input
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                />
              </FormControl>

              <HStack w="full">
                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Time</FormLabel>
                  <Input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, time: e.target.value })
                    }
                  />
                </FormControl>
              </HStack>

              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Maximum Participants</FormLabel>
                <Input
                  type="number"
                  value={newEvent.maxParticipants}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, maxParticipants: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  value={newEvent.category}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, category: e.target.value })
                  }
                >
                  <option value="">Select category</option>
                  <option value="Social">Social</option>
                  <option value="Dating">Dating</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Food & Drinks">Food & Drinks</option>
                  <option value="Sports">Sports</option>
                  <option value="Arts & Culture">Arts & Culture</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Event Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, image: e.target.files[0] })
                  }
                />
              </FormControl>

              <Button type="submit" colorScheme="brand" w="full">
                Create Event
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
        <Heading>Events</Heading>
        <Button leftIcon={<FaPlus />} colorScheme="brand" onClick={onOpen}>
          Create Event
        </Button>
      </Flex>

      <Flex gap={4} mb={8} wrap="wrap">
        <InputGroup maxW="md">
          <InputLeftElement>
            <FaSearch />
          </InputLeftElement>
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>

        <Select
          maxW="200px"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
          <option value="joined">My Events</option>
          <option value="hosting">Hosting</option>
        </Select>
      </Flex>

      {loading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Box key={i} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Skeleton height="200px" />
              <Box p={6}>
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : filteredEvents.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Heading size="md">No events found</Heading>
          <Text mt={2}>Try adjusting your search or create a new event</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </SimpleGrid>
      )}

      <CreateEventModal />
    </Container>
  );
};

export default Events;
