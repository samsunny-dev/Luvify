import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="primary" color="white" padding="16px">
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">MyApp</Text>
        <Flex>
          <Link to="/login">
            <Button colorScheme="teal" variant="outline" marginX="8px">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button colorScheme="teal" variant="solid" marginX="8px">
              Sign Up
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;

import React from 'react'

export default function navbar() {
  return (
    <div>navbar</div>
  )
}
