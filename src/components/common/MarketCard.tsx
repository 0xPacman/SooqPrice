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
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Avatar,
  AvatarGroup,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ViewIcon, TimeIcon } from '@chakra-ui/icons';

interface MarketCardProps {
  market: {
    id: string;
    name: string;
    address: string;
    marketType: 'traditional' | 'modern' | 'wholesale';
    isActive: boolean;
    openingHours?: {
      monday: { open: string; close: string };
      tuesday: { open: string; close: string };
      wednesday: { open: string; close: string };
      thursday: { open: string; close: string };
      friday: { open: string; close: string };
      saturday: { open: string; close: string };
      sunday: { open: string; close: string };
    };
  };
  cityName: string;
  stats?: {
    totalProducts: number;
    recentUpdates: number;
    avgPrice: number;
    topContributors: string[];
  };
  compact?: boolean;
}

// Market type icons
const MarketIcon = ({ type }: { type: string }) => {
  const getIcon = () => {
    switch (type.toLowerCase()) {
      case 'traditional':
        return '🏪';
      case 'modern':
        return '🏬';
      case 'wholesale':
        return '🏭';
      default:
        return '🛒';
    }
  };

  return (
    <Box fontSize="2xl" role="img" aria-label={`${type} market icon`}>
      {getIcon()}
    </Box>
  );
};

// Time formatter
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

// Check if market is open now
const isMarketOpen = (openingHours: any) => {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en', { weekday: 'long' }).toLowerCase().substring(0, 3);
  const currentTime = now.getHours() * 100 + now.getMinutes();
  
  const todayHours = openingHours?.[`${currentDay}day`];
  if (!todayHours) return false;
  
  const openTime = parseInt(todayHours.open.replace(':', ''));
  const closeTime = parseInt(todayHours.close.replace(':', ''));
  
  return currentTime >= openTime && currentTime <= closeTime;
};

export const MarketCard: React.FC<MarketCardProps> = ({
  market,
  cityName,
  stats,
  compact = false,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');

  const getMarketTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'traditional':
        return 'orange';
      case 'modern':
        return 'blue';
      case 'wholesale':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const isOpen = market.openingHours ? isMarketOpen(market.openingHours) : false;
  const currentDay = new Date().toLocaleDateString('en', { weekday: 'long' }).toLowerCase();
  const todayHours = market.openingHours?.[currentDay as keyof typeof market.openingHours];

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
          transform: 'translateY(-2px)',
          shadow: 'lg',
          borderColor: 'blue.300',
        }}
        cursor="pointer"
        as={Link}
        to={`/markets/${market.id}`}
      >
        <CardBody p={4}>
          <HStack spacing={3}>
            <MarketIcon type={market.marketType} />
            <VStack align="start" spacing={1} flex={1}>
              <Text fontWeight="bold" fontSize="md" noOfLines={1}>
                {market.name}
              </Text>
              <Text fontSize="xs" color={mutedTextColor} noOfLines={1}>
                {cityName}
              </Text>
              <Badge
                colorScheme={isOpen ? 'green' : 'red'}
                variant="subtle"
                fontSize="xs"
              >
                {isOpen ? 'Open' : 'Closed'}
              </Badge>
            </VStack>
            {stats && (
              <VStack align="end" spacing={0}>
                <Text fontSize="sm" fontWeight="bold" color="blue.500">
                  {stats.totalProducts}
                </Text>
                <Text fontSize="xs" color={textColor}>
                  products
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
        borderColor: 'blue.300',
      }}
      cursor="pointer"
      maxW="sm"
    >
      {/* Market Header */}
      <Box
        bg={`${getMarketTypeColor(market.marketType)}.500`}
        color="white"
        p={4}
        position="relative"
        overflow="hidden"
      >
        {/* Background pattern */}
        <Box
          position="absolute"
          top={0}
          right={0}
          fontSize="8xl"
          opacity={0.1}
          transform="rotate(15deg)"
          mr={-8}
          mt={-4}
        >
          <MarketIcon type={market.marketType} />
        </Box>
        
        <VStack align="start" spacing={2} position="relative">
          <HStack spacing={3} w="full">
            <MarketIcon type={market.marketType} />
            <VStack align="start" spacing={0} flex={1}>
              <Text fontSize="lg" fontWeight="bold" noOfLines={1}>
                {market.name}
              </Text>
              <Text fontSize="sm" opacity={0.9} noOfLines={1}>
                {cityName}
              </Text>
            </VStack>
            <Badge
              colorScheme={isOpen ? 'green' : 'red'}
              variant="solid"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
            >
              {isOpen ? '🟢 Open' : '🔴 Closed'}
            </Badge>
          </HStack>
          
          <Badge
            colorScheme={getMarketTypeColor(market.marketType)}
            variant="outline"
            borderColor="whiteAlpha.400"
            color="white"
            textTransform="capitalize"
          >
            {market.marketType} Market
          </Badge>
        </VStack>
      </Box>

      <CardBody p={6}>
        <VStack align="start" spacing={4}>
          {/* Market Info */}
          <VStack align="start" spacing={2} w="full">
            <Text fontSize="sm" color={textColor} noOfLines={2}>
              📍 {market.address}
            </Text>
            
            {todayHours && (
              <HStack spacing={2}>
                <TimeIcon color={textColor} boxSize={4} />
                <Text fontSize="sm" color={textColor}>
                  Today: {formatTime(todayHours.open)} - {formatTime(todayHours.close)}
                </Text>
              </HStack>
            )}
          </VStack>

          <Divider />

          {/* Statistics */}
          {stats && (
            <HStack spacing={4} w="full">
              <Stat size="sm">
                <StatLabel fontSize="xs">Products</StatLabel>
                <StatNumber fontSize="lg" color="blue.500">
                  {stats.totalProducts}
                </StatNumber>
              </Stat>
              
              <Stat size="sm">
                <StatLabel fontSize="xs">Updates</StatLabel>
                <StatNumber fontSize="lg" color="green.500">
                  {stats.recentUpdates}
                </StatNumber>
                <StatHelpText fontSize="xs" mt={0}>
                  this week
                </StatHelpText>
              </Stat>
              
              <Stat size="sm">
                <StatLabel fontSize="xs">Avg Price</StatLabel>
                <StatNumber fontSize="lg" color="orange.500">
                  {stats.avgPrice.toFixed(0)}
                </StatNumber>
                <StatHelpText fontSize="xs" mt={0}>
                  DH
                </StatHelpText>
              </Stat>
            </HStack>
          )}

          {/* Top Contributors */}
          {stats && stats.topContributors.length > 0 && (
            <Box w="full">
              <Text fontSize="xs" color={mutedTextColor} mb={2}>
                Top Contributors
              </Text>
              <AvatarGroup size="sm" max={3}>
                {stats.topContributors.map((contributor, index) => (
                  <Avatar
                    key={index}
                    name={contributor}
                    size="sm"
                    bg={`${getMarketTypeColor(market.marketType)}.500`}
                    color="white"
                  />
                ))}
              </AvatarGroup>
            </Box>
          )}

          {/* Action Button */}
          <Button
            as={Link}
            to={`/markets/${market.id}`}
            colorScheme="blue"
            variant="outline"
            size="sm"
            w="full"
            leftIcon={<ViewIcon />}
            borderRadius="lg"
            _hover={{
              bg: 'blue.500',
              color: 'white',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.2s ease"
          >
            View Market Details
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default MarketCard;
