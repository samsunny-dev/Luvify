import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Tag,
  Avatar,
  AvatarGroup,
  useColorModeValue,
  Icon,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendar, FaUsers, FaSearch, FaFilter } from 'react-icons/fa';

const MotionBox = motion(Box);

const EventCard = ({ event }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <MotionBox
      bg={cardBg}
      rounded="xl"
      overflow="hidden"
      shadow="lg"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Box position="relative">
        <Image
          src={event.image}
          alt={event.title}
          h="200px"
          w="100%"
          objectFit="cover"
        />
        <Badge
          position="absolute"
          top={4}
          right={4}
          colorScheme={event.category.color}
          px={3}
          py={1}
          borderRadius="full"
        >
          {event.category.name}
        </Badge>
      </Box>

      <Box p={6}>
        <VStack align="start" spacing={4}>
          <Heading size="md">{event.title}</Heading>
          
          <HStack color="gray.500" spacing={4}>
            <HStack>
              <Icon as={FaCalendar} />
              <Text fontSize="sm">{event.date}</Text>
            </HStack>
            <HStack>
              <Icon as={FaMapMarkerAlt} />
              <Text fontSize="sm">{event.location}</Text>
            </HStack>
          </HStack>

          <Text noOfLines={2} color="gray.600">
            {event.description}
          </Text>

          <HStack justify="space-between" w="100%">
            <AvatarGroup size="sm" max={3}>
              {event.attendees.map((attendee, index) => (
                <Avatar
                  key={index}
                  name={attendee.name}
                  src={attendee.image}
                />
              ))}
            </AvatarGroup>
            <Text fontSize="sm" color="gray.500">
              {event.attendees.length} attending
            </Text>
          </HStack>

          <Button colorScheme="brand" size="sm" w="100%">
            Join Event
          </Button>
        </VStack>
      </Box>
    </MotionBox>
  );
};

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Singles Mixer Night',
      date: 'Fri, Jan 12 • 8:00 PM',
      location: 'The Rooftop Lounge, NYC',
      description: 'Join us for a night of mingling, music, and making connections! Complimentary drinks and appetizers provided.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
      category: { name: 'Social', color: 'pink' },
      attendees: [
        { name: 'John Doe', image: 'https://bit.ly/dan-abramov' },
        { name: 'Jane Smith', image: 'https://bit.ly/sage-adebayo' },
        { name: 'Mike Johnson', image: 'https://bit.ly/kent-c-dodds' },
        { name: 'Sarah Williams', image: 'https://bit.ly/ryan-florence' },
      ],
    },
    {
      id: 2,
      title: 'Speed Dating @ Central Park',
      date: 'Sat, Jan 13 • 3:00 PM',
      location: 'Central Park, NYC',
      description: 'Experience speed dating in the beautiful outdoors! Meet 10+ potential matches in a relaxed environment.',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
      category: { name: 'Dating', color: 'red' },
      attendees: [
        { name: 'Emily Brown', image: 'https://bit.ly/prosper-baba' },
        { name: 'David Wilson', image: 'https://bit.ly/code-beast' },
        { name: 'Lisa Anderson', image: 'https://bit.ly/sage-adebayo' },
      ],
    },
    {
      id: 3,
      title: 'Cooking Class for Singles',
      date: 'Sun, Jan 14 • 6:00 PM',
      location: 'Culinary Institute, NYC',
      description: 'Learn to cook delicious meals while meeting other food enthusiasts! All skill levels welcome.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d',
      category: { name: 'Workshop', color: 'green' },
      attendees: [
        { name: 'Tom Harris', image: 'https://bit.ly/dan-abramov' },
        { name: 'Amy Lee', image: 'https://bit.ly/sage-adebayo' },
        { name: 'Chris Martin', image: 'https://bit.ly/kent-c-dodds' },
      ],
    },
    {
      id: 4,
      title: 'Singles Hiking Adventure',
      date: 'Sat, Jan 20 • 9:00 AM',
      location: 'Bear Mountain, NY',
      description: 'Join fellow outdoor enthusiasts for a day of hiking, scenic views, and meaningful connections.',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
      category: { name: 'Adventure', color: 'blue' },
      attendees: [
        { name: 'Rachel Green', image: 'https://bit.ly/prosper-baba' },
        { name: 'Ross Geller', image: 'https://bit.ly/code-beast' },
        { name: 'Monica Bing', image: 'https://bit.ly/sage-adebayo' },
      ],
    },
  ];

  return (
    <Box minH="100vh" bg={bgColor} pt={20}>
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="2xl" mb={4}>
              Events Near You
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Meet like-minded people at our curated events
            </Text>
          </Box>

          {/* Search and Filter */}
          <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
            <InputGroup maxW={{ base: 'full', md: '400px' }}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg={useColorModeValue('white', 'gray.800')}
              />
            </InputGroup>
            <HStack spacing={2}>
              <Button leftIcon={<FaFilter />} variant="outline">
                Filter
              </Button>
              <Button leftIcon={<FaMapMarkerAlt />} variant="outline">
                Location
              </Button>
            </HStack>
          </Flex>

          {/* Event Categories */}
          <HStack spacing={4} overflowX="auto" py={4}>
            {['All Events', 'Social', 'Dating', 'Workshop', 'Adventure'].map((category) => (
              <Tag
                key={category}
                size="lg"
                variant="subtle"
                colorScheme={category === 'All Events' ? 'gray' : 'brand'}
                borderRadius="full"
                cursor="pointer"
                _hover={{ bg: 'brand.50' }}
              >
                {category}
              </Tag>
            ))}
          </HStack>

          {/* Events Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </SimpleGrid>

          {/* Load More Button */}
          <Button
            size="lg"
            variant="outline"
            colorScheme="brand"
            mx="auto"
            mt={8}
          >
            Load More Events
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default Events;
