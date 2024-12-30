import { Box, Button, Text, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Box p={8} textAlign="center">
        <Text fontSize="4xl" mb={4}>Welcome to MyApp</Text>
        <Text mb={6}>Join a vibrant community and explore amazing events.</Text>
        <Center>
          <Link to="/signup">
            <Button colorScheme="blue" size="lg">Get Started</Button>
          </Link>
        </Center>
      </Box>
    </motion.div>
  );
};

export default Landing;
