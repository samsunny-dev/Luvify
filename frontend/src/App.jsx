import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Router from './routes';

const App = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1">
        <main>
          <Router />
        </main>
      </Box>
      {/* <Footer/> */}
    </Box>
  );
};

export default App;
