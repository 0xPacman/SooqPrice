import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  Avatar,
  HStack,
  Badge,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
} from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';
import { getMockSubmissionsByUser } from '@/utils/mockData';
import { Navigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userSubmissions = getMockSubmissionsByUser(user.id);
  const profile = user.profile!;

  return (
    <Container maxW="container.xl">
      <VStack spacing={6} align="stretch">
        {/* Profile Header */}
        <Card>
          <CardBody>
            <HStack spacing={6} align="start">
              <Avatar 
                size="2xl" 
                name={profile.fullName}
                src={profile.avatarUrl}
              />
              <VStack align="start" spacing={3} flex={1}>
                <VStack align="start" spacing={1}>
                  <Heading size="xl">{profile.fullName}</Heading>
                  <Text color="gray.600" fontSize="lg">@{profile.username}</Text>
                  <Text color="gray.500">{profile.email}</Text>
                  {profile.city && (
                    <Text color="gray.500">📍 {profile.city}</Text>
                  )}
                </VStack>

                <HStack spacing={2} flexWrap="wrap">
                  {profile.isVerified && (
                    <Badge colorScheme="green" size="lg">
                      ✓ Verified User
                    </Badge>
                  )}
                  {profile.isAdmin && (
                    <Badge colorScheme="purple" size="lg">
                      👑 Admin
                    </Badge>
                  )}
                  {profile.badges.map((badge) => (
                    <Badge key={badge.id} colorScheme="blue" size="lg">
                      {badge.icon} {badge.name}
                    </Badge>
                  ))}
                </HStack>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Stats */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="green.500">
                {profile.reputationScore}
              </Text>
              <Text color="gray.600">Reputation Points</Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="green.500">
                {profile.totalSubmissions}
              </Text>
              <Text color="gray.600">Total Submissions</Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="green.500">
                {profile.accurateSubmissions}
              </Text>
              <Text color="gray.600">Accurate Reports</Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="green.500">
                {profile.totalSubmissions > 0 
                  ? Math.round((profile.accurateSubmissions / profile.totalSubmissions) * 100)
                  : 0}%
              </Text>
              <Text color="gray.600">Accuracy Rate</Text>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Tabs */}
        <Tabs variant="line" colorScheme="green">
          <TabList>
            <Tab>My Submissions</Tab>
            <Tab>Badges & Achievements</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Recent Submissions</Heading>
                {userSubmissions.length > 0 ? (
                  userSubmissions.slice(0, 10).map((submission) => (
                    <Card key={submission.id}>
                      <CardBody>
                        <HStack justify="space-between">
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="medium">{submission.product?.name}</Text>
                            <Text fontSize="sm" color="gray.600">
                              {submission.market?.name}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              {submission.submissionDate.toLocaleDateString()}
                            </Text>
                          </VStack>
                          <VStack align="end" spacing={1}>
                            <Text fontSize="xl" fontWeight="bold" color="green.500">
                              {submission.price} DH
                            </Text>
                            <Badge 
                              colorScheme={
                                submission.verificationStatus === 'verified' ? 'green' :
                                submission.verificationStatus === 'pending' ? 'yellow' : 'red'
                              }
                            >
                              {submission.verificationStatus}
                            </Badge>
                          </VStack>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))
                ) : (
                  <Box textAlign="center" py={8}>
                    <Text color="gray.500">No submissions yet</Text>
                    <Button mt={4} colorScheme="green">
                      Submit Your First Price
                    </Button>
                  </Box>
                )}
              </VStack>
            </TabPanel>

            <TabPanel px={0}>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Your Badges</Heading>
                {profile.badges.length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {profile.badges.map((badge) => (
                      <Card key={badge.id}>
                        <CardBody>
                          <HStack spacing={4}>
                            <Text fontSize="3xl">{badge.icon}</Text>
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="bold">{badge.name}</Text>
                              <Text fontSize="sm" color="gray.600">
                                {badge.description}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                Earned {badge.earnedAt.toLocaleDateString()}
                              </Text>
                            </VStack>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Box textAlign="center" py={8}>
                    <Text color="gray.500">No badges earned yet</Text>
                    <Text fontSize="sm" color="gray.400" mt={2}>
                      Start submitting accurate prices to earn badges!
                    </Text>
                  </Box>
                )}
              </VStack>
            </TabPanel>

            <TabPanel px={0}>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Account Settings</Heading>
                <Card>
                  <CardBody>
                    <Text color="gray.600">
                      Profile settings and preferences will be available in the next update.
                    </Text>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default ProfilePage;
