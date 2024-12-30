import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './theme';  // Import your custom theme
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <ChakraProvider theme={theme}>  {/* Use the custom theme if you have one */}
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box flex="1">
          <main>
            <Outlet />
          </main>
        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};

export default App;
