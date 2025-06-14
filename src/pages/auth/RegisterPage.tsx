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
  Select,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { mockCities } from '@/utils/mockData';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  fullName: string;
  phone?: string;
  city?: string;
}

const RegisterPage: React.FC = () => {
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError('');
      setSuccess('');
      
      const success = await registerUser({
        email: data.email,
        password: data.password,
        username: data.username,
        fullName: data.fullName,
        phone: data.phone,
        city: data.city,
      });
      
      if (success) {
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError('User with this email or username already exists.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
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
      py={8}
    >
      <Container maxW="md">
        <VStack spacing={8}>
          {/* Logo */}
          <VStack spacing={2}>
            <HStack spacing={3} justify="center">
              <Box w="48px" h="48px">
                <img 
                  src="/logo.svg" 
                  alt="SooqPrice Logo" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
              <Heading size="xl" color="white" textAlign="center">
                SooqPrice
              </Heading>
            </HStack>
            <Text color="whiteAlpha.800" textAlign="center">
              Join our community of price trackers
            </Text>
          </VStack>

          {/* Register Card */}
          <Card w="full" boxShadow="xl">
            <CardHeader pb={4}>
              <VStack spacing={2}>
                <Heading size="lg" textAlign="center">
                  Create Account
                </Heading>
                <Text color="gray.600" textAlign="center">
                  Start tracking and comparing prices today
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

                {success && (
                  <Alert status="success" borderRadius="md">
                    <AlertIcon />
                    {success}
                  </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                  <VStack spacing={4}>
                    <FormControl isInvalid={!!errors.fullName}>
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        size="lg"
                        {...register('fullName', {
                          required: 'Full name is required',
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                          }
                        })}
                      />
                      {errors.fullName && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.fullName.message}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!errors.username}>
                      <FormLabel>Username</FormLabel>
                      <Input
                        type="text"
                        placeholder="Choose a username"
                        size="lg"
                        {...register('username', {
                          required: 'Username is required',
                          minLength: {
                            value: 3,
                            message: 'Username must be at least 3 characters'
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9_]+$/,
                            message: 'Username can only contain letters, numbers, and underscores'
                          }
                        })}
                      />
                      {errors.username && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.username.message}
                        </Text>
                      )}
                    </FormControl>

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

                    <FormControl isInvalid={!!errors.phone}>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <Input
                        type="tel"
                        placeholder="+212 6XX XXX XXX"
                        size="lg"
                        {...register('phone', {
                          pattern: {
                            value: /^\+?[0-9\s-()]+$/,
                            message: 'Invalid phone number format'
                          }
                        })}
                      />
                      {errors.phone && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.phone.message}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!errors.city}>
                      <FormLabel>City (Optional)</FormLabel>
                      <Select 
                        placeholder="Select your city"
                        size="lg"
                        {...register('city')}
                      >
                        {mockCities.map((city) => (
                          <option key={city.id} value={city.name}>
                            {city.name} ({city.nameAr})
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="Create a password"
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

                    <FormControl isInvalid={!!errors.confirmPassword}>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        size="lg"
                        {...register('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: (value) =>
                            value === password || 'Passwords do not match'
                        })}
                      />
                      {errors.confirmPassword && (
                        <Text color="red.500" fontSize="sm" mt={1}>
                          {errors.confirmPassword.message}
                        </Text>
                      )}
                    </FormControl>

                    <Button
                      type="submit"
                      size="lg"
                      w="full"
                      isLoading={isSubmitting || isLoading}
                      loadingText="Creating Account..."
                    >
                      Create Account
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
                    Already have an account?{' '}
                    <ChakraLink as={Link} to="/login" color="green.500" fontWeight="medium">
                      Sign in here
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

export default RegisterPage;
