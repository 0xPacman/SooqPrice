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
  Flex,
  useColorModeValue,
  Progress,
  Circle,
  Icon,
  useBreakpointValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';
import { getMockSubmissionsByUser } from '@/utils/mockData';
import { Navigate } from 'react-router-dom';
import { EmailIcon } from '@chakra-ui/icons';

// Custom icons
const TrophyIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M7,2H17V9A5,5 0 0,1 12,14A5,5 0 0,1 7,9V2M19,9H21A2,2 0 0,1 23,11V12A4,4 0 0,1 19,16H17.91C17.65,17.83 16.24,19.26 14.5,19.7V21.5C14.5,21.78 14.28,22 14,22H10C9.72,22 9.5,21.78 9.5,21.5V19.7C7.76,19.26 6.35,17.83 6.09,16H5A4,4 0 0,1 1,12V11A2,2 0 0,1 3,9H5V2H7V9H17V2Z"
    />
  </Icon>
);

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  // Theme colors
  const bgGradient = useColorModeValue(
    'linear(to-br, green.50, blue.50)',
    'linear(to-br, green.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const avatarSize = useBreakpointValue({ base: 'xl', md: '2xl' });
  const statColumns = useBreakpointValue({ base: 2, md: 4 });

  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userSubmissions = getMockSubmissionsByUser(user.id);
  const profile = user.profile!;

  // Calculate level and progress
  const level = Math.floor(profile.reputationScore / 100) + 1;
  const progressToNextLevel = (profile.reputationScore % 100);
  const accuracyPercentage = profile.totalSubmissions > 0 
    ? Math.round((profile.accurateSubmissions / profile.totalSubmissions) * 100)
    : 0;

  return (
    <Container maxW="container.xl">
      <VStack spacing={6} align="stretch">
        {/* Enhanced Profile Header */}
        <Card
          bg={cardBg}
          boxShadow="xl"
          borderRadius="2xl"
          border="1px solid"
          borderColor={useColorModeValue('gray.100', 'gray.700')}
          overflow="hidden"
        >
          <Box
            bgGradient={bgGradient}
            h="120px"
            position="relative"
          />
          <CardBody mt="-60px" position="relative">
            <HStack spacing={6} align="start">
              <Box position="relative">
                <Avatar 
                  size={avatarSize}
                  name={profile.fullName}
                  src={profile.avatarUrl}
                  border="4px solid white"
                  boxShadow="lg"
                />
                {profile.isVerified && (
                  <Circle
                    size="40px"
                    bg="green.500"
                    color="white"
                    position="absolute"
                    bottom="0"
                    right="0"
                    border="3px solid white"
                  >
                    ✓
                  </Circle>
                )}
              </Box>
              
              <VStack align="start" spacing={4} flex={1} pt={4}>
                <VStack align="start" spacing={2}>
                  <HStack spacing={3} align="center">
                    <Heading size="xl" color={useColorModeValue('gray.800', 'white')}>
                      {profile.fullName}
                    </Heading>
                    <Badge 
                      colorScheme="green" 
                      variant="subtle" 
                      fontSize="sm"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      Level {level}
                    </Badge>
                  </HStack>
                  
                  <Text color="gray.600" fontSize="lg" fontWeight="medium">
                    @{profile.username}
                  </Text>
                  
                  <HStack spacing={4} color="gray.500" fontSize="sm">
                    <HStack spacing={1}>
                      <Icon as={EmailIcon} />
                      <Text>{profile.email}</Text>
                    </HStack>
                    {profile.city && (
                      <HStack spacing={1}>
                        <Text>📍</Text>
                        <Text>{profile.city}</Text>
                      </HStack>
                    )}
                  </HStack>
                </VStack>

                {/* Level Progress */}
                <Box w="full" maxW="300px">
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" color="gray.600" fontWeight="medium">
                      Progress to Level {level + 1}
                    </Text>
                    <Text fontSize="sm" color="green.500" fontWeight="bold">
                      {progressToNextLevel}/100
                    </Text>
                  </HStack>
                  <Progress
                    value={progressToNextLevel}
                    colorScheme="green"
                    size="md"
                    borderRadius="full"
                    bg={useColorModeValue('gray.100', 'gray.700')}
                  />
                </Box>

                {/* Badges */}
                <Wrap spacing={2} maxW="full">
                  {profile.isAdmin && (
                    <WrapItem>
                      <Badge colorScheme="purple" size="lg" borderRadius="full" px={3}>
                        👑 Admin
                      </Badge>
                    </WrapItem>
                  )}
                  {profile.badges.slice(0, 3).map((badge) => (
                    <WrapItem key={badge.id}>
                      <Badge colorScheme="blue" size="lg" borderRadius="full" px={3}>
                        {badge.icon} {badge.name}
                      </Badge>
                    </WrapItem>
                  ))}
                  {profile.badges.length > 3 && (
                    <WrapItem>
                      <Badge variant="outline" size="lg" borderRadius="full" px={3}>
                        +{profile.badges.length - 3} more
                      </Badge>
                    </WrapItem>
                  )}
                </Wrap>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Enhanced Stats Cards */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
          <Card
            bg={cardBg}
            boxShadow="lg"
            borderRadius="xl"
            border="1px solid"
            borderColor={useColorModeValue('gray.100', 'gray.700')}
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
            transition="all 0.2s"
          >
            <CardBody textAlign="center" py={6}>
              <VStack spacing={3}>
                <Circle size="50px" bg="green.100" color="green.600">
                  <Icon as={TrophyIcon} boxSize={6} />
                </Circle>
                <VStack spacing={1}>
                  <Text fontSize="3xl" fontWeight="bold" color="green.500">
                    {profile.reputationScore}
                  </Text>
                  <Text color="gray.600" fontSize="sm" fontWeight="medium">
                    Reputation Points
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          <Card
            bg={cardBg}
            boxShadow="lg"
            borderRadius="xl"
            border="1px solid"
            borderColor={useColorModeValue('gray.100', 'gray.700')}
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
            transition="all 0.2s"
          >
            <CardBody textAlign="center" py={6}>
              <VStack spacing={3}>
                <Circle size="50px" bg="blue.100" color="blue.600">
                  <Text fontSize="xl">📊</Text>
                </Circle>
                <VStack spacing={1}>
                  <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                    {profile.totalSubmissions}
                  </Text>
                  <Text color="gray.600" fontSize="sm" fontWeight="medium">
                    Total Submissions
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          <Card
            bg={cardBg}
            boxShadow="lg"
            borderRadius="xl"
            border="1px solid"
            borderColor={useColorModeValue('gray.100', 'gray.700')}
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
            transition="all 0.2s"
          >
            <CardBody textAlign="center" py={6}>
              <VStack spacing={3}>
                <Circle size="50px" bg="orange.100" color="orange.600">
                  <Text fontSize="xl">✅</Text>
                </Circle>
                <VStack spacing={1}>
                  <Text fontSize="3xl" fontWeight="bold" color="orange.500">
                    {profile.accurateSubmissions}
                  </Text>
                  <Text color="gray.600" fontSize="sm" fontWeight="medium">
                    Accurate Reports
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          <Card
            bg={cardBg}
            boxShadow="lg"
            borderRadius="xl"
            border="1px solid"
            borderColor={useColorModeValue('gray.100', 'gray.700')}
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
            transition="all 0.2s"
          >
            <CardBody textAlign="center" py={6}>
              <VStack spacing={3}>
                <Circle size="50px" bg="purple.100" color="purple.600">
                  <Text fontSize="xl">🎯</Text>
                </Circle>
                <VStack spacing={1}>
                  <Text fontSize="3xl" fontWeight="bold" color="purple.500">
                    {accuracyPercentage}%
                  </Text>
                  <Text color="gray.600" fontSize="sm" fontWeight="medium">
                    Accuracy Rate
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Enhanced Tabs */}
        <Card
          bg={cardBg}
          boxShadow="lg"
          borderRadius="xl"
          border="1px solid"
          borderColor={useColorModeValue('gray.100', 'gray.700')}
        >
          <CardBody p={0}>
            <Tabs variant="enclosed" colorScheme="green">
              <TabList 
                bg={useColorModeValue('gray.50', 'gray.700')}
                borderRadius="xl xl 0 0"
                borderBottom="1px solid"
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              >
                <Tab 
                  _selected={{ 
                    bg: cardBg,
                    borderColor: useColorModeValue('gray.200', 'gray.600'),
                    borderBottomColor: 'transparent'
                  }}
                  fontWeight="medium"
                >
                  📊 My Submissions
                </Tab>
                <Tab 
                  _selected={{ 
                    bg: cardBg,
                    borderColor: useColorModeValue('gray.200', 'gray.600'),
                    borderBottomColor: 'transparent'
                  }}
                  fontWeight="medium"
                >
                  🏆 Badges & Achievements
                </Tab>
                <Tab 
                  _selected={{ 
                    bg: cardBg,
                    borderColor: useColorModeValue('gray.200', 'gray.600'),
                    borderBottomColor: 'transparent'
                  }}
                  fontWeight="medium"
                >
                  ⚙️ Settings
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={6} py={6}>
                  <VStack spacing={6} align="stretch">
                    <HStack justify="space-between" align="center">
                      <Heading size="md" color={useColorModeValue('gray.800', 'white')}>
                        Recent Submissions
                      </Heading>
                      <Badge colorScheme="green" variant="subtle" fontSize="sm" px={3} py={1}>
                        {userSubmissions.length} total
                      </Badge>
                    </HStack>
                    
                    {userSubmissions.length > 0 ? (
                      <VStack spacing={4} align="stretch">
                        {userSubmissions.slice(0, 10).map((submission) => (
                          <Card 
                            key={submission.id}
                            variant="outline"
                            borderRadius="xl"
                            _hover={{ boxShadow: 'md', transform: 'translateY(-1px)' }}
                            transition="all 0.2s"
                          >
                            <CardBody>
                              <HStack justify="space-between" align="start">
                                <VStack align="start" spacing={2} flex={1}>
                                  <HStack spacing={3}>
                                    <Text fontWeight="bold" fontSize="lg">
                                      {submission.product?.name}
                                    </Text>
                                    <Badge 
                                      colorScheme={
                                        submission.verificationStatus === 'verified' ? 'green' :
                                        submission.verificationStatus === 'pending' ? 'yellow' : 'red'
                                      }
                                      borderRadius="full"
                                    >
                                      {submission.verificationStatus}
                                    </Badge>
                                  </HStack>
                                  <Text fontSize="md" color="gray.600">
                                    📍 {submission.market?.name}
                                  </Text>
                                  <Text fontSize="sm" color="gray.500">
                                    📅 {submission.submissionDate.toLocaleDateString()}
                                  </Text>
                                </VStack>
                                <VStack align="end" spacing={2}>
                                  <Text fontSize="2xl" fontWeight="bold" color="green.500">
                                    {submission.price} DH
                                  </Text>
                                </VStack>
                              </HStack>
                            </CardBody>
                          </Card>
                        ))}
                      </VStack>
                    ) : (
                      <Box textAlign="center" py={12}>
                        <VStack spacing={4}>
                          <Text fontSize="4xl">📊</Text>
                          <Text color="gray.500" fontSize="lg">No submissions yet</Text>
                          <Text color="gray.400" fontSize="sm">
                            Start contributing to help others find the best prices!
                          </Text>
                          <Button 
                            mt={4} 
                            colorScheme="green"
                            size="lg"
                            borderRadius="full"
                            onClick={() => window.location.href = '/submit'}
                          >
                            Submit Your First Price
                          </Button>
                        </VStack>
                      </Box>
                    )}
                  </VStack>
                </TabPanel>

                <TabPanel px={6} py={6}>
                  <VStack spacing={6} align="stretch">
                    <HStack justify="space-between" align="center">
                      <Heading size="md" color={useColorModeValue('gray.800', 'white')}>
                        Your Badges
                      </Heading>
                      <Badge colorScheme="blue" variant="subtle" fontSize="sm" px={3} py={1}>
                        {profile.badges.length} earned
                      </Badge>
                    </HStack>
                    
                    {profile.badges.length > 0 ? (
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        {profile.badges.map((badge) => (
                          <Card 
                            key={badge.id}
                            variant="outline"
                            borderRadius="xl"
                            _hover={{ boxShadow: 'md', transform: 'translateY(-1px)' }}
                            transition="all 0.2s"
                          >
                            <CardBody>
                              <HStack spacing={4}>
                                <Circle size="60px" bg="blue.50" color="blue.600">
                                  <Text fontSize="2xl">{badge.icon}</Text>
                                </Circle>
                                <VStack align="start" spacing={2} flex={1}>
                                  <Text fontWeight="bold" fontSize="lg">{badge.name}</Text>
                                  <Text fontSize="sm" color="gray.600">
                                    {badge.description}
                                  </Text>
                                  <HStack spacing={2}>
                                    <Badge colorScheme="green" variant="subtle" fontSize="xs">
                                      ✨ Earned {badge.earnedAt.toLocaleDateString()}
                                    </Badge>
                                  </HStack>
                                </VStack>
                              </HStack>
                            </CardBody>
                          </Card>
                        ))}
                      </SimpleGrid>
                    ) : (
                      <Box textAlign="center" py={12}>
                        <VStack spacing={4}>
                          <Text fontSize="4xl">🏆</Text>
                          <Text color="gray.500" fontSize="lg">No badges earned yet</Text>
                          <Text color="gray.400" fontSize="sm" maxW="400px">
                            Start submitting accurate prices and engaging with the community to unlock achievements!
                          </Text>
                        </VStack>
                      </Box>
                    )}
                  </VStack>
                </TabPanel>

                <TabPanel px={6} py={6}>
                  <VStack spacing={6} align="stretch">
                    <Heading size="md" color={useColorModeValue('gray.800', 'white')}>
                      Account Settings
                    </Heading>
                    <Card variant="outline" borderRadius="xl">
                      <CardBody textAlign="center" py={12}>
                        <VStack spacing={4}>
                          <Text fontSize="4xl">⚙️</Text>
                          <Text color="gray.600" fontSize="lg">
                            Profile settings and preferences will be available in a future update.
                          </Text>
                          <Badge colorScheme="orange" variant="subtle" fontSize="sm" px={4} py={2}>
                            Coming Soon
                          </Badge>
                        </VStack>
                      </CardBody>
                    </Card>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default ProfilePage;
