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
  useColorModeValue,
  Progress,
  Circle,
  Icon,
  useBreakpointValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';
import { getMockSubmissionsByUser } from '../../utils/mockData';
import { Link } from 'react-router-dom';
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
  const { user, login } = useAuth();

  // Always call hooks at the top level in the same order
  const bgGradient = useColorModeValue(
    'linear(to-br, green.50, blue.50)',
    'linear(to-br, green.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const avatarSize = useBreakpointValue({ base: 'xl', md: '2xl' });

  // Demo login function for development
  const handleDemoLogin = async () => {
    const result = await login('ahmed4star@gmail.com', 'password');
  };

  if (!user?.isAuthenticated) {
    return (
      <Box bgGradient={bgGradient} minH="100vh" py={8}>
        <Container maxW="container.md">
          <VStack spacing={8} align="center" py={16}>
            <VStack spacing={4} textAlign="center">
              <Text fontSize="6xl">👋</Text>
              <Heading size="xl" color="green.600">
                Welcome to Your Profile
              </Heading>
              <Text color="gray.600" fontSize="lg" maxW="400px">
                Sign in to view your profile, track your submissions, and manage your account settings.
              </Text>
            </VStack>

            <VStack spacing={4} w="full" maxW="300px">
              <Button
                as={Link}
                to="/login"
                colorScheme="green"
                size="lg"
                w="full"
                leftIcon={<EmailIcon />}
              >
                Sign In
              </Button>
              
              <Text color="gray.500" fontSize="sm">
                or
              </Text>
              
              <Button
                onClick={handleDemoLogin}
                variant="outline"
                colorScheme="green"
                size="md"
                w="full"
              >
                Try Demo Profile
              </Button>
            </VStack>

            <Card bg={cardBg} maxW="400px" w="full">
              <CardBody>
                <VStack spacing={3} textAlign="center">
                  <Heading size="md" color="green.600">
                    New to SooqPrice?
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    Join our community to track prices, share submissions, and help build Morocco's largest price database.
                  </Text>
                  <Button
                    as={Link}
                    to="/register"
                    colorScheme="blue"
                    variant="outline"
                    size="md"
                  >
                    Create Account
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Box>
    );
  }

  const userSubmissions = getMockSubmissionsByUser(user.id);
  const profile = user.profile!;

  // Calculate level and progress
  const level = Math.floor(profile.reputationScore / 100) + 1;
  const progressToNextLevel = (profile.reputationScore % 100);
  const accuracyPercentage = profile.totalSubmissions > 0 
    ? Math.round((profile.accurateSubmissions / profile.totalSubmissions) * 100)
    : 0;

  // Helper function to safely format dates
  const formatBadgeDate = (earnedAt: any): string => {
    try {
      if (earnedAt instanceof Date) {
        return earnedAt.toLocaleDateString();
      }
      if (typeof earnedAt === 'string' || typeof earnedAt === 'number') {
        return new Date(earnedAt).toLocaleDateString();
      }
      return 'Date unknown';
    } catch (error) {
      console.warn('Error formatting badge date:', error);
      return 'Date unknown';
    }
  };

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
            <VStack spacing={6} align="center">
              {/* Avatar Section - Centered on mobile */}
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
              
              {/* Profile Info - Responsive layout */}
              <VStack align="center" spacing={4} w="full" textAlign={{ base: "center", md: "left" }}>
                <VStack align="center" spacing={2}>
                  <VStack spacing={2} align="center">
                    <Heading 
                      size={{ base: "lg", md: "xl" }} 
                      color={useColorModeValue('gray.800', 'white')}
                      textAlign="center"
                    >
                      {profile.fullName}
                    </Heading>
                    <Badge 
                      colorScheme="green" 
                      variant="subtle" 
                      fontSize={{ base: "xs", md: "sm" }}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      Level {level}
                    </Badge>
                  </VStack>
                  
                  <Text color="gray.600" fontSize={{ base: "md", md: "lg" }} fontWeight="medium">
                    @{profile.username}
                  </Text>
                  
                  <VStack spacing={2} color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
                    <HStack spacing={1} justify="center">
                      <Icon as={EmailIcon} />
                      <Text>{profile.email}</Text>
                    </HStack>
                    {profile.city && (
                      <HStack spacing={1} justify="center">
                        <Text>📍</Text>
                        <Text>{profile.city}</Text>
                      </HStack>
                    )}
                  </VStack>
                </VStack>

                {/* Level Progress - Better mobile sizing */}
                <Box w="full" maxW={{ base: "250px", md: "300px" }}>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" fontWeight="medium">
                      Progress to Level {level + 1}
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} color="green.500" fontWeight="bold">
                      {progressToNextLevel}/100
                    </Text>
                  </HStack>
                  <Progress
                    value={progressToNextLevel}
                    colorScheme="green"
                    size={{ base: "sm", md: "md" }}
                    borderRadius="full"
                    bg={useColorModeValue('gray.100', 'gray.700')}
                  />
                </Box>

                {/* Badges - Responsive wrapping */}
                <Wrap spacing={2} justify="center" maxW="full">
                  {profile.isAdmin && (
                    <WrapItem>
                      <Badge 
                        colorScheme="purple" 
                        size={{ base: "md", md: "lg" }} 
                        borderRadius="full" 
                        px={{ base: 2, md: 3 }}
                        fontSize={{ base: "xs", md: "sm" }}
                      >
                        👑 Admin
                      </Badge>
                    </WrapItem>
                  )}
                  {profile.badges.slice(0, 3).map((badge) => (
                    <WrapItem key={badge.id}>
                      <Badge 
                        colorScheme="blue" 
                        size={{ base: "md", md: "lg" }} 
                        borderRadius="full" 
                        px={{ base: 2, md: 3 }}
                        fontSize={{ base: "xs", md: "sm" }}
                      >
                        {badge.icon} {badge.name}
                      </Badge>
                    </WrapItem>
                  ))}
                  {profile.badges.length > 3 && (
                    <WrapItem>
                      <Badge 
                        variant="outline" 
                        size={{ base: "md", md: "lg" }} 
                        borderRadius="full" 
                        px={{ base: 2, md: 3 }}
                        fontSize={{ base: "xs", md: "sm" }}
                      >
                        +{profile.badges.length - 3} more
                      </Badge>
                    </WrapItem>
                  )}
                </Wrap>

                {/* Quick Actions */}
                <HStack spacing={3} mt={4}>
                  <Button
                    as={Link}
                    to="/settings/account"
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    leftIcon={<Text fontSize="sm">⚙️</Text>}
                    borderRadius="full"
                  >
                    Account Settings
                  </Button>
                  <Button
                    as={Link}
                    to="/submit"
                    colorScheme="green"
                    size="sm"
                    leftIcon={<Text fontSize="sm">➕</Text>}
                    borderRadius="full"
                  >
                    Submit Price
                  </Button>
                </HStack>
              </VStack>
            </VStack>
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
                overflowX="auto"
                css={{
                  '&::-webkit-scrollbar': {
                    display: 'none'
                  }
                }}
              >
                <Tab 
                  _selected={{ 
                    bg: cardBg,
                    borderColor: useColorModeValue('gray.200', 'gray.600'),
                    borderBottomColor: 'transparent'
                  }}
                  fontWeight="medium"
                  fontSize={{ base: "sm", md: "md" }}
                  px={{ base: 3, md: 4 }}
                  whiteSpace="nowrap"
                >
                  <Text display={{ base: "none", sm: "inline" }}>📊 My Submissions</Text>
                  <Text display={{ base: "inline", sm: "none" }}>📊 Submissions</Text>
                </Tab>
                <Tab 
                  _selected={{ 
                    bg: cardBg,
                    borderColor: useColorModeValue('gray.200', 'gray.600'),
                    borderBottomColor: 'transparent'
                  }}
                  fontWeight="medium"
                  fontSize={{ base: "sm", md: "md" }}
                  px={{ base: 3, md: 4 }}
                  whiteSpace="nowrap"
                >
                  <Text display={{ base: "none", sm: "inline" }}>🏆 Badges & Achievements</Text>
                  <Text display={{ base: "inline", sm: "none" }}>🏆 Badges</Text>
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
                              <VStack spacing={3} align="stretch">
                                {/* Top Section - Product and Status */}
                                <HStack justify="space-between" align="start">
                                  <VStack align="start" spacing={1} flex={1}>
                                    <Text 
                                      fontWeight="bold" 
                                      fontSize={{ base: "md", md: "lg" }}
                                      lineHeight="shorter"
                                    >
                                      {submission.product?.name}
                                    </Text>
                                    <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
                                      📍 {submission.market?.name}
                                    </Text>
                                  </VStack>
                                  <Badge 
                                    colorScheme={
                                      submission.verificationStatus === 'verified' ? 'green' :
                                      submission.verificationStatus === 'pending' ? 'yellow' : 'red'
                                    }
                                    borderRadius="full"
                                    fontSize={{ base: "xs", md: "sm" }}
                                  >
                                    {submission.verificationStatus}
                                  </Badge>
                                </HStack>
                                
                                {/* Bottom Section - Price and Date */}
                                <HStack justify="space-between" align="center">
                                  <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
                                    📅 {submission.submissionDate.toLocaleDateString()}
                                  </Text>
                                  <Text 
                                    fontSize={{ base: "xl", md: "2xl" }} 
                                    fontWeight="bold" 
                                    color="green.500"
                                  >
                                    {submission.price} DH
                                  </Text>
                                </HStack>
                              </VStack>
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
                                      ✨ Earned {formatBadgeDate(badge.earnedAt)}
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
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default ProfilePage;
