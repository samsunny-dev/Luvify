import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import { Outlet, useLocation } from 'react-router-dom';

const App = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1">
        <main>
          <Outlet/>
        </main>
      </Box>
      {/* <Footer/> */}
    </Box>
  );
};

export default App;
