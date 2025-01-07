import React from 'react';
import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';

const App = () => {
  return (
    <Box minH="100vh">
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Box>
  );
};

export default App;
