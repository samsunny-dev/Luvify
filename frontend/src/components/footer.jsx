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
    </Box>
  );
};

export default Footer;
