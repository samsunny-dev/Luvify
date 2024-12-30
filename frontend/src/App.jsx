import React from 'react';
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import { Outlet, useLocation } from 'react-router-dom';

const theme = extendTheme({
  colors: {
    primary: '#2D3748',
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <Navbar />
          <Box flex="1">
          <main>
            <Outlet/>
          </main>
          </Box>
          {/* <Footer/> */}
        </Box>
    </ChakraProvider>
  );
};

export default App;
