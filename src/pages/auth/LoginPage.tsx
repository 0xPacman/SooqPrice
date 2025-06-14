import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Link as ChakraLink,
  Card,
  CardHeader,
  CardBody,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  
  const from = location.state?.from?.pathname || '/';
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      const success = await login(data.email, data.password);
      
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password. Try: ahmed@example.com / password');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <Box 
      minH="100vh" 
      bg="linear-gradient(135deg, #4A9B3B 0%, #2D5E1F 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="md">
        <VStack spacing={8}>
          {/* Logo */}
          <VStack spacing={2}>
            <Heading size="xl" color="white" textAlign="center">
              🛒 SooqPrice
            </Heading>
            <Text color="whiteAlpha.800" textAlign="center">
              Welcome back to the community
            </Text>
          </VStack>

          {/* Login Card */}
          <Card w="full" boxShadow="xl">
            <CardHeader pb={4}>
              <VStack spacing={2}>
                <Heading size="lg" textAlign="center">
                  Sign In
                </Heading>
                <Text color="gray.600" textAlign="center">
                  Enter your credentials to access your account
                </Text>
              </VStack>
            </CardHeader>
            
            <CardBody pt={0}>
              <VStack spacing={6}>
                {error && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                {/* Demo Credentials */}
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  <VStack align="start" spacing={1} fontSize="sm">
                    <Text fontWeight="medium">Demo Credentials:</Text>
                    <Text>Email: ahmed@example.com</Text>
                    <Text>Password: password</Text>
                  </VStack>
                </Alert>

                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                  <VStack spacing={4}>
                    <FormControl isInvalid={!!errors.email}>
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        size="lg"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                          }
                        })}
                      />
                      {errors.email && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.email.message}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!errors.password}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        size="lg"
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                      />
                      {errors.password && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.password.message}
                        </Text>
                      )}
                    </FormControl>

                    <Button
                      type="submit"
                      size="lg"
                      w="full"
                      isLoading={isSubmitting || isLoading}
                      loadingText="Signing In..."
                    >
                      Sign In
                    </Button>
                  </VStack>
                </form>

                <HStack w="full">
                  <Divider />
                  <Text color="gray.500" fontSize="sm" whiteSpace="nowrap">
                    or
                  </Text>
                  <Divider />
                </HStack>

                <VStack spacing={3} w="full">
                  <Text color="gray.600" textAlign="center">
                    Don't have an account?{' '}
                    <ChakraLink as={Link} to="/register" color="green.500" fontWeight="medium">
                      Sign up here
                    </ChakraLink>
                  </Text>
                  
                  <ChakraLink as={Link} to="/" color="green.500" fontWeight="medium">
                    ← Back to Home
                  </ChakraLink>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default LoginPage;
