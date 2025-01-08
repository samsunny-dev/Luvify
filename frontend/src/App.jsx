import React from 'react';
<<<<<<< HEAD
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
=======
import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/Signup';
import Login from './pages/login';

const App = () => {
  return (
    <Box minH="100vh">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
  );
};

export default App;
