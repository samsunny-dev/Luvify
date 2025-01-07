import React from 'react';
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
  );
};

export default App;
