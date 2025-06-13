import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Badge,
  HStack,
  VStack,
  Icon,
  Container,
  Flex,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { SearchIcon, StarIcon } from '@chakra-ui/icons';

// Custom icons
const TrendingUpIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"
    />
  </Icon>
);

const UsersIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.996 3.996 0 0 0 16.13 6c-.8 0-1.54.31-2.13.81l-3.5 3.5c-.78.78-.78 2.05 0 2.83.78.78 2.05.78 2.83 0L14 12.5V22h2zm-7.5-10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9.5l-3.5-3.5C5 5.45 4.55 5 4 5s-1 .45-1 1 .45 1 1 1l2.5 2.5L7.5 22h2z"
    />
  </Icon>
);
import { useAuth } from '../../hooks/useAuth';
import { 
  mockCities, 
  mockMarkets, 
  mockPriceSubmissions, 
  mockProducts,
  getMockLatestPrices 
} from '../../utils/mockData';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  // Get recent price submissions
  const recentSubmissions = mockPriceSubmissions
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 6);

  // Get popular products with price ranges
  const popularProducts = mockProducts.slice(0, 4).map(product => {
    const latestPrices = getMockLatestPrices(product.id);
    const prices = latestPrices.map(submission => submission.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return {
      ...product,
      priceRange: prices.length > 0 ? { min: minPrice, max: maxPrice } : null,
      marketCount: latestPrices.length
    };
  });

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bg="linear-gradient(135deg, #4A9B3B 0%, #2D5E1F 100%)"
        color="white"
        py={{ base: 12, md: 20 }}
        px={{ base: 4, md: 8 }}
        borderRadius="2xl"
        mb={8}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          right={0}
          w="300px"
          h="300px"
          bg="rgba(255,255,255,0.1)"
          borderRadius="full"
          transform="translate(100px, -100px)"
        />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          w="200px"
          h="200px"
          bg="rgba(255,255,255,0.05)"
          borderRadius="full"
          transform="translate(-50px, 50px)"
        />
        
        <Container maxW="container.lg" position="relative">
          <VStack spacing={6} align="center" textAlign="center">
            <Heading 
              size={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              🛒 Welcome to SooqPrice
            </Heading>
            <Text 
              fontSize={{ base: "lg", md: "xl" }}
              maxW="600px"
              opacity={0.9}
            >
              Monitor and compare fresh produce prices across Moroccan souks. 
              Join our community and help others find the best deals!
            </Text>
            
            {!user?.isAuthenticated ? (
              <HStack spacing={4}>
                <Button 
                  as={Link}
                  to="/register"
                  size="lg"
                  bg="white"
                  color="green.500"
                  _hover={{ bg: "gray.100", transform: "translateY(-2px)" }}
                  leftIcon={<UsersIcon />}
                >
                  Join Community
                </Button>
                <Button 
                  as={Link}
                  to="/markets"
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                  leftIcon={<SearchIcon />}
                >
                  Browse Markets
                </Button>
              </HStack>
            ) : (
              <HStack spacing={4}>
                <Button 
                  as={Link}
                  to="/submit"
                  size="lg"
                  bg="white"
                  color="green.500"
                  _hover={{ bg: "gray.100", transform: "translateY(-2px)" }}
                  leftIcon={<StarIcon />}
                >
                  Submit Price
                </Button>
                <Button 
                  as={Link}
                  to="/markets"
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                  leftIcon={<SearchIcon />}
                >
                  Browse Markets
                </Button>
              </HStack>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Stats Section */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={8}>
        <Card>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              {mockCities.length}
            </Text>
            <Text color="gray.600">Cities</Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              {mockMarkets.length}
            </Text>
            <Text color="gray.600">Markets</Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              {mockProducts.length}
            </Text>
            <Text color="gray.600">Products</Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              {mockPriceSubmissions.length}
            </Text>
            <Text color="gray.600">Price Updates</Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Popular Products */}
      <Box mb={8}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg">Popular Products</Heading>
          <Button as={Link} to="/markets" variant="ghost" rightIcon={<SearchIcon />}>
            View All
          </Button>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          {popularProducts.map((product) => (
            <Card 
              key={product.id} 
              as={Link}
              to={`/products/${product.id}`}
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              cursor="pointer"
            >
              <CardBody>
                <VStack align="start" spacing={3}>
                  <Box 
                    w="full" 
                    h="120px" 
                    bg="gray.100" 
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="3xl"
                  >
                    📦
                  </Box>
                  <VStack align="start" spacing={1} w="full">
                    <Text fontWeight="semibold">{product.name}</Text>
                    <Text fontSize="sm" color="gray.600">{product.name}</Text>
                    {product.priceRange && (
                      <HStack>
                        <Text fontSize="lg" fontWeight="bold" color="green.500">
                          {product.priceRange.min === product.priceRange.max 
                            ? `${product.priceRange.min} DH`
                            : `${product.priceRange.min}-${product.priceRange.max} DH`
                          }
                        </Text>
                        <Text fontSize="sm" color="gray.500">per {product.unit}</Text>
                      </HStack>
                    )}
                    <Text fontSize="xs" color="gray.500">
                      Available in {product.marketCount} markets
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>

      {/* Recent Price Updates */}
      <Box mb={8}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg">Recent Price Updates</Heading>
          <Button as={Link} to="/activity" variant="ghost" rightIcon={<TrendingUpIcon />}>
            View All
          </Button>
        </Flex>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {recentSubmissions.map((submission) => (
            <Card key={submission.id}>
              <CardBody>
                <VStack align="start" spacing={3}>
                  <HStack justify="space-between" w="full">
                    <VStack align="start" spacing={1}>
                      <Button
                        as={Link}
                        to={`/products/${submission.product?.id}`}
                        variant="link"
                        size="sm"
                        fontWeight="semibold"
                        p={0}
                        h="auto"
                        minH="auto"
                      >
                        {submission.product?.name}
                      </Button>
                      <Text fontSize="sm" color="gray.600">
                        {submission.market?.name}
                      </Text>
                    </VStack>
                    <Badge 
                      colorScheme={submission.quality === 'excellent' ? 'green' : 
                                 submission.quality === 'good' ? 'blue' : 'yellow'}
                    >
                      {submission.quality}
                    </Badge>
                  </HStack>
                  
                  <HStack justify="space-between" w="full">
                    <Text fontSize="xl" fontWeight="bold" color="green.500">
                      {submission.price} DH
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      per {submission.unit}
                    </Text>
                  </HStack>
                  
                  <Divider />
                  
                  <HStack justify="space-between" w="full">
                    <HStack spacing={2}>
                      <Avatar 
                        size="xs" 
                        name={submission.user?.fullName}
                        src={submission.user?.avatarUrl}
                      />
                      <Text fontSize="sm" color="gray.600">
                        {submission.user?.username}
                      </Text>
                      {submission.user?.isVerified && (
                        <Badge size="sm" colorScheme="green">✓</Badge>
                      )}
                    </HStack>
                    <Text fontSize="xs" color="gray.500">
                      {submission.submissionDate.toLocaleDateString()}
                    </Text>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>

      {/* Cities Quick Access */}
      <Box>
        <Heading size="lg" mb={4}>Browse by City</Heading>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          {mockCities.map((city) => {
            const cityMarkets = mockMarkets.filter(market => market.cityId === city.id);
            return (
              <Card 
                key={city.id} 
                as={Link}
                to={`/cities/${city.id}`}
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                cursor="pointer"
              >
                <CardBody textAlign="center">
                  <VStack spacing={2}>
                    <Text fontSize="2xl">🏙️</Text>
                    <Text fontWeight="semibold">{city.name}</Text>
                    <Text fontSize="sm" color="gray.600">{city.nameAr}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {cityMarkets.length} markets
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default HomePage;
