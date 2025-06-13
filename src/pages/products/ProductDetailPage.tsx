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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
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
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { 
  getMockProductById,
  getMockSubmissionsByProduct,
  getMockLatestPrices,
  mockMarkets,
  mockCities
} from '../../utils/mockData';
import { ReportButton } from '../../components/ui/ReportButton';

// Custom icons
const ProductIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M7,4V2A1,1 0 0,1 8,1H16A1,1 0 0,1 17,2V4H20A1,1 0 0,1 21,5V7A1,1 0 0,1 20,8H19V19A3,3 0 0,1 16,22H8A3,3 0 0,1 5,19V8H4A1,1 0 0,1 3,7V5A1,1 0 0,1 4,4H7M9,3V4H15V3H9M7,8V19A1,1 0 0,0 8,20H16A1,1 0 0,0 17,19V8H7Z"
    />
  </Icon>
);

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

        {/* Product Info */}
        <Card>
          <CardBody>
            <HStack justify="space-between" align="start">
              <HStack spacing={4}>
                <ProductIcon boxSize={12} color="green.500" />
                <VStack align="start" spacing={2}>
                  <Heading size="2xl">{product.name}</Heading>
                  <Text fontSize="lg" color="gray.600">Category: {product.category}</Text>
                  <Badge colorScheme="blue" fontSize="md">
                    {product.category}
                  </Badge>
                </VStack>
              </HStack>
              
              <VStack align="end" spacing={2}>
                <ReportButton
                  reportType="price"
                  targetId={product.id}
                  targetName={product.name}
                  variant="button"
                  size="sm"
                />
                <Text fontSize="sm" color="gray.500">
                  Common units: {product.commonUnits.join(', ')}
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Statistics */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Stat>
            <StatLabel>Average Price</StatLabel>
            <StatNumber color="green.500">{avgPrice.toFixed(2)} DH</StatNumber>
            <StatHelpText>
              <HStack>
                {priceChange > 0 ? (
                  <>
                    <TrendUpIcon color="red.500" />
                    <Text color="red.500">+{priceChange.toFixed(2)} DH</Text>
                  </>
                ) : priceChange < 0 ? (
                  <>
                    <TrendDownIcon color="green.500" />
                    <Text color="green.500">{priceChange.toFixed(2)} DH</Text>
                  </>
                ) : (
                  <Text color="gray.500">No change</Text>
                )}
              </HStack>
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Price Range</StatLabel>
            <StatNumber>{minPrice.toFixed(2)} - {maxPrice.toFixed(2)} DH</StatNumber>
            <StatHelpText>Min to Max</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Markets Available</StatLabel>
            <StatNumber>{latestPrices.length}</StatNumber>
            <StatHelpText>Currently tracking</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Total Updates</StatLabel>
            <StatNumber>{totalSubmissions}</StatNumber>
            <StatHelpText>All time</StatHelpText>
          </Stat>
        </SimpleGrid>

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
          <Box>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="lg">Current Prices by Market</Heading>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} w="200px">
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
                <option value="market">Sort by Market</option>
              </Select>
            </Flex>

            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Market</Th>
                    <Th>Location</Th>
                    <Th isNumeric>Price</Th>
                    <Th>Quality</Th>
                    <Th>Updated</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sortedPrices.map((submission) => {
                    const market = mockMarkets.find(m => m.id === submission.marketId);
                    const city = market ? mockCities.find(c => c.id === market.cityId) : null;
                    const daysSinceUpdate = Math.floor((Date.now() - submission.submissionDate.getTime()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <Tr key={submission.id}>
                        <Td>
                          <Button
                            as={Link}
                            to={`/markets/${market?.id}`}
                            variant="link"
                            size="sm"
                            fontWeight="bold"
                          >
                            {market?.name}
                          </Button>
                        </Td>
                        <Td>{city?.name}</Td>
                        <Td isNumeric>
                          <Text fontWeight="bold" color="green.500">
                            {submission.price.toFixed(2)} DH
                          </Text>
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={
                              submission.quality === 'excellent' ? 'green' :
                              submission.quality === 'good' ? 'blue' :
                              submission.quality === 'average' ? 'yellow' : 'red'
                            }
                          >
                            {submission.quality}
                          </Badge>
                        </Td>
                        <Td>
                          <Text fontSize="sm" color={daysSinceUpdate > 7 ? 'red.500' : 'gray.600'}>
                            {daysSinceUpdate === 0 ? 'Today' : 
                             daysSinceUpdate === 1 ? 'Yesterday' : 
                             `${daysSinceUpdate} days ago`}
                          </Text>
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
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default ProductDetailPage;