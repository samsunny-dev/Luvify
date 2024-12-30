import { Box, Text, Input, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = () => {
    setChatMessages([...chatMessages, message]);
    setMessage("");
  };

  return (
    <Box p={8}>
      <Stack spacing={4}>
        <Box border="1px solid gray" p={4} borderRadius="md">
          <Text fontSize="lg">Chat Room</Text>
          <Stack spacing={2}>
            {chatMessages.map((msg, index) => (
              <Text key={index}>{msg}</Text>
            ))}
          </Stack>
        </Box>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <Button onClick={handleSendMessage} colorScheme="blue">Send</Button>
      </Stack>
    </Box>
  );
};

export default Chat;
