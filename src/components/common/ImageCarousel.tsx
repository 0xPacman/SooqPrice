import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Image,
  Flex,
  IconButton,
  HStack,
  VStack,  Text,
  Badge,
  useColorModeValue,
  AspectRatio,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from '@chakra-ui/icons';
import { UnsplashImage, UnsplashService } from '@/services/unsplashService';

interface ImageCarouselProps {
  productName: string;
  maxImages?: number;
  showAttribution?: boolean;
  showDownload?: boolean;
  aspectRatio?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  size?: 'thumb' | 'small' | 'regular';
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  productName,
  maxImages = 5,
  showAttribution = true,
  showDownload = false,
  aspectRatio = 16/9,
  autoPlay = true,
  autoPlayInterval = 4000,
  showDots = true,
  size = 'regular',
}) => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const dotColor = useColorModeValue('gray.300', 'gray.600');
  const activeDotColor = useColorModeValue('green.500', 'green.400');
  const overlayBg = useColorModeValue('blackAlpha.500', 'blackAlpha.700');

  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchImages = async () => {
      if (!productName) return;
      
      setLoading(true);
      setError(null);

      try {
        const fetchedImages = await UnsplashService.searchProductImages(productName, maxImages);
        setImages(fetchedImages);
        
        if (fetchedImages.length === 0) {
          setError('No images found');
        }
      } catch (err) {
        setError('Failed to load images');
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [productName, maxImages]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && images.length > 1 && !isHovered) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, images.length, isHovered]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };
  const handleDownload = async (image: UnsplashImage) => {
    // Download functionality removed as per user request
    console.log('Download disabled for:', image.alt_description);
  };
  if (loading) {
    return (
      <Box
        bg={bg}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        overflow="hidden"
        shadow="sm"
        w="full"
      >
        <AspectRatio ratio={aspectRatio}>
          <Flex align="center" justify="center" direction="column" gap={3} w="full" h="full">
            <Spinner size="lg" color="green.500" thickness="3px" />
            <Text color="gray.500" fontSize="sm">Loading image...</Text>
          </Flex>
        </AspectRatio>
      </Box>
    );
  }
  if (error || images.length === 0) {
    return (
      <Box
        bg={bg}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        overflow="hidden"
        shadow="sm"
        w="full"
      >
        <AspectRatio ratio={aspectRatio}>
          <Flex align="center" justify="center" direction="column" gap={2} w="full" h="full">
            <Text fontSize="3xl">📷</Text>
            <Text color="gray.500" textAlign="center" fontSize="sm" px={4}>
              Image not available for {productName}
            </Text>
          </Flex>
        </AspectRatio>
      </Box>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <Box
      position="relative"
      bg={bg}
      borderRadius="xl"
      border="1px solid"
      borderColor={borderColor}
      overflow="hidden"
      shadow="lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      transition="all 0.3s ease"
      _hover={{ shadow: 'xl', transform: 'translateY(-2px)' }}
    >      {/* Main Image */}
      <AspectRatio ratio={aspectRatio}>
        <Box position="relative" w="full" h="full">
          <Image
            src={currentImage.urls[size]}
            alt={currentImage.alt_description || productName}
            objectFit="cover"
            w="full"
            h="full"
            transition="opacity 0.5s ease-in-out"
            loading="lazy"
            fallback={
              <Flex align="center" justify="center" bg="gray.100" w="full" h="full">
                <Spinner color="green.500" />
              </Flex>
            }
          />
          
          {/* Gradient Overlay for better text readability */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height="30%"
            bgGradient="linear(to-t, blackAlpha.600, transparent)"
            pointerEvents="none"
          />
        </Box>
      </AspectRatio>

      {/* Navigation Arrows - Hidden on mobile for swipe */}
      {!isMobile && images.length > 1 && (
        <>
          <IconButton
            aria-label="Previous image"
            icon={<ChevronLeftIcon boxSize={6} />}
            position="absolute"
            left={3}
            top="50%"
            transform="translateY(-50%)"
            bg={overlayBg}
            color="white"
            borderRadius="full"
            size="lg"
            opacity={isHovered ? 1 : 0}
            transition="opacity 0.3s ease"
            onClick={goToPrevious}
            _hover={{ bg: 'blackAlpha.800' }}
          />
          
          <IconButton
            aria-label="Next image"
            icon={<ChevronRightIcon boxSize={6} />}
            position="absolute"
            right={3}
            top="50%"
            transform="translateY(-50%)"
            bg={overlayBg}
            color="white"
            borderRadius="full"
            size="lg"
            opacity={isHovered ? 1 : 0}
            transition="opacity 0.3s ease"
            onClick={goToNext}
            _hover={{ bg: 'blackAlpha.800' }}
          />
        </>
      )}

      {/* Download Button */}
      {showDownload && (
        <IconButton
          aria-label="Download image"
          icon={<DownloadIcon />}
          position="absolute"
          top={3}
          right={3}
          bg={overlayBg}
          color="white"
          borderRadius="full"
          size="sm"
          opacity={isHovered ? 1 : 0.7}
          transition="opacity 0.3s ease"
          onClick={() => handleDownload(currentImage)}
          _hover={{ bg: 'blackAlpha.800' }}
        />
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <Badge
          position="absolute"
          top={3}
          left={3}
          bg="blackAlpha.700"
          color="white"
          borderRadius="full"
          px={3}
          py={1}
          fontSize="xs"
          fontWeight="bold"
        >
          {currentIndex + 1} / {images.length}
        </Badge>
      )}

      {/* Attribution */}
      {showAttribution && (
        <Box
          position="absolute"
          bottom={3}
          left={3}
          right={3}
        >
          <VStack align="start" spacing={1}>
            <Text
              color="white"
              fontSize="xs"
              bg="blackAlpha.600"
              px={2}
              py={1}
              borderRadius="md"
              backdropFilter="blur(10px)"
            >
              📸 {UnsplashService.getAttributionText(currentImage)}
            </Text>
          </VStack>
        </Box>
      )}

      {/* Dots Indicator */}
      {showDots && images.length > 1 && (
        <HStack
          position="absolute"
          bottom={showAttribution ? 16 : 4}
          left="50%"
          transform="translateX(-50%)"
          spacing={2}
          bg="blackAlpha.600"
          px={3}
          py={2}
          borderRadius="full"
          backdropFilter="blur(10px)"
        >
          {images.map((_, index) => (
            <Box
              key={index}
              w={index === currentIndex ? 3 : 2}
              h={2}
              borderRadius="full"
              bg={index === currentIndex ? activeDotColor : dotColor}
              cursor="pointer"
              transition="all 0.3s ease"
              onClick={() => goToSlide(index)}
              _hover={{ 
                bg: index === currentIndex ? activeDotColor : 'gray.400',
                transform: 'scale(1.2)'
              }}
            />
          ))}
        </HStack>
      )}

      {/* Mobile Swipe Hint */}
      {isMobile && images.length > 1 && currentIndex === 0 && (
        <Box
          position="absolute"
          top="50%"
          right={4}
          transform="translateY(-50%)"
          bg="blackAlpha.600"
          color="white"
          px={3}
          py={2}
          borderRadius="full"
          fontSize="xs"
          animation="pulse 2s infinite"
          backdropFilter="blur(10px)"
        >
          👈 Swipe
        </Box>
      )}
    </Box>
  );
};

export default ImageCarousel;
