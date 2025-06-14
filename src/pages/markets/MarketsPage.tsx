import React, { useState, useMemo } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Input,
  Select,
  Button,
  InputGroup,
  InputLeftElement,
  Flex,
  Container,
  Icon,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { MarketCard } from '../../components/common/MarketCard';
import { 
  mockCities, 
  mockMarkets, 
  getMockSubmissionsByMarket 
} from '../../utils/mockData';
import { Market } from '../../types';

// Custom icons
const SearchIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
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
    
    // Calculate average price
    const avgPrice = submissions.length > 0 
      ? submissions.reduce((sum, sub) => sum + sub.price, 0) / submissions.length 
      : 0;
    
    return {
      totalProducts: new Set(submissions.map(sub => sub.productId)).size,
      recentUpdates: todaySubmissions.length,
      avgPrice: avgPrice,
      topContributors: []
    };
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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={8}>
          {filteredMarkets.map((market) => {
            const city = mockCities.find(c => c.id === market.cityId);
            const stats = getMarketStats(market);
            
            return (
              <MarketCard
                key={market.id}
                market={{
                  id: market.id,
                  name: market.name,
                  address: market.address,
                  marketType: market.marketType,
                  isActive: market.isActive,
                }}
                cityName={city?.name || 'Unknown City'}
                stats={{
                  totalProducts: stats.totalProducts,
                  recentUpdates: stats.recentUpdates,
                  avgPrice: stats.avgPrice,
                  topContributors: stats.topContributors
                }}
                compact={false}
              />
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
    </>
  );
};

export default MarketsPage;
