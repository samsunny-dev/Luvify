import { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, Input, Button, Stack } from "@chakra-ui/react";
import { profileService } from "../services/profileService";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await profileService.getProfile();
      setUsername(profile.username);
      setEmail(profile.email);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await profileService.updateProfile({ username, email });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Box p={8} maxW="lg" mx="auto">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg">Update Profile</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Profile;
