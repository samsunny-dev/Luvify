import { Box, Text, Button, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { communityService } from "../services/communityService";

const Communities = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      const data = await communityService.getCommunities();
      setCommunities(data);
    };

    fetchCommunities();
  }, []);

  return (
    <Box p={8}>
      <Text fontSize="2xl" mb={4}>Communities</Text>
      <Stack spacing={4}>
        {communities.map((community) => (
          <Box key={community.id} border="1px solid gray" p={4} borderRadius="md">
            <Text>{community.name}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Communities;
