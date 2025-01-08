<<<<<<< HEAD
import React from 'react';
import { Box, Flex, Text, Button, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="white" boxShadow="sm" position="sticky" top={0} zIndex={1000}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" py={4}>
          <Link to="/">
            <Text fontSize="2xl" fontWeight="bold" color="teal.500">
              Luvfy
            </Text>
          </Link>
          <Flex gap={4}>
            <Link to="/login">
              <Button colorScheme="teal" variant="outline">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="teal">
                Sign Up
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
=======
import React, { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Avatar,
  Badge,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  HamburgerIcon,
  CloseIcon,
  BellIcon,
  SettingsIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import Logo from '/assets/logo.svg';

const MotionBox = motion(Box);

const NavLink = ({ children, to, isActive }) => (
  <RouterLink to={to}>
    <Box
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      bg={isActive ? 'brand.50' : 'transparent'}
      color={isActive ? 'brand.500' : 'inherit'}
      fontWeight={isActive ? 'semibold' : 'medium'}
    >
      {children}
    </Box>
  </RouterLink>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const [unreadNotifications] = useState(3); // Replace with actual notification logic

  const Links = [
    { name: 'Discover', path: '/discover' },
    { name: 'Messages', path: '/chat' },
    { name: 'Events', path: '/events' },
    { name: 'Community', path: '/community' },
  ];

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      px={4}
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="sm"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={8} alignItems="center">
          <RouterLink to="/">
            <MotionBox
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image src={Logo} alt="Luvify" h="40px" />
            </MotionBox>
          </RouterLink>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                isActive={location.pathname === link.path}
              >
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems="center">
          <RouterLink to="/notifications">
            <IconButton
              variant="ghost"
              aria-label="Notifications"
              icon={
                <Box position="relative">
                  <BellIcon boxSize={5} />
                  {unreadNotifications > 0 && (
                    <Badge
                      position="absolute"
                      top="-8px"
                      right="-8px"
                      colorScheme="red"
                      variant="solid"
                      borderRadius="full"
                      minW={5}
                      h={5}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {unreadNotifications}
                    </Badge>
                  )}
                </Box>
              }
              mr={2}
            />
          </RouterLink>

          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar
                size="sm"
                src="https://bit.ly/broken-link"
                _hover={{ transform: 'scale(1.05)' }}
                transition="all 0.2s"
              />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem as={RouterLink} to="/settings">
                Settings
              </MenuItem>
              <MenuItem as={RouterLink} to="/premium">
                Upgrade to Premium
              </MenuItem>
              <MenuDivider />
              <MenuItem>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* Mobile Navigation */}
      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                isActive={location.pathname === link.path}
              >
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      )}
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
    </Box>
  );
};

export default Navbar;
<<<<<<< HEAD


=======
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
