import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Button,
  IconButton,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Divider,
  Icon,
  useColorModeValue,
  AspectRatio,
  Tooltip,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { 
  getMockCityById, 
  getMockMarketsByCity, 
  getMockSubmissionsByCity,
  mockProducts 
} from '../../utils/mockData';
import { openGoogleMaps } from '../../utils/mapsUtils';

// Custom icons
const SearchIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    />
  </Icon>
);

const LocationIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    />
  </Icon>
);

const CityDetailPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [marketTypeFilter, setMarketTypeFilter] = useState('all');

  if (!cityId) {
    return <Box>City not found</Box>;
  }

  const city = getMockCityById(cityId);
  const markets = getMockMarketsByCity(cityId);
  const submissions = getMockSubmissionsByCity(cityId);

  if (!city) {
    return (
      <Container maxW="container.xl">
        <VStack spacing={6} py={8}>
          <Text fontSize="xl">City not found</Text>
          <Button as={Link} to="/" leftIcon={<ArrowBackIcon />}>
            Back to Home
          </Button>
        </VStack>
      </Container>
    );
  }

  // Filter markets based on search and type
  const filteredMarkets = markets.filter(market => {
    const matchesSearch = searchTerm === '' || 
      market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.nameAr.includes(searchTerm) ||
      market.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = marketTypeFilter === 'all' || market.marketType === marketTypeFilter;
    
    return matchesSearch && matchesType;
  });

  // Calculate statistics
  const totalMarkets = markets.length;
  const totalSubmissions = submissions.length;
  const activeMarkets = markets.filter(m => m.isActive).length;

  // Get popular products in this city
  const productSubmissions = submissions.reduce((acc, submission) => {
    if (!acc[submission.productId]) {
      acc[submission.productId] = { count: 0, totalPrice: 0 };
    }
    acc[submission.productId].count++;
    acc[submission.productId].totalPrice += submission.price;
    return acc;
  }, {} as Record<string, { count: number; totalPrice: number }>);

  const popularProducts = Object.entries(productSubmissions)
    .map(([productId, data]) => ({
      product: mockProducts.find(p => p.id === productId),
      submissions: (data as { count: number; totalPrice: number }).count,
      averagePrice: (data as { count: number; totalPrice: number }).totalPrice / (data as { count: number; totalPrice: number }).count
    }))
    .filter(item => item.product)
    .sort((a, b) => b.submissions - a.submissions)
    .slice(0, 6);

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={8} align="stretch">
        {/* Enhanced Header */}
        <Card bg={useColorModeValue('gray.50', 'gray.900')} borderRadius="xl">
          <CardBody py={4}>
            <HStack spacing={4}>
              <IconButton
                as={Link}
                to="/"
                aria-label="Back to home"
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
                  City Details
                </Text>
                <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                  Back to Home
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Enhanced City Info Card */}
        <Card shadow="xl" borderRadius="2xl" bg={useColorModeValue('white', 'gray.800')}>
          <CardBody p={8}>
            <VStack spacing={6} align="stretch">
              {/* City Header */}
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
                      bgGradient="linear(to-br, blue.400, purple.600)"
                      color="white"
                      borderRadius="2xl"
                      fontSize="4xl"
                    >
                      🏙️
                    </Flex>
                  </AspectRatio>
                </Box>
                
                <VStack align={{ base: 'center', md: 'start' }} spacing={3} flex={1}>
                  <Heading 
                    size="2xl" 
                    textAlign={{ base: 'center', md: 'left' }}
                    bgGradient="linear(to-r, blue.400, purple.500)"
                    bgClip="text"
                  >
                    {city.name}
                  </Heading>
                  
                  <HStack spacing={4} flexWrap="wrap" justify={{ base: 'center', md: 'start' }}>
                    <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                      {city.nameAr}
                    </Text>
                    <Text fontSize="lg" color={useColorModeValue('gray.500', 'gray.400')}>
                      {city.nameFr}
                    </Text>
                  </HStack>
                  
                  <HStack spacing={4} flexWrap="wrap" justify={{ base: 'center', md: 'start' }}>
                    <HStack spacing={2}>
                      <LocationIcon color="gray.500" />
                      <Text color={useColorModeValue('gray.600', 'gray.300')}>
                        {city.region}
                      </Text>
                    </HStack>
                    <Badge
                      colorScheme="green"
                      variant="solid"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                    >
                      Active
                    </Badge>
                  </HStack>
                </VStack>
                
                <VStack spacing={3}>
                  <Tooltip label="View on Google Maps" hasArrow>
                    <Button
                      colorScheme="blue"
                      size="lg"
                      leftIcon={<ExternalLinkIcon />}
                      borderRadius="full"
                      onClick={() => openGoogleMaps(city.coordinates, city.name)}
                      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                      transition="all 0.2s ease"
                    >
                      View on Maps
                    </Button>
                  </Tooltip>
                </VStack>
              </Flex>
            </VStack>
          </CardBody>
        </Card>

        {/* Enhanced Statistics */}
        <Card shadow="lg" borderRadius="xl">
          <CardBody p={6}>
            <Heading size="md" mb={4} color={useColorModeValue('gray.700', 'gray.200')}>
              City Statistics
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              <VStack spacing={2} textAlign="center">
                <Box
                  bg={useColorModeValue('blue.50', 'blue.900')}
                  p={3}
                  borderRadius="xl"
                  color="blue.500"
                >
                  <Icon boxSize={6} viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </Icon>
                </Box>
                <Text fontSize="2xl" fontWeight="bold">{totalMarkets}</Text>
                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                  Total Markets
                </Text>
                <Text fontSize="xs" color="green.500">
                  {activeMarkets} active
                </Text>
              </VStack>
              
              <VStack spacing={2} textAlign="center">
                <Box
                  bg={useColorModeValue('green.50', 'green.900')}
                  p={3}
                  borderRadius="xl"
                  color="green.500"
                >
                  <Icon boxSize={6} viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"
                    />
                  </Icon>
                </Box>
                <Text fontSize="2xl" fontWeight="bold">{totalSubmissions}</Text>
                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                  Price Updates
                </Text>
                <Text fontSize="xs" color="blue.500">
                  This month
                </Text>
              </VStack>
              
              <VStack spacing={2} textAlign="center">
                <Box
                  bg={useColorModeValue('orange.50', 'orange.900')}
                  p={3}
                  borderRadius="xl"
                  color="orange.500"
                >
                  <Icon boxSize={6} viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </Icon>
                </Box>
                <Text fontSize="2xl" fontWeight="bold">{popularProducts.length}</Text>
                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                  Popular Products
                </Text>
                <Text fontSize="xs" color="orange.500">
                  Most tracked
                </Text>
              </VStack>
              
              <VStack spacing={2} textAlign="center">
                <Box
                  bg={useColorModeValue('purple.50', 'purple.900')}
                  p={3}
                  borderRadius="xl"
                  color="purple.500"
                >
                  <Icon boxSize={6} viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    />
                  </Icon>
                </Box>
                <Text fontSize="2xl" fontWeight="bold">
                  {new Set(markets.map(m => m.marketType)).size}
                </Text>
                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                  Market Types
                </Text>
                <Text fontSize="xs" color="purple.500">
                  Different types
                </Text>
              </VStack>
            </SimpleGrid>
          </CardBody>
        </Card>

        <Divider />

        {/* Popular Products */}
        <Box>
          <Heading size="lg" mb={4}>Popular Products in {city.name}</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {popularProducts.map(({ product, submissions, averagePrice }) => (
              <Card key={product?.id}>
                <CardBody>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">{product?.name}</Text>
                    <Text fontSize="sm" color="gray.600">{product?.category}</Text>
                    <HStack justify="space-between" w="full">
                      <Text fontSize="lg" fontWeight="bold" color="green.500">
                        {averagePrice.toFixed(2)} DH
                      </Text>
                      <Badge colorScheme="blue">{submissions} updates</Badge>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        <Divider />

        {/* Markets Section */}
        <Box>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="lg">Markets in {city.name}</Heading>
            <Button as={Link} to="/markets" size="sm" variant="outline">
              View All Markets
            </Button>
          </Flex>

          {/* Search and Filter */}
          <HStack spacing={4} mb={4}>
            <InputGroup flex={1}>
              <InputLeftElement>
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search markets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <Select
              value={marketTypeFilter}
              onChange={(e) => setMarketTypeFilter(e.target.value)}
              w="200px"
            >
              <option value="all">All Types</option>
              <option value="traditional">Traditional</option>
              <option value="modern">Modern</option>
              <option value="wholesale">Wholesale</option>
            </Select>
          </HStack>

          {/* Enhanced Markets Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredMarkets.map(market => {
              const marketSubmissions = submissions.filter(s => s.marketId === market.id);
              const isOpen = (() => {
                const now = new Date();
                const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                const currentTime = now.toTimeString().slice(0, 5);
                const daySchedule = market.openingHours[currentDay];
                return daySchedule && !daySchedule.isClosed && 
                       currentTime >= daySchedule.open && currentTime <= daySchedule.close;
              })();

              return (
                <Card 
                  key={market.id} 
                  shadow="lg" 
                  borderRadius="xl"
                  overflow="hidden"
                  transition="all 0.3s ease"
                  _hover={{ 
                    transform: 'translateY(-4px)', 
                    shadow: '2xl',
                    borderColor: 'green.300' 
                  }}
                  cursor="pointer"
                  bg={useColorModeValue('white', 'gray.800')}
                  borderWidth="1px"
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                >
                  {/* Market Header */}
                  <Box 
                    bg={useColorModeValue('gray.50', 'gray.700')} 
                    p={4} 
                    borderBottom="1px solid" 
                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                  >
                    <HStack justify="space-between">
                      <HStack spacing={3}>
                        <Box
                          bg={isOpen ? 'green.100' : 'red.100'}
                          p={2}
                          borderRadius="lg"
                          color={isOpen ? 'green.600' : 'red.600'}
                        >
                          <Icon boxSize={5} viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            />
                          </Icon>
                        </Box>
                        <VStack align="start" spacing={0}>
                          <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                            Status
                          </Text>
                          <Badge 
                            colorScheme={isOpen ? 'green' : 'red'}
                            variant="solid"
                            borderRadius="full"
                            px={2}
                          >
                            {isOpen ? 'Open Now' : 'Closed'}
                          </Badge>
                        </VStack>
                      </HStack>
                      
                      <Badge 
                        colorScheme={
                          market.marketType === 'traditional' ? 'orange' :
                          market.marketType === 'modern' ? 'blue' : 'purple'
                        }
                        variant="outline"
                        borderRadius="full"
                        px={3}
                        py={1}
                      >
                        {market.marketType}
                      </Badge>
                    </HStack>
                  </Box>

                  <CardBody p={6}>
                    <VStack align="start" spacing={4}>
                      {/* Market Info */}
                      <VStack align="start" spacing={2} w="full">
                        <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                          {market.name}
                        </Text>
                        <HStack spacing={2}>
                          <LocationIcon color="gray.500" boxSize={4} />
                          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} noOfLines={2}>
                            {market.address}
                          </Text>
                        </HStack>
                      </VStack>

                      {/* Statistics */}
                      <HStack justify="space-between" w="full">
                        <VStack spacing={0}>
                          <Text fontSize="lg" fontWeight="bold" color="green.500">
                            {marketSubmissions.length}
                          </Text>
                          <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                            Price Updates
                          </Text>
                        </VStack>
                        <VStack spacing={0}>
                          <Text fontSize="lg" fontWeight="bold" color="blue.500">
                            {Object.keys(market.openingHours).filter(
                              day => !market.openingHours[day].isClosed
                            ).length}
                          </Text>
                          <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                            Days Open
                          </Text>
                        </VStack>
                      </HStack>

                      {/* Action Buttons */}
                      <VStack spacing={2} w="full">
                        <Button
                          as={Link}
                          to={`/markets/${market.id}`}
                          colorScheme="green"
                          size="sm"
                          w="full"
                          borderRadius="lg"
                          leftIcon={<Icon viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                            />
                          </Icon>}
                        >
                          View Details
                        </Button>
                        
                        <Button
                          variant="outline"
                          colorScheme="blue"
                          size="sm"
                          w="full"
                          borderRadius="lg"
                          leftIcon={<ExternalLinkIcon />}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openGoogleMaps(market.coordinates, market.name);
                          }}
                        >
                          View on Maps
                        </Button>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>
              );
            })}
          </SimpleGrid>

          {filteredMarkets.length === 0 && (
            <Text textAlign="center" color="gray.500" py={8}>
              No markets found matching your criteria.
            </Text>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default CityDetailPage;
