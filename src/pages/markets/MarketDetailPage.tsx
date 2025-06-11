import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Card,
  CardBody,
  SimpleGrid,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Divider,
  Flex,
  IconButton,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowBackIcon, TimeIcon, StarIcon } from '@chakra-ui/icons';

// Custom icons
const LocationIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    />
  </Icon>
);

const PhoneIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
    />
  </Icon>
);
import { 
  getMockMarketById,
  getMockCityById,
  getMockSubmissionsByMarket,
  mockProducts 
} from '@/utils/mockData';
import { useAuth } from '@/hooks/useAuth';

const MarketDetailPage: React.FC = () => {
  const { marketId } = useParams<{ marketId: string }>();
  const { user } = useAuth();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState(0);

  if (!marketId) {
    return <Box>Market not found</Box>;
  }

  const market = getMockMarketById(marketId);
  const city = market ? getMockCityById(market.cityId) : null;
  const submissions = market ? getMockSubmissionsByMarket(marketId) : [];

  if (!market || !city) {
    return (
      <Container maxW="container.xl">
        <VStack spacing={6} py={8}>
          <Text fontSize="xl">Market not found</Text>
          <Button as={Link} to="/markets" leftIcon={<ArrowBackIcon />}>
            Back to Markets
          </Button>
        </VStack>
      </Container>
    );
  }

  // Group submissions by product
  const productPrices = submissions.reduce((acc, submission) => {
    const product = mockProducts.find(p => p.id === submission.productId);
    if (!product) return acc;

    if (!acc[product.id]) {
      acc[product.id] = {
        product,
        submissions: []
      };
    }
    acc[product.id].submissions.push(submission);
    return acc;
  }, {} as Record<string, { product: any; submissions: any[] }>);

  // Get latest price for each product
  const latestPrices = Object.values(productPrices).map(({ product, submissions }) => {
    const latest = submissions.sort((a, b) => 
      b.submissionDate.getTime() - a.submissionDate.getTime()
    )[0];
    
    const allPrices = submissions.map(s => s.price);
    const avgPrice = allPrices.reduce((sum, price) => sum + price, 0) / allPrices.length;
    
    return {
      product,
      latestSubmission: latest,
      averagePrice: avgPrice,
      submissionCount: submissions.length,
      priceRange: {
        min: Math.min(...allPrices),
        max: Math.max(...allPrices)
      }
    };
  });

  const recentSubmissions = submissions
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10);

  const isMarketOpen = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'monday' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5);
    
    const daySchedule = market.openingHours[currentDay];
    if (!daySchedule || daySchedule.isClosed) return false;
    
    return currentTime >= daySchedule.open && currentTime <= daySchedule.close;
  };

  const handleSubmitPrice = () => {
    if (!user?.isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to submit prices',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Navigate to price submission form
    // This would be implemented in the next phase
    toast({
      title: 'Coming Soon',
      description: 'Price submission form will be available soon',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={6} align="stretch">
        {/* Back Button */}
        <HStack>
          <IconButton
            as={Link}
            to="/markets"
            aria-label="Back to markets"
            icon={<ArrowBackIcon />}
            variant="ghost"
            size="lg"
          />
          <Text color="gray.600">Back to Markets</Text>
        </HStack>

        {/* Market Header */}
        <Card>
          <CardBody>
            <VStack align="start" spacing={4}>
              <HStack justify="space-between" w="full" align="start">
                <VStack align="start" spacing={2} flex={1}>
                  <Heading size="xl">{market.name}</Heading>
                  <Text fontSize="lg" color="gray.600">{market.nameAr}</Text>
                  <Text color="gray.500">{market.nameFr}</Text>
                </VStack>
                
                <VStack align="end" spacing={2}>
                  <Badge 
                    colorScheme={isMarketOpen() ? 'green' : 'red'}
                    fontSize="md"
                    p={2}
                  >
                    {isMarketOpen() ? 'Open Now' : 'Closed'}
                  </Badge>
                  <Badge 
                    colorScheme={
                      market.marketType === 'traditional' ? 'orange' :
                      market.marketType === 'modern' ? 'blue' : 'purple'
                    }
                    textTransform="capitalize"
                  >
                    {market.marketType} Market
                  </Badge>
                </VStack>
              </HStack>

              <Divider />

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} w="full">
                <HStack spacing={3}>
                  <LocationIcon color="gray.500" />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="medium">{city.name}</Text>
                    <Text fontSize="sm" color="gray.600">{market.address}</Text>
                  </VStack>
                </HStack>

                <HStack spacing={3}>
                  <TimeIcon color="gray.500" />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="medium">Today's Hours</Text>
                    <Text fontSize="sm" color="gray.600">
                      {(() => {
                        const today = new Date().toLocaleDateString('en-US', { weekday: 'monday' }).toLowerCase();
                        const todayHours = market.openingHours[today];
                        return todayHours && !todayHours.isClosed 
                          ? `${todayHours.open} - ${todayHours.close}`
                          : 'Closed today';
                      })()}
                    </Text>
                  </VStack>
                </HStack>

                <VStack align="start" spacing={1}>
                  <Text fontWeight="medium">Market Stats</Text>
                  <Text fontSize="sm" color="gray.600">
                    {latestPrices.length} products • {submissions.length} price updates
                  </Text>
                </VStack>
              </SimpleGrid>

              {user?.isAuthenticated && (
                <>
                  <Divider />
                  <Button 
                    colorScheme="green" 
                    size="lg"
                    leftIcon={<StarIcon />}
                    onClick={handleSubmitPrice}
                  >
                    Submit Price Update
                  </Button>
                </>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab} variant="line" colorScheme="green">
          <TabList>
            <Tab>Current Prices ({latestPrices.length})</Tab>
            <Tab>Recent Updates ({recentSubmissions.length})</Tab>
            <Tab>Opening Hours</Tab>
          </TabList>

          <TabPanels>
            {/* Current Prices Tab */}
            <TabPanel px={0}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {latestPrices.map(({ product, latestSubmission, averagePrice, submissionCount, priceRange }) => (
                  <Card key={product.id}>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <HStack justify="space-between" w="full">
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="bold">{product.name}</Text>
                            <Text fontSize="sm" color="gray.600">{product.nameAr}</Text>
                          </VStack>
                          <Badge colorScheme="green" variant="subtle">
                            {product.category}
                          </Badge>
                        </HStack>

                        <VStack align="start" spacing={2} w="full">
                          <HStack justify="space-between" w="full">
                            <Text fontSize="2xl" fontWeight="bold" color="green.500">
                              {latestSubmission.price} DH
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              per {latestSubmission.unit}
                            </Text>
                          </HStack>

                          <HStack justify="space-between" w="full" fontSize="sm" color="gray.600">
                            <Text>Avg: {averagePrice.toFixed(1)} DH</Text>
                            <Text>Range: {priceRange.min}-{priceRange.max} DH</Text>
                          </HStack>

                          <Badge 
                            colorScheme={
                              latestSubmission.quality === 'excellent' ? 'green' :
                              latestSubmission.quality === 'good' ? 'blue' : 'yellow'
                            }
                            size="sm"
                          >
                            {latestSubmission.quality} quality
                          </Badge>

                          <Text fontSize="xs" color="gray.500">
                            Updated {latestSubmission.submissionDate.toLocaleDateString()} • 
                            {submissionCount} reports
                          </Text>
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>

              {latestPrices.length === 0 && (
                <Box textAlign="center" py={12}>
                  <Text fontSize="lg" color="gray.500" mb={2}>
                    No price data available
                  </Text>
                  <Text color="gray.400" mb={4}>
                    Be the first to submit price information for this market
                  </Text>
                  {user?.isAuthenticated && (
                    <Button colorScheme="green" onClick={handleSubmitPrice}>
                      Submit First Price
                    </Button>
                  )}
                </Box>
              )}
            </TabPanel>

            {/* Recent Updates Tab */}
            <TabPanel px={0}>
              <VStack spacing={4} align="stretch">
                {recentSubmissions.map((submission) => {
                  const product = mockProducts.find(p => p.id === submission.productId);
                  return (
                    <Card key={submission.id}>
                      <CardBody>
                        <HStack justify="space-between" align="start">
                          <HStack spacing={3} flex={1}>
                            <Avatar 
                              size="sm" 
                              name={submission.user?.fullName}
                              src={submission.user?.avatarUrl}
                            />
                            <VStack align="start" spacing={1} flex={1}>
                              <HStack spacing={2}>
                                <Text fontWeight="medium">{submission.user?.username}</Text>
                                {submission.user?.isVerified && (
                                  <Badge size="sm" colorScheme="green">✓</Badge>
                                )}
                              </HStack>
                              <Text fontSize="sm" color="gray.600">
                                Updated {product?.name} price
                              </Text>
                              {submission.notes && (
                                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                                  "{submission.notes}"
                                </Text>
                              )}
                            </VStack>
                          </HStack>

                          <VStack align="end" spacing={1}>
                            <Text fontSize="xl" fontWeight="bold" color="green.500">
                              {submission.price} DH
                            </Text>
                            <Badge 
                              colorScheme={
                                submission.quality === 'excellent' ? 'green' :
                                submission.quality === 'good' ? 'blue' : 'yellow'
                              }
                              size="sm"
                            >
                              {submission.quality}
                            </Badge>
                            <Text fontSize="xs" color="gray.500">
                              {submission.submissionDate.toLocaleDateString()}
                            </Text>
                          </VStack>
                        </HStack>
                      </CardBody>
                    </Card>
                  );
                })}
              </VStack>

              {recentSubmissions.length === 0 && (
                <Box textAlign="center" py={12}>
                  <Text fontSize="lg" color="gray.500">
                    No recent updates
                  </Text>
                </Box>
              )}
            </TabPanel>

            {/* Opening Hours Tab */}
            <TabPanel px={0}>
              <Card>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Heading size="md">Weekly Schedule</Heading>
                    {Object.entries(market.openingHours).map(([day, hours]) => (
                      <HStack key={day} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                        <Text fontWeight="medium" textTransform="capitalize">
                          {day}
                        </Text>
                        <Text color={hours.isClosed ? 'red.500' : 'green.500'}>
                          {hours.isClosed ? 'Closed' : `${hours.open} - ${hours.close}`}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default MarketDetailPage;
