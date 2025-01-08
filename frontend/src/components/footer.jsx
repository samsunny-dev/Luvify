<<<<<<< HEAD
import { Box, Text, Link, Center } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" padding="16px" mt="auto">
      <Center>
        <Text fontSize="sm">
          &copy; 2024 MyApp. All rights reserved. |{' '}
          <Link href="/privacy-policy" color="teal.200">
            Privacy Policy
          </Link>
        </Text>
      </Center>
=======
import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Image,
  IconButton,
  Link,
  useColorModeValue,
  Heading,
  Input,
  Button,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '/assets/logo.svg';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container as={Stack} maxW="7xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align="flex-start">
            <ListHeader>Company</ListHeader>
            <Link as={RouterLink} to="/about">About Us</Link>
            <Link as={RouterLink} to="/blog">Blog</Link>
            <Link as={RouterLink} to="/careers">Careers</Link>
            <Link as={RouterLink} to="/contact">Contact Us</Link>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Support</ListHeader>
            <Link as={RouterLink} to="/help">Help Center</Link>
            <Link as={RouterLink} to="/safety">Safety Center</Link>
            <Link as={RouterLink} to="/community-guidelines">Community Guidelines</Link>
            <Link as={RouterLink} to="/cookie-policy">Cookie Policy</Link>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Legal</ListHeader>
            <Link as={RouterLink} to="/privacy">Privacy Policy</Link>
            <Link as={RouterLink} to="/terms">Terms of Service</Link>
            <Link as={RouterLink} to="/law-enforcement">Law Enforcement</Link>
            <Link as={RouterLink} to="/trust-safety">Trust & Safety</Link>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Stay Updated</ListHeader>
            <Stack direction="row" spacing={2} maxW="300px">
              <Input
                placeholder="Enter your email"
                bg={useColorModeValue('gray.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <Button
                colorScheme="brand"
                flexShrink={0}
                _hover={{
                  bg: 'brand.600',
                }}
              >
                Subscribe
              </Button>
            </Stack>
            <Text fontSize="sm" mt={2}>
              Get dating tips and special offers directly to your inbox
            </Text>
          </Stack>
        </SimpleGrid>

        <Divider my={6} />

        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          pt={4}
        >
          <VStack align={{ base: 'center', md: 'flex-start' }} mb={{ base: 4, md: 0 }}>
            <Image src={Logo} alt="Luvify" h="40px" mb={2} />
            <Text fontSize="sm">
              &copy; {new Date().getFullYear()} Luvify. All rights reserved
            </Text>
          </VStack>

          <Stack direction="row" spacing={6}>
            <IconButton
              aria-label="Facebook"
              icon={<FaFacebook />}
              size="lg"
              color="gray.600"
              variant="ghost"
              _hover={{
                color: 'brand.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            />
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              size="lg"
              color="gray.600"
              variant="ghost"
              _hover={{
                color: 'brand.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            />
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram />}
              size="lg"
              color="gray.600"
              variant="ghost"
              _hover={{
                color: 'brand.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            />
            <IconButton
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              size="lg"
              color="gray.600"
              variant="ghost"
              _hover={{
                color: 'brand.500',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            />
          </Stack>
        </Flex>
      </Container>
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
    </Box>
  );
};

export default Footer;
