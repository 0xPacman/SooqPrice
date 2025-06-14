import React, { useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  VStack,
  Text,
  Select,
  useColorModeValue,
  Button,
  Flex,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ReferenceLine,
} from 'recharts';

interface PriceDataPoint {
  date: string;
  timestamp: number;
  marketId: string;
  marketName: string;
  price: number;
  quality: string;
  submissionDate: Date;
}

interface PriceHistoryChartProps {
  productName: string;
  priceHistory: PriceDataPoint[];
  className?: string;
}

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  const getIcon = () => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      case 'stable':
        return '📊';
    }
  };
  
  return <Text fontSize="xl">{getIcon()}</Text>;
};

const formatTooltipValue = (value: number, name: string) => {
  if (name === 'price') {
    return [`${value.toFixed(2)} DH`, 'Price'];
  }
  return [value, name];
};

const formatXAxisLabel = (tickItem: string) => {
  const date = new Date(tickItem);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({
  productName,
  priceHistory,
  className,
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line');

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const gridColor = useColorModeValue('#f0f0f0', '#404040');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  // Filter data based on time range
  const filterDataByTimeRange = (data: PriceDataPoint[]) => {
    const now = Date.now();
    const timeRangeMap = {
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000,
      'all': Infinity,
    };

    const cutoff = now - timeRangeMap[timeRange];
    return data.filter(point => point.timestamp >= cutoff);
  };

  // Get unique markets
  const uniqueMarkets = Array.from(
    new Set(priceHistory.map(point => point.marketName))
  );

  // Filter and process data
  const filteredData = filterDataByTimeRange(priceHistory);
  const marketsToShow = selectedMarkets.length > 0 ? selectedMarkets : uniqueMarkets;
  
  // Group data by date and calculate averages per market
  const processedData = filteredData.reduce((acc, point) => {
    if (!marketsToShow.includes(point.marketName)) return acc;
    
    const dateKey = point.date;
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: dateKey,
        timestamp: point.timestamp,
        markets: {},
        averagePrice: 0,
      };
    }
    
    if (!acc[dateKey].markets[point.marketName]) {
      acc[dateKey].markets[point.marketName] = [];
    }
    
    acc[dateKey].markets[point.marketName].push(point.price);
    return acc;
  }, {} as Record<string, any>);

  // Calculate final chart data
  const chartData = Object.values(processedData).map((dayData: any) => {
    const result: any = {
      date: dayData.date,
      timestamp: dayData.timestamp,
    };

    // Calculate average price for each market on this day
    marketsToShow.forEach(marketName => {
      if (dayData.markets[marketName]) {
        const prices = dayData.markets[marketName];
        const avgPrice = prices.reduce((sum: number, price: number) => sum + price, 0) / prices.length;
        result[marketName] = parseFloat(avgPrice.toFixed(2));
      }
    });

    // Calculate overall average price for the day
    const allPricesForDay = Object.values(dayData.markets).flat();
    if (allPricesForDay.length > 0) {
      result.averagePrice = parseFloat(
        ((allPricesForDay as number[]).reduce((sum, price) => sum + price, 0) / allPricesForDay.length).toFixed(2)
      );
    }

    return result;
  }).sort((a, b) => a.timestamp - b.timestamp);

  // Calculate statistics
  const allPrices = chartData.map(d => d.averagePrice).filter(Boolean);
  const currentPrice = allPrices[allPrices.length - 1] || 0;
  const previousPrice = allPrices[allPrices.length - 2] || currentPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice ? (priceChange / previousPrice) * 100 : 0;
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const avgPrice = allPrices.reduce((sum, price) => sum + price, 0) / allPrices.length;

  const trend = priceChangePercent > 1 ? 'up' : priceChangePercent < -1 ? 'down' : 'stable';

  // Color palette for different markets
  const marketColors = [
    '#10B981', // green
    '#3B82F6', // blue
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // purple
    '#06B6D4', // cyan
    '#F97316', // orange
    '#84CC16', // lime
  ];

  const toggleMarketSelection = (marketName: string) => {
    setSelectedMarkets(prev => 
      prev.includes(marketName) 
        ? prev.filter(m => m !== marketName)
        : [...prev, marketName]
    );
  };

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxisLabel}
              tick={{ fontSize: 12, fill: textColor }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: textColor }}
              label={{ value: 'Price (DH)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelStyle={{ color: textColor }}
              contentStyle={{ 
                backgroundColor: bgColor, 
                border: `1px solid ${borderColor}`,
                borderRadius: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey="averagePrice"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
            {marketsToShow.map((marketName, index) => (
              <Area
                key={marketName}
                type="monotone"
                dataKey={marketName}
                stroke={marketColors[index % marketColors.length]}
                strokeWidth={1}
                fillOpacity={0.3}
                fill={marketColors[index % marketColors.length]}
              />
            ))}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxisLabel}
              tick={{ fontSize: 12, fill: textColor }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: textColor }}
              label={{ value: 'Price (DH)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelStyle={{ color: textColor }}
              contentStyle={{ 
                backgroundColor: bgColor, 
                border: `1px solid ${borderColor}`,
                borderRadius: '8px'
              }}
            />
            <Legend />
            {marketsToShow.map((marketName, index) => (
              <Bar
                key={marketName}
                dataKey={marketName}
                fill={marketColors[index % marketColors.length]}
                name={marketName}
              />
            ))}
          </BarChart>
        );

      default: // line
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxisLabel}
              tick={{ fontSize: 12, fill: textColor }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: textColor }}
              label={{ value: 'Price (DH)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelStyle={{ color: textColor }}
              contentStyle={{ 
                backgroundColor: bgColor, 
                border: `1px solid ${borderColor}`,
                borderRadius: '8px'
              }}
            />
            <Legend />
            <ReferenceLine y={avgPrice} stroke="#666" strokeDasharray="5 5" label="Average" />
            {marketsToShow.map((marketName, index) => (
              <Line
                key={marketName}
                type="monotone"
                dataKey={marketName}
                stroke={marketColors[index % marketColors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: marketColors[index % marketColors.length], strokeWidth: 2 }}
                name={marketName}
              />
            ))}
          </LineChart>
        );
    }
  };

  if (!priceHistory.length) {
    return (
      <Card className={className}>
        <CardBody>
          <Text textAlign="center" color="gray.500">
            No price history available for this product yet.
          </Text>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className={className} shadow="xl" borderRadius="2xl">
      <CardHeader pb={2}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <HStack spacing={3}>
            <TrendIcon trend={trend} />            <VStack align="start" spacing={0}>
              <Heading size="lg">Price History</Heading>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                {productName} - Top 3 active markets
              </Text>
            </VStack>
          </HStack>
          
          <HStack spacing={3} wrap="wrap">
            <Select 
              value={chartType} 
              onChange={(e) => setChartType(e.target.value as any)}
              size="sm"
              w="100px"
            >
              <option value="line">Line</option>
              <option value="area">Area</option>
              <option value="bar">Bar</option>
            </Select>
            
            <Select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value as any)}
              size="sm"
              w="120px"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </Select>
          </HStack>
        </Flex>
      </CardHeader>      <CardBody pt={0}>
        <VStack spacing={6} align="stretch">
          {/* Statistics Row */}
          <HStack spacing={6} justify="space-around" wrap="wrap">
            <VStack spacing={1} textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {currentPrice.toFixed(2)} DH
              </Text>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                Current Avg
              </Text>
            </VStack>
            
            <VStack spacing={1} textAlign="center">
              <HStack>
                <Text 
                  fontSize="lg" 
                  fontWeight="bold" 
                  color={priceChange >= 0 ? 'red.500' : 'green.500'}
                >
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} DH
                </Text>
                <Text 
                  fontSize="sm" 
                  color={priceChange >= 0 ? 'red.500' : 'green.500'}
                >
                  ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(1)}%)
                </Text>
              </HStack>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                Change
              </Text>
            </VStack>
            
            <VStack spacing={1} textAlign="center">
              <Text fontSize="lg" fontWeight="bold" color="green.500">
                {minPrice.toFixed(2)} DH
              </Text>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                Min Price
              </Text>
            </VStack>
            
            <VStack spacing={1} textAlign="center">
              <Text fontSize="lg" fontWeight="bold" color="red.500">
                {maxPrice.toFixed(2)} DH
              </Text>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                Max Price
              </Text>
            </VStack>
          </HStack>

          {/* Market Filter */}
          <Box>
            <HStack justify="space-between" align="center" mb={2}>
              <Text fontSize="sm" fontWeight="medium" color={textColor}>
                Markets ({selectedMarkets.length > 0 ? selectedMarkets.length : uniqueMarkets.length})
              </Text>
              <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.500')} fontStyle="italic">
                📊 Showing top 3 recent markets only
              </Text>
            </HStack>
            <HStack spacing={2} wrap="wrap">
              {uniqueMarkets.map((marketName, index) => (
                <Button
                  key={marketName}
                  size="sm"
                  variant={selectedMarkets.length === 0 || selectedMarkets.includes(marketName) ? "solid" : "outline"}
                  colorScheme="green"
                  onClick={() => toggleMarketSelection(marketName)}
                  leftIcon={
                    <Box
                      w={3}
                      h={3}
                      borderRadius="full"
                      bg={marketColors[index % marketColors.length]}
                    />
                  }
                >
                  {marketName}
                </Button>
              ))}
            </HStack>
            <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.500')} mt={2}>
              💡 Only the 3 most recent markets with price submissions are shown to keep the chart readable. 
              This helps focus on the most active and relevant market data.
            </Text>
          </Box>

          {/* Chart */}
          <Box h="400px" w="100%">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default PriceHistoryChart;
