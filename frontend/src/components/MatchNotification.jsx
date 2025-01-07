import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  Box,
  useColorModeValue,
  IconButton,
  Circle,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaComment, FaTimes } from 'react-icons/fa';
import confetti from 'canvas-confetti';

const MotionBox = motion(Box);

const MatchNotification = ({
  isOpen,
  onClose,
  match = {
    name: 'Sarah',
    image: 'https://bit.ly/sage-adebayo',
    userImage: 'https://bit.ly/dan-abramov',
  },
  onMessage,
}) => {
  const bgGradient = useColorModeValue(
    'linear(to-r, brand.400, secondary.400)',
    'linear(to-r, brand.600, secondary.600)'
  );

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF0000', '#FF69B4', '#FFB6C1'],
    });
  };

  React.useEffect(() => {
    if (isOpen) {
      triggerConfetti();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          motionPreset="slideInBottom"
          size="xl"
        >
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px)"
          />
          <ModalContent
            bg="transparent"
            boxShadow="none"
            mx={4}
          >
            <ModalBody p={0}>
              <MotionBox
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                bgGradient={bgGradient}
                rounded="3xl"
                overflow="hidden"
                position="relative"
              >
                <IconButton
                  icon={<FaTimes />}
                  position="absolute"
                  right={4}
                  top={4}
                  variant="ghost"
                  color="white"
                  onClick={onClose}
                  zIndex={2}
                />

                <VStack spacing={6} p={8} color="white" align="center">
                  <MotionBox
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <Circle
                      size="80px"
                      bg="white"
                      color="brand.500"
                    >
                      <FaHeart size="40px" />
                    </Circle>
                  </MotionBox>

                  <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    textAlign="center"
                    bgGradient="linear(to-r, white, whiteAlpha.800)"
                    bgClip="text"
                  >
                    It's a Match!
                  </Text>

                  <HStack spacing={4} justify="center">
                    <MotionBox
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={match.userImage}
                        alt="Your profile"
                        boxSize="120px"
                        objectFit="cover"
                        rounded="full"
                        border="4px solid"
                        borderColor="white"
                      />
                    </MotionBox>
                    <MotionBox
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={match.image}
                        alt={match.name}
                        boxSize="120px"
                        objectFit="cover"
                        rounded="full"
                        border="4px solid"
                        borderColor="white"
                      />
                    </MotionBox>
                  </HStack>

                  <Text fontSize="lg" textAlign="center">
                    You and {match.name} have liked each other!
                  </Text>

                  <HStack spacing={4} pt={4}>
                    <Button
                      leftIcon={<FaComment />}
                      colorScheme="white"
                      variant="solid"
                      size="lg"
                      onClick={onMessage}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}
                    >
                      Send Message
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={onClose}
                      _hover={{
                        bg: 'whiteAlpha.300',
                      }}
                    >
                      Keep Swiping
                    </Button>
                  </HStack>
                </VStack>
              </MotionBox>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default MatchNotification;
