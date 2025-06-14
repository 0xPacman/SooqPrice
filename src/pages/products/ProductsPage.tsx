import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  SimpleGrid,
  Input,
  Select,
  Button,
  Badge,
  Divider,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { SearchIcon, ViewIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockProducts, getMockSubmissionsByProduct, getMockMarketById } from '../../utils/mockData';
import { Product } from '../../types';
import { ImageCarousel } from '../../components/common/ImageCarousel';

interface ProductWithPrices extends Product {
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  priceCount: number;
  latestUpdate: Date;
  markets: string[];
}

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Extract search query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);

  // Theme colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgGradient = useColorModeValue(
    'linear(to-br, green.50, blue.50)',
    'linear(to-br, green.900, blue.900)'
  );

  // Process products with price data
  const productsWithPrices = useMemo((): ProductWithPrices[] => {
    return mockProducts.map(product => {
      const submissions = getMockSubmissionsByProduct(product.id);
      const prices = submissions.map(s => s.price);
      const uniqueMarkets = [...new Set(submissions.map(s => s.marketId))];
      
      return {
        ...product,
        avgPrice: prices.length > 0 ? prices.reduce((sum, price) => sum + price, 0) / prices.length : 0,
        minPrice: prices.length > 0 ? Math.min(...prices) : 0,
        maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
        priceCount: prices.length,
        latestUpdate: submissions.length > 0 ? 
          new Date(Math.max(...submissions.map(s => s.submissionDate.getTime()))) : 
          new Date(),
        markets: uniqueMarkets.map(marketId => getMockMarketById(marketId)?.name || 'Unknown').slice(0, 3)
      };
    });
  }, []);
  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(mockProducts.map(p => p.category))];
    return cats.sort();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = productsWithPrices.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.avgPrice - b.avgPrice;
        case 'price-high':
          return b.avgPrice - a.avgPrice;
        case 'popular':
          return b.priceCount - a.priceCount;
        case 'recent':
          return b.latestUpdate.getTime() - a.latestUpdate.getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [productsWithPrices, searchTerm, selectedCategory, sortBy]);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Electronics': '📱',
      'Clothing': '👕',
      'Food': '🍎',
      'Books': '📚',
      'Home & Garden': '🏠',
      'Sports': '⚽',
      'Beauty': '💄',
      'Automotive': '🚗',
      'Health': '💊',
      'Toys': '🧸'
    };
    return icons[category] || '📦';
  };

  const formatPrice = (price: number) => {
    return price > 0 ? `${price.toFixed(2)} DH` : 'No price data';
  };

  const getPriceColor = (priceCount: number) => {
    if (priceCount === 0) return 'gray';
    if (priceCount < 3) return 'orange';
    if (priceCount < 10) return 'blue';
    return 'green';
  };

  return (
    <Box bgGradient={bgGradient} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <HStack spacing={4}>
            <IconButton
              aria-label="Back to home"
              icon={<ArrowBackIcon />}
              variant="ghost"
              size="lg"
              onClick={() => navigate('/')}
            />
            <VStack align="start" spacing={1} flex={1}>
              <Heading size="xl" color="green.600">
                All Products
              </Heading>
              <Text color="gray.600">
                Browse {filteredProducts.length} products across different categories
              </Text>
            </VStack>
          </HStack>

          {/* Search and Filters */}
          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <VStack spacing={4}>
                {/* Search Bar */}
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                  </InputLeftElement>
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    borderRadius="full"
                    bg={useColorModeValue('white', 'gray.700')}
                  />
                </InputGroup>

                {/* Filters */}
                <HStack spacing={4} w="full" flexWrap="wrap">
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    maxW="200px"
                    bg={useColorModeValue('white', 'gray.700')}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {getCategoryIcon(category)} {category}
                      </option>
                    ))}
                  </Select>

                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    maxW="200px"
                    bg={useColorModeValue('white', 'gray.700')}
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="recent">Recently Updated</option>
                  </Select>                  <Badge colorScheme="blue" variant="subtle" fontSize="sm" px={3} py={1}>
                    {filteredProducts.length} products found
                  </Badge>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  bg={cardBg}
                  borderColor={borderColor}
                  shadow="md"
                  borderRadius="xl"
                  overflow="hidden"
                  transition="all 0.3s ease"
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <Box position="relative">
                    <ImageCarousel
                      productName={product.name}
                      maxImages={1}
                      showAttribution={false}
                      showDownload={false}
                      aspectRatio={4/3}
                      autoPlay={false}
                      showDots={false}
                      size="regular"
                    />                    <Badge
                      position="absolute"
                      top={3}
                      left={3}
                      colorScheme="blue"
                      variant="solid"
                      borderRadius="full"
                      fontSize="xs"
                    >
                      {getCategoryIcon(product.category)} {product.category}
                    </Badge>
                  </Box>

                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      {/* Product Info */}
                      <VStack align="start" spacing={1}>
                        <Heading size="md" noOfLines={2} lineHeight="shorter">
                          {product.name}
                        </Heading>
                        <Text fontSize="sm" color="gray.600">
                          {product.category} • {product.unit}
                        </Text>
                      </VStack>

                      <Divider />

                      {/* Price Information */}
                      {product.avgPrice > 0 ? (
                        <VStack spacing={2} align="stretch">
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Average Price</Text>
                            <Text fontSize="lg" fontWeight="bold" color="green.500">
                              {formatPrice(product.avgPrice)}
                            </Text>
                          </HStack>
                          
                          <HStack justify="space-between" fontSize="sm">
                            <Text color="gray.500">
                              Range: {formatPrice(product.minPrice)} - {formatPrice(product.maxPrice)}
                            </Text>
                          </HStack>
                        </VStack>
                      ) : (
                        <Center py={4}>
                          <VStack spacing={2}>
                            <Text fontSize="sm" color="gray.500">
                              No price data available
                            </Text>
                            <Button
                              size="sm"
                              colorScheme="green"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/submit');
                              }}
                            >
                              Submit First Price
                            </Button>
                          </VStack>
                        </Center>
                      )}

                      <Divider />

                      {/* Bottom Info */}
                      <HStack justify="space-between" align="center">
                        <Badge
                          colorScheme={getPriceColor(product.priceCount)}
                          variant="subtle"
                          fontSize="xs"
                        >
                          {product.priceCount} price{product.priceCount !== 1 ? 's' : ''}
                        </Badge>
                        
                        <HStack spacing={1}>
                          <ViewIcon boxSize={3} color="gray.400" />
                          <Text fontSize="xs" color="gray.500">
                            View Details
                          </Text>
                        </HStack>
                      </HStack>

                      {/* Markets */}
                      {product.markets.length > 0 && (
                        <Box>
                          <Text fontSize="xs" color="gray.500" mb={1}>
                            Available in:
                          </Text>
                          <HStack spacing={1} flexWrap="wrap">
                            {product.markets.map((market, idx) => (
                              <Badge
                                key={idx}
                                size="sm"
                                variant="outline"
                                colorScheme="gray"
                                fontSize="xs"
                              >
                                📍 {market}
                              </Badge>
                            ))}
                            {product.markets.length === 3 && (
                              <Text fontSize="xs" color="gray.400">
                                +more
                              </Text>
                            )}
                          </HStack>
                        </Box>
                      )}
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <Card bg={cardBg} borderColor={borderColor}>
              <CardBody>
                <Center py={12}>
                  <VStack spacing={4}>
                    <Text fontSize="6xl">🔍</Text>
                    <Heading size="md" color="gray.500">
                      No Products Found
                    </Heading>
                    <Text color="gray.400" textAlign="center" maxW="400px">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </Text>
                    <Button
                      colorScheme="green"
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setSortBy('name');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </VStack>
                </Center>
              </CardBody>
            </Card>
          )}

          {/* Quick Stats */}
          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold" color="green.500">
                    {mockProducts.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Total Products
                  </Text>
                </VStack>
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                    {categories.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Categories
                  </Text>
                </VStack>
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                    {productsWithPrices.filter(p => p.priceCount > 0).length}
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    With Prices
                  </Text>
                </VStack>
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                    {productsWithPrices.reduce((sum, p) => sum + p.priceCount, 0)}
                  </Text>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Total Submissions
                  </Text>
                </VStack>
              </SimpleGrid>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProductsPage;
