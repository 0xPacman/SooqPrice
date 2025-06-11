import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  SimpleGrid,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { mockUsers, mockPriceSubmissions, mockCities, mockMarkets } from '@/utils/mockData';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user?.isAuthenticated || !user?.profile?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  const totalUsers = mockUsers.length;
  const totalSubmissions = mockPriceSubmissions.length;
  const pendingSubmissions = mockPriceSubmissions.filter(s => s.verificationStatus === 'pending').length;
  const verifiedUsers = mockUsers.filter(u => u.isVerified).length;

  return (
    <Container maxW="container.xl">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="xl" mb={2}>
            Admin Dashboard
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Manage users, submissions, and platform settings
          </Text>
        </Box>

        {/* Alert */}
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          This is a demo admin dashboard. Full functionality will be available in the next phase.
        </Alert>

        {/* Stats Overview */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="green.500">
                {totalUsers}
              </Text>
              <Text color="gray.600">Total Users</Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                {totalSubmissions}
              </Text>
              <Text color="gray.600">Total Submissions</Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="orange.500">
                {pendingSubmissions}
              </Text>
              <Text color="gray.600">Pending Review</Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="purple.500">
                {verifiedUsers}
              </Text>
              <Text color="gray.600">Verified Users</Text>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Platform Stats */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Card>
            <CardBody>
              <VStack align="start" spacing={4}>
                <Heading size="md">Platform Coverage</Heading>
                <SimpleGrid columns={2} spacing={4} w="full">
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="green.500">
                      {mockCities.length}
                    </Text>
                    <Text color="gray.600" textAlign="center">Cities</Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="2xl" fontWeight="bold" color="green.500">
                      {mockMarkets.length}
                    </Text>
                    <Text color="gray.600" textAlign="center">Markets</Text>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <VStack align="start" spacing={4}>
                <Heading size="md">User Engagement</Heading>
                <VStack align="start" spacing={2} w="full">
                  <Text fontSize="sm" color="gray.600">
                    Active Users: {Math.floor(totalUsers * 0.7)}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Daily Submissions: {Math.floor(totalSubmissions / 30)}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Verification Rate: {Math.round((totalSubmissions - pendingSubmissions) / totalSubmissions * 100)}%
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Coming Soon */}
        <Card>
          <CardBody>
            <VStack spacing={4}>
              <Heading size="md">Coming Soon</Heading>
              <Text color="gray.600" textAlign="center">
                The full admin dashboard with user management, submission moderation, 
                analytics, and reward distribution will be available in Phase 4 of development.
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default AdminDashboard;
