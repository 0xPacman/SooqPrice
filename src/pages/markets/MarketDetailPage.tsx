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
  IconButton,
  Icon,
  useColorModeValue,
  AspectRatio,
  Flex,
  Tooltip,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowBackIcon, TimeIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { openGoogleMaps } from '../../utils/mapsUtils';

// Custom icons
const LocationIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    />
  </Icon>
);
import { 
  getMockMarketById,
  getMockCityById,
  getMockSubmissionsByMarket,
  mockProducts 
} from '../../utils/mockData';
import { Product, PriceSubmission } from '../../types';
import { FloatingActionButton } from '../../components/ui/FloatingActionButton';
import { ReportButton } from '../../components/ui/ReportButton';

const MarketDetailPage: React.FC = () => {
  const { marketId } = useParams<{ marketId: string }>();
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
  }, {} as Record<string, { product: Product; submissions: PriceSubmission[] }>);

  // Get latest price for each product
  const latestPrices = (Object.values(productPrices) as { product: Product; submissions: PriceSubmission[] }[]).map(({ product, submissions }) => {
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
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5);
    
    const daySchedule = market.openingHours[currentDay];
    if (!daySchedule || daySchedule.isClosed) return false;
    
    return currentTime >= daySchedule.open && currentTime <= daySchedule.close;
  };

  return (
    <>
      <Container maxW="container.xl" py={6}>
        <VStack spacing={8} align="stretch">
          {/* Enhanced Header */}
          <Card bg={useColorModeValue('gray.50', 'gray.900')} borderRadius="xl">
            <CardBody py={4}>
              <HStack spacing={4}>
                <IconButton
                  as={Link}
                  to="/markets"
                  aria-label="Back to markets"
                  icon={<ArrowBackIcon />}
                  variant="ghost"
                  size="lg"
                  borderRadius="full"
                  bg={useColorModeValue('white', 'gray.700')}
                  shadow="md"
                  _hover={{ transform: 'translateX(-2px)', shadow: 'lg' }}
                  transition="all 0.2s ease"
                />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold" color={useColorModeValue('gray.700', 'gray.300')}>
                    Market Details
                  </Text>
                  <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                    Back to Markets
                  </Text>
                </VStack>
              </HStack>
            </CardBody>
          </Card>

          {/* Enhanced Market Header */}
          <Card shadow="xl" borderRadius="2xl" bg={useColorModeValue('white', 'gray.800')}>
            <CardBody p={8}>
              <VStack spacing={6} align="stretch">
                {/* Market Header */}
                <Flex 
                  direction={{ base: 'column', md: 'row' }} 
                  align={{ base: 'center', md: 'start' }} 
                  gap={6}
                >
                  <Box>
                    <AspectRatio ratio={1} w="120px">
                      <Flex
                        align="center"
                        justify="center"
                        bgGradient={
                          market.marketType === 'traditional' 
                            ? 'linear(to-br, orange.400, red.500)'
                            : market.marketType === 'modern'
                            ? 'linear(to-br, blue.400, purple.500)'
                            : 'linear(to-br, purple.400, pink.500)'
                        }
                        color="white"
                        borderRadius="2xl"
                        fontSize="4xl"
                      >
                        🏪
                      </Flex>
                    </AspectRatio>
                  </Box>
                  
                  <VStack align={{ base: 'center', md: 'start' }} spacing={3} flex={1}>
                    <Heading 
                      size="2xl" 
                      textAlign={{ base: 'center', md: 'left' }}
                      bgGradient="linear(to-r, green.400, blue.500)"
                      bgClip="text"
                    >
                      {market.name}
                    </Heading>
                    
                    <HStack spacing={3} flexWrap="wrap" justify={{ base: 'center', md: 'start' }}>
                      <Badge
                        colorScheme={isMarketOpen() ? 'green' : 'red'}
                        variant="solid"
                        px={4}
                        py={2}
                        borderRadius="full"
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        {isMarketOpen() ? '🟢 Open Now' : '🔴 Closed'}
                      </Badge>
                      
                      <Badge
                        colorScheme={
                          market.marketType === 'traditional' ? 'orange' :
                          market.marketType === 'modern' ? 'blue' : 'purple'
                        }
                        variant="outline"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                      >
                        {market.marketType}
                      </Badge>
                    </HStack>
                    
                    <HStack spacing={2} justify={{ base: 'center', md: 'start' }}>
                      <LocationIcon color="gray.500" />
                      <Text 
                        fontSize="lg" 
                        color={useColorModeValue('gray.600', 'gray.300')}
                        textAlign={{ base: 'center', md: 'left' }}
                      >
                        {market.address}
                      </Text>
                    </HStack>
                    
                    <Text 
                      fontSize="md" 
                      color={useColorModeValue('gray.500', 'gray.400')}
                      textAlign={{ base: 'center', md: 'left' }}
                    >
                      {city?.name}, {city?.region}
                    </Text>
                  </VStack>
                  
                  <VStack spacing={3}>
                    <Tooltip label="View on Google Maps" hasArrow>
                      <Button
                        colorScheme="blue"
                        size="lg"
                        leftIcon={<ExternalLinkIcon />}
                        borderRadius="full"
                        onClick={() => openGoogleMaps(market.coordinates, market.name)}
                        _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                        transition="all 0.2s ease"
                      >
                        View on Maps
                      </Button>
                    </Tooltip>
                    
                    <ReportButton
                      reportType="market"
                      targetId={market.id}
                      targetName={market.name}
                      variant="button"
                      size="sm"
                    />
                  </VStack>
                </Flex>
              </VStack>
            </CardBody>
          </Card>

        {/* Market Details and Statistics */}
        <Card shadow="lg" borderRadius="xl">
          <CardBody p={6}>
            <VStack spacing={6} align="stretch">
              <HStack justify="space-between" align="center" flexWrap="wrap">
                <VStack align="start" spacing={2}>
                  <Heading size="md">Market Information</Heading>
                  <Badge
                    colorScheme={
                      market.marketType === 'traditional' ? 'orange' :
                      market.marketType === 'modern' ? 'blue' : 'green'
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
                        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
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
                            <HStack>
                              <ReportButton
                                reportType="price"
                                targetId={submission.id}
                                targetName={`${product?.name} price by ${submission.user?.username}`}
                                variant="icon"
                                size="xs"
                              />
                              <Text fontSize="xl" fontWeight="bold" color="green.500">
                                {submission.price} DH
                              </Text>
                            </HStack>
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
                        <Text color={(hours as any).isClosed ? 'red.500' : 'green.500'}>
                          {(hours as any).isClosed ? 'Closed' : `${(hours as any).open} - ${(hours as any).close}`}
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
    
    <FloatingActionButton
      marketId={market.id}
      marketName={market.name}
      label="Submit Price"
    />
    </>
  );
};

export default MarketDetailPage;
