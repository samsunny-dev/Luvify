import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Heading,
  Text,
  Select,
  Checkbox,
  Divider,
  HStack,
  VStack,
  useToast,
  Container,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    interests: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the Terms and Privacy Policy",
        status: "warning",
        duration: 3000,
      });
      return;
    }
    try {
      await authService.signup(formData);
      toast({
        title: "Account created.",
        description: "Welcome to Luvify! Please log in to continue.",
        status: "success",
        duration: 3000,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleSocialSignup = (provider) => {
    // Implement social media signup
    console.log(`Signing up with ${provider}`);
  };

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl">Create Your Account</Heading>
          <Text mt={2} color="gray.600">
            Join Luvify and start your journey to find love
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a unique username"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                />
                <InputRightElement>
                  <IconButton
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  placeholder="Select gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Interests</FormLabel>
              <Input
                name="interests"
                placeholder="e.g., hiking, movies, cooking"
                onChange={handleChange}
              />
            </FormControl>

            <Checkbox
              isChecked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            >
              I agree to the{" "}
              <Link color="purple.500" href="/terms">
                Terms
              </Link>{" "}
              and{" "}
              <Link color="purple.500" href="/privacy">
                Privacy Policy
              </Link>
            </Checkbox>

            <Button
              type="submit"
              colorScheme="purple"
              size="lg"
              isDisabled={!agreeToTerms}
            >
              Create Account
            </Button>
          </Stack>
        </form>

        <Stack spacing={4}>
          <Divider />
          <Text textAlign="center">Or sign up with</Text>
          <HStack spacing={4} justify="center">
            <Button
              leftIcon={<FaGoogle />}
              onClick={() => handleSocialSignup("google")}
              colorScheme="red"
              variant="outline"
              w="full"
            >
              Google
            </Button>
            <Button
              leftIcon={<FaFacebook />}
              onClick={() => handleSocialSignup("facebook")}
              colorScheme="facebook"
              variant="outline"
              w="full"
            >
              Facebook
            </Button>
          </HStack>
        </Stack>

        <Text textAlign="center">
          Already have an account?{" "}
          <Link to="/login" color="purple.500">
            Sign in
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default Signup;
