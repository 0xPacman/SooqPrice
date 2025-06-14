import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Text,
  Badge,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  AspectRatio,
  Flex,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    commonUnits: string[];
  };
  latestPrice?: {
    price: number;
    marketName: string;
    daysAgo: number;
  };
  showImages?: boolean;
  compact?: boolean;
}

// Category icons mapping
const CategoryIcon = ({ category }: { category: string }) => {
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
      default:
        return '🛒';
    }
  };

  return (
    <Box fontSize="2xl" role="img" aria-label={`${category} icon`}>
      {getIcon()}
    </Box>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  latestPrice,
  showImages = true,
  compact = false,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const priceColor = useColorModeValue('green.600', 'green.400');

  const getProductGradient = (category: string) => {
    const gradients: { [key: string]: string } = {
      vegetables: 'linear(to-br, green.400, green.600)',
      fruits: 'linear(to-br, orange.400, red.500)',
      meat: 'linear(to-br, red.400, red.700)',
      dairy: 'linear(to-br, blue.300, blue.500)',
      grains: 'linear(to-br, yellow.400, orange.500)',
      spices: 'linear(to-br, purple.400, pink.500)',
      seafood: 'linear(to-br, cyan.400, blue.500)',
    };
    return gradients[category.toLowerCase()] || 'linear(to-br, gray.400, gray.600)';
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vegetables':
        return 'green';
      case 'fruits':
        return 'orange';
      case 'meat':
        return 'red';
      case 'dairy':
        return 'blue';
      case 'grains':
        return 'yellow';
      case 'spices':
        return 'purple';
      case 'seafood':
        return 'cyan';
      default:
        return 'gray';
    }
  };

  if (compact) {
    return (
      <Card
        bg={bgColor}
        borderColor={borderColor}
        borderWidth="1px"
        borderRadius="xl"
        overflow="hidden"
        transition="all 0.3s ease"
        _hover={{
          transform: 'translateY(-4px)',
          shadow: 'xl',
          borderColor: 'green.300',
        }}
        cursor="pointer"
        as={Link}
        to={`/products/${product.id}`}
      >
        <CardBody p={4}>
          <HStack spacing={3}>
            <CategoryIcon category={product.category} />
            <VStack align="start" spacing={1} flex={1}>
              <Text fontWeight="bold" fontSize="md" noOfLines={1}>
                {product.name}
              </Text>
              <Badge
                colorScheme={getCategoryColor(product.category)}
                variant="subtle"
                fontSize="xs"
              >
                {product.category}
              </Badge>
            </VStack>
            {latestPrice && (
              <VStack align="end" spacing={0}>
                <Text fontSize="sm" fontWeight="bold" color={priceColor}>
                  {latestPrice.price.toFixed(2)} DH
                </Text>
                <Text fontSize="xs" color={textColor}>
                  {latestPrice.daysAgo === 0 ? 'Today' : `${latestPrice.daysAgo}d ago`}
                </Text>
              </VStack>
            )}
          </HStack>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card
      bg={bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-8px)',
        shadow: '2xl',
        borderColor: 'green.300',
      }}
      cursor="pointer"
      maxW="sm"
    >
      {/* Simple Product Image with Gradient - No auto-switching */}
      {showImages && (
        <Box position="relative">
          <AspectRatio ratio={16/9}>
            <Flex
              align="center"
              justify="center"
              bgGradient={getProductGradient(product.category)}
              color="white"
              direction="column"
              gap={2}
            >
              <Box fontSize="4xl">
                <CategoryIcon category={product.category} />
              </Box>
              <Text fontSize="lg" fontWeight="bold" textAlign="center" px={4}>
                {product.name}
              </Text>
            </Flex>
          </AspectRatio>
          
          {/* Category Badge Overlay */}
          <Badge
            position="absolute"
            top={3}
            left={3}
            colorScheme={getCategoryColor(product.category)}
            variant="solid"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="xs"
            fontWeight="bold"
            backdropFilter="blur(10px)"
            bg={`${getCategoryColor(product.category)}.500`}
            color="white"
          >
            {product.category}
          </Badge>
        </Box>
      )}

      <CardBody p={6}>
        <VStack align="start" spacing={4}>
          {/* Product Info */}
          <VStack align="start" spacing={2} w="full">
            <HStack justify="space-between" w="full">
              <Text fontSize="xl" fontWeight="bold" noOfLines={1}>
                {product.name}
              </Text>
              {!showImages && <CategoryIcon category={product.category} />}
            </HStack>
            
            <Text fontSize="sm" color={textColor}>
              Units: {product.commonUnits.join(', ')}
            </Text>
          </VStack>

          {/* Price Info */}
          {latestPrice && (
            <Box
              bg={useColorModeValue('green.50', 'green.900')}
              borderRadius="lg"
              p={3}
              w="full"
            >
              <HStack justify="space-between">
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color={textColor} textTransform="uppercase" letterSpacing="wide">
                    Latest Price
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color={priceColor}>
                    {latestPrice.price.toFixed(2)} DH
                  </Text>
                </VStack>
                <VStack align="end" spacing={0}>
                  <Text fontSize="xs" color={textColor}>
                    at {latestPrice.marketName}
                  </Text>
                  <Text fontSize="xs" color={textColor}>
                    {latestPrice.daysAgo === 0 ? 'Today' : 
                     latestPrice.daysAgo === 1 ? 'Yesterday' : 
                     `${latestPrice.daysAgo} days ago`}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          )}

          {/* Action Button */}
          <Button
            as={Link}
            to={`/products/${product.id}`}
            colorScheme="green"
            variant="outline"
            size="sm"
            w="full"
            leftIcon={<ViewIcon />}
            borderRadius="lg"
            _hover={{
              bg: 'green.500',
              color: 'white',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.2s ease"
          >
            View Details
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
