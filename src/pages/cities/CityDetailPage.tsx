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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { 
  getMockCityById, 
  getMockMarketsByCity, 
  getMockSubmissionsByCity,
  mockProducts 
} from '../../utils/mockData';

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

const StoreIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M12,10H6V6H12V10Z"
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
  const recentSubmissions = submissions
    .sort((a, b) => b.submissionDate.getTime() - a.submissionDate.getTime())
    .slice(0, 10);

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
    <Container maxW="container.xl">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack>
          <IconButton
            as={Link}
            to="/"
            aria-label="Back to home"
            icon={<ArrowBackIcon />}
            variant="ghost"
            size="lg"
          />
          <Text color="gray.600">Back to Home</Text>
        </HStack>

        {/* City Info */}
        <Box>
          <Heading size="2xl" mb={2}>{city.name}</Heading>
          <HStack spacing={4} mb={4}>
            <Text fontSize="lg" color="gray.600">{city.nameAr}</Text>
            <Text fontSize="lg" color="gray.500">{city.nameFr}</Text>
          </HStack>
          <HStack spacing={4}>
            <HStack spacing={2}>
              <LocationIcon color="gray.500" />
              <Text color="gray.600">{city.region}</Text>
            </HStack>
            <Badge colorScheme="green">Active</Badge>
          </HStack>
        </Box>

        <Divider />

        {/* Statistics */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Stat>
            <StatLabel>Total Markets</StatLabel>
            <StatNumber>{totalMarkets}</StatNumber>
            <StatHelpText>{activeMarkets} active</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Price Updates</StatLabel>
            <StatNumber>{totalSubmissions}</StatNumber>
            <StatHelpText>This month</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Popular Products</StatLabel>
            <StatNumber>{popularProducts.length}</StatNumber>
            <StatHelpText>Most tracked</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Market Types</StatLabel>
            <StatNumber>{new Set(markets.map(m => m.marketType)).size}</StatNumber>
            <StatHelpText>Different types</StatHelpText>
          </Stat>
        </SimpleGrid>

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
                    <Text fontSize="sm" color="gray.600">{product?.nameAr}</Text>
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

          {/* Markets Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
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
                <Card key={market.id} as={Link} to={`/markets/${market.id}`} _hover={{ shadow: 'md' }}>
                  <CardBody>
                    <VStack align="start" spacing={3}>
                      <HStack justify="space-between" w="full">
                        <StoreIcon color="green.500" boxSize={6} />
                        <Badge colorScheme={isOpen ? 'green' : 'red'}>
                          {isOpen ? 'Open' : 'Closed'}
                        </Badge>
                      </HStack>
                      
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" fontSize="lg">{market.name}</Text>
                        <Text fontSize="sm" color="gray.600">{market.nameAr}</Text>
                        <Text fontSize="xs" color="gray.500">{market.address}</Text>
                      </VStack>

                      <HStack justify="space-between" w="full">
                        <Badge 
                          colorScheme={
                            market.marketType === 'traditional' ? 'orange' :
                            market.marketType === 'modern' ? 'blue' : 'purple'
                          }
                        >
                          {market.marketType}
                        </Badge>
                        <Text fontSize="sm" color="gray.500">
                          {marketSubmissions.length} updates
                        </Text>
                      </HStack>
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
