import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  SimpleGrid,
  Text,
  Button,
  Container,
  Image,
  HStack,
  Tag,
  Input,
  Select,
  Flex,
  IconButton,
  useToast,
  Badge,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaHeart,
  FaSearch,
  FaFilter,
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MotionBox = motion(Box);

// Mock data - replace with API calls
const events = [
  {
    id: 1,
    name: 'Singles Movie Night',
    date: '2024-12-01',
    time: '7:00 PM',
    location: 'Central Cinema',
    description: 'Join us for a romantic comedy night with fellow singles. Includes popcorn and networking!',
    image: '/event1.jpg',
    category: 'Entertainment',
    attendees: 45,
    maxAttendees: 60,
    price: 'Free',
    tags: ['Movies', 'Social', 'Indoor'],
    isInterested: false,
  },
  {
    id: 2,
    name: 'Cooking Class & Wine Tasting',
    date: '2024-12-05',
    time: '6:30 PM',
    location: 'Culinary Institute',
    description: 'Learn to cook exotic dishes while meeting new people. Wine pairing included!',
    image: '/event2.jpg',
    category: 'Food & Drink',
    attendees: 28,
    maxAttendees: 30,
    price: '$45',
    tags: ['Cooking', 'Wine', 'Learning'],
    isInterested: true,
  },
  {
    id: 3,
    name: 'Hiking Adventure',
    date: '2024-12-10',
    time: '9:00 AM',
    location: 'Mountain Trails',
    description: 'A beautiful hiking experience with like-minded outdoor enthusiasts.',
    image: '/event3.jpg',
    category: 'Outdoor',
    attendees: 15,
    maxAttendees: 20,
    price: '$10',
    tags: ['Hiking', 'Nature', 'Active'],
    isInterested: false,
  },
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState(0);
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleInterest = (eventId) => {
    const event = events.find(e => e.id === eventId);
    toast({
      title: event.isInterested ? 'Removed from interested' : 'Added to interested',
      description: event.isInterested 
        ? `You are no longer interested in ${event.name}`
        : `You are now interested in ${event.name}`,
      status: 'success',
      duration: 2000,
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    const matchesTab = (selectedTab === 0) || 
                      (selectedTab === 1 && event.isInterested) ||
                      (selectedTab === 2 && new Date(event.date) > new Date());
    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <>
      <Navbar />
      <Box bg="gray.50" minH="100vh" py={8}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            {/* Header */}
            <Box textAlign="center">
              <Heading size="xl" mb={2}>Discover Events</Heading>
              <Text color="gray.600">
                Meet new people and create memories at our exclusive singles events
              </Text>
            </Box>

            {/* Filters */}
            <Tabs width="100%" onChange={setSelectedTab} colorScheme="purple">
              <TabList>
                <Tab>All Events</Tab>
                <Tab>Interested</Tab>
                <Tab>Upcoming</Tab>
              </TabList>

              <Flex mt={4} gap={4} direction={{ base: 'column', md: 'row' }}>
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg={bgColor}
                  flex={1}
                  leftIcon={<FaSearch />}
                />
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  bg={bgColor}
                  w={{ base: 'full', md: '200px' }}
                >
                  <option value="all">All Categories</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Food & Drink">Food & Drink</option>
                  <option value="Outdoor">Outdoor</option>
                </Select>
              </Flex>

              <TabPanels>
                <TabPanel px={0}>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
                    {filteredEvents.map((event) => (
                      <MotionBox
                        key={event.id}
                        bg={bgColor}
                        borderRadius="xl"
                        overflow="hidden"
                        borderWidth="1px"
                        borderColor={borderColor}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Image
                          src={event.image}
                          alt={event.name}
                          h="200px"
                          w="100%"
                          objectFit="cover"
                          fallbackSrc="https://via.placeholder.com/400x200"
                        />
                        
                        <Box p={6}>
                          <VStack align="stretch" spacing={4}>
                            <Flex justify="space-between" align="center">
                              <Badge colorScheme="purple" fontSize="sm">
                                {event.category}
                              </Badge>
                              <Text color="gray.500" fontSize="sm">
                                {event.price}
                              </Text>
                            </Flex>

                            <Heading size="md">{event.name}</Heading>
                            
                            <Text color="gray.600" noOfLines={2}>
                              {event.description}
                            </Text>

                            <HStack spacing={4} color="gray.600">
                              <HStack>
                                <FaCalendarAlt />
                                <Text fontSize="sm">{event.date}</Text>
                              </HStack>
                              <HStack>
                                <FaClock />
                                <Text fontSize="sm">{event.time}</Text>
                              </HStack>
                            </HStack>

                            <HStack spacing={4} color="gray.600">
                              <HStack>
                                <FaMapMarkerAlt />
                                <Text fontSize="sm">{event.location}</Text>
                              </HStack>
                              <HStack>
                                <FaUsers />
                                <Text fontSize="sm">
                                  {event.attendees}/{event.maxAttendees}
                                </Text>
                              </HStack>
                            </HStack>

                            <Box>
                              {event.tags.map((tag, index) => (
                                <Tag
                                  key={index}
                                  size="sm"
                                  colorScheme="purple"
                                  variant="subtle"
                                  mr={2}
                                  mb={2}
                                >
                                  {tag}
                                </Tag>
                              ))}
                            </Box>

                            <HStack>
                              <Button
                                colorScheme="purple"
                                size="md"
                                flex={1}
                                isDisabled={event.attendees >= event.maxAttendees}
                              >
                                {event.attendees >= event.maxAttendees ? 'Sold Out' : 'RSVP Now'}
                              </Button>
                              <IconButton
                                icon={<FaHeart />}
                                colorScheme={event.isInterested ? 'red' : 'gray'}
                                variant="ghost"
                                aria-label="Interest"
                                onClick={() => handleInterest(event.id)}
                              />
                            </HStack>
                          </VStack>
                        </Box>
                      </MotionBox>
                    ))}
                  </SimpleGrid>
                </TabPanel>
                <TabPanel>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {/* Same event cards but filtered for interested events */}
                  </SimpleGrid>
                </TabPanel>
                <TabPanel>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {/* Same event cards but filtered for upcoming events */}
                  </SimpleGrid>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Events;
