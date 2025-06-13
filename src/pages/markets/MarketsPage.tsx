import React, { useState, useMemo } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  VStack,
  HStack,
  Badge,
  Input,
  Select,
  Button,
  InputGroup,
  InputLeftElement,
  Flex,
  Container,
  Icon,
} from '@chakra-ui/react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  mockCities, 
  mockMarkets, 
  getMockMarketsByCity,
  getMockSubmissionsByMarket 
} from '../../utils/mockData';
import { Market } from '../../types';
import { QuickPriceSubmissionButton } from '../../components/ui/QuickPriceSubmissionButton';

// Custom icons
const SearchIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    />
  </Icon>
);

const TimeIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
    />
    <path fill="currentColor" d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
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

const MarketsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [marketType, setMarketType] = useState('');

  // Filter markets based on search criteria
  const filteredMarkets = useMemo(() => {
    let filtered = mockMarkets;

    // Filter by city
    if (selectedCity) {
      filtered = filtered.filter(market => market.cityId === selectedCity);
    }

    // Filter by market type
    if (marketType) {
      filtered = filtered.filter(market => market.marketType === marketType);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(market => 
        market.name.toLowerCase().includes(query) ||
        market.nameAr.includes(searchQuery) ||
        market.nameFr.toLowerCase().includes(query) ||
        market.address.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCity, marketType, searchQuery]);

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId);
    if (cityId) {
      setSearchParams({ city: cityId });
    } else {
      setSearchParams({});
    }
  };

  const getMarketStats = (market: Market) => {
    const submissions = getMockSubmissionsByMarket(market.id);
    const todaySubmissions = submissions.filter(
      sub => sub.submissionDate.toDateString() === new Date().toDateString()
    );
    
    return {
      totalSubmissions: submissions.length,
      todaySubmissions: todaySubmissions.length,
      uniqueProducts: new Set(submissions.map(sub => sub.productId)).size,
    };
  };

  const isMarketOpen = (market: Market) => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5);
    
    const daySchedule = market.openingHours[currentDay];
    if (!daySchedule || daySchedule.isClosed) return false;
    
    return currentTime >= daySchedule.open && currentTime <= daySchedule.close;
  };

  return (
    <>
      <Container maxW="container.xl">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="xl" mb={2}>
            Markets Directory
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Discover markets across Morocco and compare prices
          </Text>
        </Box>

        {/* Filters */}
        <Box bg="white" p={6} borderRadius="xl" boxShadow="sm">
          <VStack spacing={4}>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={4}
              w="full"
              align="center"
            >
              <InputGroup flex={2}>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search markets by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="lg"
                />
              </InputGroup>

              <Select
                placeholder="All Cities"
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                size="lg"
                flex={1}
              >
                {mockCities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name} ({city.nameAr})
                  </option>
                ))}
              </Select>

              <Select
                placeholder="All Types"
                value={marketType}
                onChange={(e) => setMarketType(e.target.value)}
                size="lg"
                flex={1}
              >
                <option value="traditional">Traditional</option>
                <option value="modern">Modern</option>
                <option value="wholesale">Wholesale</option>
              </Select>
            </Flex>

            <HStack spacing={2} align="center" color="gray.600">
              <Text fontSize="sm">
                Showing {filteredMarkets.length} of {mockMarkets.length} markets
              </Text>
              {(searchQuery || selectedCity || marketType) && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCity('');
                    setMarketType('');
                    setSearchParams({});
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </HStack>
          </VStack>
        </Box>

        {/* Markets Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredMarkets.map((market) => {
            const city = mockCities.find(c => c.id === market.cityId);
            const stats = getMarketStats(market);
            const isOpen = isMarketOpen(market);
            
            return (
              <Card 
                key={market.id}
                as={Link}
                to={`/markets/${market.id}`}
                _hover={{ 
                  transform: 'translateY(-4px)', 
                  boxShadow: 'xl',
                  transition: 'all 0.2s'
                }}
                cursor="pointer"
                h="full"
              >
                <CardBody>
                  <VStack align="start" spacing={4} h="full">
                    {/* Header */}
                    <HStack justify="space-between" w="full">
                      <VStack align="start" spacing={1} flex={1}>
                        <Text fontSize="xl" fontWeight="bold" noOfLines={1}>
                          {market.name}
                        </Text>
                        <Text fontSize="sm" color="gray.600" noOfLines={1}>
                          {market.nameAr}
                        </Text>
                      </VStack>
                      <Badge 
                        colorScheme={isOpen ? 'green' : 'red'}
                        variant="subtle"
                      >
                        {isOpen ? 'Open' : 'Closed'}
                      </Badge>
                    </HStack>

                    {/* Location */}
                    <HStack spacing={2} color="gray.600">
                      <LocationIcon boxSize={4} />
                      <VStack align="start" spacing={0} flex={1}>
                        <Text fontSize="sm" fontWeight="medium">
                          {city?.name}
                        </Text>
                        <Text fontSize="xs" noOfLines={2}>
                          {market.address}
                        </Text>
                      </VStack>
                    </HStack>

                    {/* Market Type */}
                    <HStack spacing={2}>
                      <Badge 
                        colorScheme={
                          market.marketType === 'traditional' ? 'orange' :
                          market.marketType === 'modern' ? 'blue' : 'purple'
                        }
                        textTransform="capitalize"
                      >
                        {market.marketType}
                      </Badge>
                    </HStack>

                    {/* Stats */}
                    <SimpleGrid columns={3} spacing={2} w="full" mt="auto">
                      <VStack spacing={1}>
                        <Text fontSize="lg" fontWeight="bold" color="green.500">
                          {stats.uniqueProducts}
                        </Text>
                        <Text fontSize="xs" color="gray.600" textAlign="center">
                          Products
                        </Text>
                      </VStack>
                      <VStack spacing={1}>
                        <Text fontSize="lg" fontWeight="bold" color="green.500">
                          {stats.totalSubmissions}
                        </Text>
                        <Text fontSize="xs" color="gray.600" textAlign="center">
                          Price Updates
                        </Text>
                      </VStack>
                      <VStack spacing={1}>
                        <Text fontSize="lg" fontWeight="bold" color="green.500">
                          {stats.todaySubmissions}
                        </Text>
                        <Text fontSize="xs" color="gray.600" textAlign="center">
                          Today
                        </Text>
                      </VStack>
                    </SimpleGrid>

                    {/* Opening Hours */}
                    <HStack spacing={2} color="gray.500" fontSize="sm">
                      <TimeIcon boxSize={4} />
                      <Text>
                        {(() => {
                          const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                          const todayHours = market.openingHours[today];
                          return todayHours && !todayHours.isClosed 
                            ? `${todayHours.open} - ${todayHours.close}`
                            : 'Closed today';
                        })()}
                      </Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>

        {/* Empty State */}
        {filteredMarkets.length === 0 && (
          <Box textAlign="center" py={12}>
            <Text fontSize="xl" color="gray.500" mb={2}>
              No markets found
            </Text>
            <Text color="gray.400">
              Try adjusting your search criteria or clear filters
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
    
    <QuickPriceSubmissionButton />
    </>
  );
};

export default MarketsPage;
