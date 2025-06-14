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
  Icon,
  Alert,
  AlertIcon,
  AlertDescription,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { ArrowBackIcon, ViewIcon } from '@chakra-ui/icons';
import { ImageCarousel } from '@/components/common/ImageCarousel';
import { PriceHistoryChart } from '@/components/common/PriceHistoryChart';
import { 
  getMockProductById,
  getMockSubmissionsByProduct,
  getMockLatestPrices,
  getMockPriceHistory,
  mockMarkets,
  mockCities
} from '../../utils/mockData';
import { ReportButton } from '../../components/ui/ReportButton';
import { QuickPriceSubmissionButton } from '../../components/ui/QuickPriceSubmissionButton';

// Custom icons
const ProductIcon = ({ category }: { category: string }) => {
  const getIcon = () => {
    switch (category.toLowerCase()) {
      case 'vegetables':
        return '🥕';
      case 'fruits':
        return '🍎';
      case 'meat':
        return '🥩';
      case 'dairy':
        return '🥛';
      case 'grains':
        return '🌾';
      case 'spices':
        return '🌶️';
      case 'seafood':
        return '🐟';
      case 'herbs':
        return '🌿';
      case 'nuts':
        return '🥜';
      case 'oils':
        return '🫒';
      default:
        return '🛒';
    }
  };

  return (
    <Box 
      fontSize="4xl" 
      role="img" 
      aria-label={`${category} icon`}
      bg="green.50"
      borderRadius="full"
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="2px solid"
      borderColor="green.200"
    >
      {getIcon()}
    </Box>
  );
};

const TrendUpIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"
    />
  </Icon>
);

const TrendDownIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M22,18L20.59,16.59L15.5,21.68L11.5,17.68L4,25.18L2.59,23.77L11.5,14.86L15.5,18.86L19.29,15.07L16,12H22V18Z"
    />
  </Icon>
);

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [sortBy, setSortBy] = useState<'price' | 'date' | 'market'>('date');

  if (!productId) {
    return <Box>Product not found</Box>;
  }

  const product = getMockProductById(productId);
  const submissions = getMockSubmissionsByProduct(productId);
  const latestPrices = getMockLatestPrices(productId);
  const priceHistory = getMockPriceHistory(productId, 90);

  if (!product) {
    return (
      <Container maxW="container.xl">
        <VStack spacing={6} py={8}>
          <Text fontSize="xl">Product not found</Text>
          <Button as={Link} to="/" leftIcon={<ArrowBackIcon />}>
            Back to Home
          </Button>
        </VStack>
      </Container>
    );
  }

  // Calculate statistics
  const allPrices = submissions.map(s => s.price);
  const avgPrice = allPrices.length > 0 ? allPrices.reduce((sum, price) => sum + price, 0) / allPrices.length : 0;
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const totalSubmissions = submissions.length;

  // Sort latest prices
  const sortedPrices = [...latestPrices].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'date':
        return b.submissionDate.getTime() - a.submissionDate.getTime();
      case 'market':
        const marketA = mockMarkets.find(m => m.id === a.marketId)?.name || '';
        const marketB = mockMarkets.find(m => m.id === b.marketId)?.name || '';
        return marketA.localeCompare(marketB);
      default:
        return 0;
    }
  });

  // Recent price trend (last 7 days)
  const recentSubmissions = submissions
    .filter(s => {
      const daysDiff = (Date.now() - s.submissionDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    })
    .sort((a, b) => a.submissionDate.getTime() - b.submissionDate.getTime());

  const priceChange = recentSubmissions.length >= 2 
    ? recentSubmissions[recentSubmissions.length - 1].price - recentSubmissions[0].price
    : 0;

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
                    Product Details
                  </Text>
                  <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                    Back to Home
                  </Text>
                </VStack>
                
                <Box flex={1} />
                
                <Button
                  as={Link}
                  to="/submit"
                  colorScheme="green"
                  size="md"
                  borderRadius="full"
                  leftIcon={<Icon boxSize={4}>+</Icon>}
                  _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                  transition="all 0.2s ease"
                >
                  Submit Price
                </Button>
              </HStack>
            </CardBody>
          </Card>

        {/* Product Info */}
        <Card shadow="xl" borderRadius="2xl" bg={useColorModeValue('white', 'gray.800')}>
          <CardBody p={8}>
            <VStack spacing={6} align="stretch">
              {/* Header Section */}
              <Flex 
                direction={{ base: 'column', md: 'row' }} 
                align={{ base: 'center', md: 'start' }} 
                gap={6}
              >
                <ProductIcon category={product.category} />
                
                <VStack align={{ base: 'center', md: 'start' }} spacing={3} flex={1}>
                  <Heading 
                    size="2xl" 
                    textAlign={{ base: 'center', md: 'left' }}
                    bgGradient="linear(to-r, green.400, blue.500)"
                    bgClip="text"
                  >
                    {product.name}
                  </Heading>
                  
                  <HStack spacing={3} flexWrap="wrap" justify={{ base: 'center', md: 'start' }}>
                    <Badge
                      colorScheme="green"
                      variant="solid"
                      px={4}
                      py={2}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      {product.category}
                    </Badge>
                    
                    <Badge
                      colorScheme="blue"
                      variant="outline"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                    >
                      {product.commonUnits.length} unit types
                    </Badge>
                  </HStack>
                  
                  <Text 
                    fontSize="lg" 
                    color={useColorModeValue('gray.600', 'gray.300')}
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    Available units: {product.commonUnits.join(', ')}
                  </Text>
                </VStack>
                
                <VStack align="end" spacing={3}>
                  <ReportButton
                    reportType="price"
                    targetId={product.id}
                    targetName={product.name}
                    variant="button"
                    size="md"
                  />
                  
                  <HStack spacing={2} color={useColorModeValue('gray.500', 'gray.400')}>
                    <Icon as={ViewIcon} />
                    <Text fontSize="sm">
                      Product Details
                    </Text>
                  </HStack>
                </VStack>
              </Flex>
              
              <Divider />
              
              {/* Quick Info Grid */}
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                <VStack spacing={1} textAlign="center">
                  <Text fontSize="2xl" fontWeight="bold" color="green.500">
                    {latestPrices.length}
                  </Text>
                  <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                    Markets
                  </Text>
                </VStack>
                
                <VStack spacing={1} textAlign="center">
                  <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                    {avgPrice > 0 ? `${avgPrice.toFixed(2)} DH` : 'N/A'}
                  </Text>
                  <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                    Avg Price
                  </Text>
                </VStack>
                
                <VStack spacing={1} textAlign="center">
                  <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                    {totalSubmissions}
                  </Text>
                  <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                    Price Updates
                  </Text>
                </VStack>
                
                <VStack spacing={1} textAlign="center">
                  <HStack justify="center">
                    {priceChange > 0 ? (
                      <TrendUpIcon color="red.500" />
                    ) : priceChange < 0 ? (
                      <TrendDownIcon color="green.500" />
                    ) : (
                      <Text color="gray.500">—</Text>
                    )}
                    <Text 
                      fontSize="lg" 
                      fontWeight="bold" 
                      color={priceChange > 0 ? 'red.500' : priceChange < 0 ? 'green.500' : 'gray.500'}
                    >
                      {priceChange !== 0 ? `${priceChange > 0 ? '+' : ''}${priceChange.toFixed(2)}` : '0.00'}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                    7-day trend
                  </Text>
                </VStack>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Product Images from Unsplash */}
        <Card shadow="lg" borderRadius="2xl">
          <CardBody p={0}>
            <ImageCarousel
              productName={product.name}
              maxImages={1}
              showAttribution={true}
              showDownload={false}
              aspectRatio={16/9}
              autoPlay={false}
              autoPlayInterval={5000}
              showDots={false}
              size="regular"
            />
          </CardBody>
        </Card>

        {/* Price History Chart */}
        {priceHistory.length > 0 && (
          <PriceHistoryChart
            productName={product.name}
            priceHistory={priceHistory}
          />
        )}

        {submissions.length === 0 && (
          <Alert status="info">
            <AlertIcon />
            <AlertDescription>
              No price data available for this product yet. Be the first to submit a price!
            </AlertDescription>
          </Alert>
        )}

        {/* Current Prices */}
        {latestPrices.length > 0 && (
          <VStack spacing={6} align="stretch">
            {/* Price Summary Card */}
            <Card bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="xl">
              <CardBody>
                <HStack justify="space-between" align="center">
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('blue.700', 'blue.300')}>
                      Price Range Today
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color={useColorModeValue('blue.800', 'blue.200')}>
                      {minPrice.toFixed(2)} - {maxPrice.toFixed(2)} DH
                    </Text>
                  </VStack>
                  
                  <VStack align="end" spacing={1}>
                    <Text fontSize="sm" color={useColorModeValue('blue.600', 'blue.400')}>
                      Best Deal
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="green.500">
                      {minPrice.toFixed(2)} DH
                    </Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>

            {/* Markets Table */}
            <Card borderRadius="xl" overflow="hidden">
              <CardBody p={0}>
                <Box p={6} borderBottom="1px solid" borderColor={useColorModeValue('gray.200', 'gray.600')}>
                  <Flex justify="space-between" align="center">
                    <Heading size="lg">Markets & Prices</Heading>
                    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} w="200px">
                      <option value="date">Sort by Date</option>
                      <option value="price">Sort by Price</option>
                      <option value="market">Sort by Market</option>
                    </Select>
                  </Flex>
                </Box>

                <TableContainer>
                  <Table variant="simple">
                    <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
                      <Tr>
                        <Th fontWeight="bold">Market</Th>
                        <Th fontWeight="bold">Location</Th>
                        <Th isNumeric fontWeight="bold">Price</Th>
                        <Th fontWeight="bold">Quality</Th>
                        <Th fontWeight="bold">Updated</Th>
                        <Th fontWeight="bold">Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {sortedPrices.map((submission) => {
                        const market = mockMarkets.find(m => m.id === submission.marketId);
                        const city = market ? mockCities.find(c => c.id === market.cityId) : null;
                        const daysSinceUpdate = Math.floor((Date.now() - submission.submissionDate.getTime()) / (1000 * 60 * 60 * 24));
                        const isLowestPrice = submission.price === minPrice;
                        
                        return (
                          <Tr 
                            key={submission.id}
                            bg={isLowestPrice ? useColorModeValue('green.50', 'green.900') : 'transparent'}
                            _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                            transition="background 0.2s ease"
                          >
                            <Td>
                              <VStack align="start" spacing={1}>
                                <Button
                                  as={Link}
                                  to={`/markets/${market?.id}`}
                                  variant="link"
                                  size="sm"
                                  fontWeight="bold"
                                  color={useColorModeValue('blue.600', 'blue.400')}
                                >
                                  {market?.name}
                                </Button>
                                {isLowestPrice && (
                                  <Badge colorScheme="green" size="sm" variant="solid">
                                    Best Price 🏆
                                  </Badge>
                                )}
                              </VStack>
                            </Td>
                            <Td>
                              <Text color={useColorModeValue('gray.600', 'gray.400')}>
                                {city?.name}
                              </Text>
                            </Td>
                            <Td isNumeric>
                              <VStack align="end" spacing={0}>
                                <Text 
                                  fontWeight="bold" 
                                  fontSize="lg"
                                  color={isLowestPrice ? 'green.500' : useColorModeValue('gray.800', 'gray.200')}
                                >
                                  {submission.price.toFixed(2)} DH
                                </Text>
                                <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                                  per {submission.unit || 'kg'}
                                </Text>
                              </VStack>
                            </Td>
                            <Td>
                              <Badge
                                colorScheme={
                                  submission.quality === 'excellent' ? 'green' :
                                  submission.quality === 'good' ? 'blue' :
                                  submission.quality === 'average' ? 'yellow' : 'red'
                                }
                                variant="solid"
                                borderRadius="full"
                              >
                                {submission.quality}
                              </Badge>
                            </Td>
                            <Td>
                              <VStack align="start" spacing={0}>
                                <Text 
                                  fontSize="sm" 
                                  fontWeight="medium"
                                  color={daysSinceUpdate > 7 ? 'red.500' : useColorModeValue('gray.700', 'gray.300')}
                                >
                                  {daysSinceUpdate === 0 ? 'Today' : 
                                   daysSinceUpdate === 1 ? 'Yesterday' : 
                                   `${daysSinceUpdate} days ago`}
                                </Text>
                                {daysSinceUpdate > 7 && (
                                  <Text fontSize="xs" color="red.400">
                                    Needs update
                                  </Text>
                                )}
                              </VStack>
                            </Td>
                            <Td>
                              <ReportButton
                                reportType="price"
                                targetId={submission.id}
                                targetName={`${product.name} price at ${market?.name}`}
                                variant="icon"
                                size="sm"
                              />
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </VStack>
        )}
      </VStack>
    </Container>
    
    {/* Quick Price Submission Button */}
    <QuickPriceSubmissionButton />
    </>
  );
};

export default ProductDetailPage;