import React from 'react';
import {
  Box,
  Image,
  Text,
  Stack,
  Badge,
  IconButton,
  HStack,
  useColorModeValue,
  VStack,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaHeart, FaComment, FaTimes, FaStar, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { IoMusicalNotes } from 'react-icons/io5';

const MotionBox = motion(Box);

const UserCard = ({
  user = {
    name: 'Sarah Johnson',
    age: 28,
    location: 'New York City',
    distance: '2 miles away',
    bio: 'Adventure seeker | Coffee enthusiast | Dog lover 🐕',
    interests: ['Travel', 'Photography', 'Hiking'],
    verified: true,
    images: ['https://bit.ly/sage-adebayo'],
    spotify: 'Taylor Swift - Love Story',
  },
  onLike,
  onPass,
  onSuperLike,
  onMessage,
  isMatch = false,
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <MotionBox
      maxW="sm"
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      bg={cardBg}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      shadow="xl"
    >
      <Box position="relative">
        <Image
          src={user.images[0]}
          alt={user.name}
          h="400px"
          w="100%"
          objectFit="cover"
        />
        
        {/* Verified Badge */}
        {user.verified && (
          <Badge
            position="absolute"
            top={4}
            right={4}
            colorScheme="blue"
            variant="solid"
            rounded="full"
            px={2}
            py={1}
          >
            <HStack spacing={1}>
              <Icon as={FaCheckCircle} />
              <Text fontSize="xs">Verified</Text>
            </HStack>
          </Badge>
        )}

        {/* Spotify Playing */}
        {user.spotify && (
          <HStack
            position="absolute"
            bottom={4}
            left={4}
            right={4}
            bg="blackAlpha.700"
            color="white"
            p={2}
            borderRadius="full"
            spacing={2}
          >
            <Icon as={IoMusicalNotes} />
            <Text fontSize="sm" isTruncated>
              {user.spotify}
            </Text>
          </HStack>
        )}
      </Box>

      <Box p={6}>
        <Stack spacing={4}>
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <HStack>
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                  {user.name}, {user.age}
                </Text>
              </HStack>
              <HStack spacing={2} color={mutedColor}>
                <Icon as={FaMapMarkerAlt} />
                <Text fontSize="sm">{user.distance}</Text>
              </HStack>
            </VStack>
          </HStack>

          <Text color={mutedColor}>{user.bio}</Text>

          <HStack spacing={2} flexWrap="wrap">
            {user.interests.map((interest, index) => (
              <Badge
                key={index}
                colorScheme="brand"
                variant="subtle"
                rounded="full"
                px={3}
                py={1}
              >
                {interest}
              </Badge>
            ))}
          </HStack>

          {/* Action Buttons */}
          <HStack spacing={4} justify="center" pt={4}>
            <Tooltip label="Pass" placement="top">
              <IconButton
                aria-label="Pass"
                icon={<FaTimes />}
                onClick={onPass}
                colorScheme="gray"
                rounded="full"
                size="lg"
                _hover={{
                  transform: 'scale(1.1)',
                  bg: 'red.500',
                  color: 'white',
                }}
              />
            </Tooltip>

            <Tooltip label="Super Like" placement="top">
              <IconButton
                aria-label="Super Like"
                icon={<FaStar />}
                onClick={onSuperLike}
                colorScheme="blue"
                rounded="full"
                size="lg"
                _hover={{
                  transform: 'scale(1.1)',
                }}
              />
            </Tooltip>

            <Tooltip label="Like" placement="top">
              <IconButton
                aria-label="Like"
                icon={<FaHeart />}
                onClick={onLike}
                colorScheme="brand"
                rounded="full"
                size="lg"
                _hover={{
                  transform: 'scale(1.1)',
                }}
              />
            </Tooltip>

            {isMatch && (
              <Tooltip label="Message" placement="top">
                <IconButton
                  aria-label="Message"
                  icon={<FaComment />}
                  onClick={onMessage}
                  colorScheme="green"
                  rounded="full"
                  size="lg"
                  _hover={{
                    transform: 'scale(1.1)',
                  }}
                />
              </Tooltip>
            )}
          </HStack>
        </Stack>
      </Box>
    </MotionBox>
  );
};

export default UserCard;
