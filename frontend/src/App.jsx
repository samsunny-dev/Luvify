import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import SignUp from './pages/Signup';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Communities from './pages/Communities';
import Chat from './pages/Chat';
import ModerationDashboard from './pages/ModerationDashboard';
import { ChatProvider } from './context/ChatContext';
import theme from './theme';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ChatProvider>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <Navbar />
          <Box flex="1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/moderation" element={<ModerationDashboard />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </ChatProvider>
    </ChakraProvider>
  );
};

export default App;
