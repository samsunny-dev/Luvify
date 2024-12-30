import { Box, Text, Image, Button, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const SwipeCard = ({ image, title, description, onSwipeLeft, onSwipeRight }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Box
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        overflow="hidden"
        background="white"
        padding="16px"
      >
        <Image src={image} alt={title} boxSize="300px" objectFit="cover" borderRadius="md" />
        <Text fontSize="lg" fontWeight="bold" mt="8px">
          {title}
        </Text>
        <Text fontSize="sm" mt="4px">
          {description}
        </Text>
        <Flex justify="space-between" mt="8px">
          <Button colorScheme="red" onClick={onSwipeLeft}>Swipe Left</Button>
          <Button colorScheme="green" onClick={onSwipeRight}>Swipe Right</Button>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default SwipeCard;
