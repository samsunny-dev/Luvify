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
  VStack,
  HStack,
  Container,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
    try {
      await authService.login(formData);
      toast({
        title: "Welcome back!",
        status: "success",
        duration: 3000,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social media login
    console.log(`Logging in with ${provider}`);
  };

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl">Welcome Back</Heading>
          <Text mt={2} color="gray.600">
            Sign in to continue your journey
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
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
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
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

            <Box textAlign="right">
              <Link to="/forgot-password" color="purple.500">
                Forgot Password?
              </Link>
            </Box>

            <Button type="submit" colorScheme="purple" size="lg">
              Sign In
            </Button>
          </Stack>
        </form>

        <Stack spacing={4}>
          <Divider />
          <Text textAlign="center">Or sign in with</Text>
          <HStack spacing={4} justify="center">
            <Button
              leftIcon={<FaGoogle />}
              onClick={() => handleSocialLogin("google")}
              colorScheme="red"
              variant="outline"
              w="full"
            >
              Google
            </Button>
            <Button
              leftIcon={<FaFacebook />}
              onClick={() => handleSocialLogin("facebook")}
              colorScheme="facebook"
              variant="outline"
              w="full"
            >
              Facebook
            </Button>
          </HStack>
        </Stack>

        <Text textAlign="center">
          Don't have an account?{" "}
          <Link to="/signup" color="purple.500">
            Sign up
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default Login;
