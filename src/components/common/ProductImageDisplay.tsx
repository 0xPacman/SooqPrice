import React, { useState, useEffect } from 'react';
import {
  Box,
  Image,
  Flex,
  Text,
  Spinner,
  Badge,
  IconButton,
  useColorModeValue,
  AspectRatio,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { UnsplashService, UnsplashImage } from '@/services/unsplashService';

interface ProductImageDisplayProps {
  productName: string;
  maxImages?: number;
  size?: 'thumb' | 'small' | 'regular';
  showAttribution?: boolean;
  showDownload?: boolean;
  aspectRatio?: number;
}

export const ProductImageDisplay: React.FC<ProductImageDisplayProps> = ({
  productName,
  maxImages = 3,
  size = 'small',
  showAttribution = true,
  showDownload = false,
  aspectRatio = 4/3,
}) => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const fetchImages = async () => {
      if (!productName) return;
      
      setLoading(true);
      setError(null);

      try {
        const fetchedImages = await UnsplashService.searchProductImages(productName, maxImages);
        setImages(fetchedImages);
        
        if (fetchedImages.length === 0) {
          setError('No images found for this product');
        }
      } catch (err) {
        setError('Failed to load product images');
        console.error('Error fetching product images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [productName, maxImages]);

  const handleDownload = async (image: UnsplashImage) => {
    try {
      await UnsplashService.downloadImage(image);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" h="200px" bg={bgColor} borderRadius="lg">
        <Spinner size="lg" color="green.500" />
        <Text ml={4} color="gray.600">Loading product images...</Text>
      </Flex>
    );
  }

  if (error || images.length === 0) {
    return (
      <Flex justify="center" align="center" h="200px" bg={bgColor} borderRadius="lg" border="1px solid" borderColor={borderColor}>
        <Text color="gray.500" textAlign="center">
          📷 No images available for {productName}
        </Text>
      </Flex>
    );
  }

  if (maxImages === 1) {
    const image = images[0];
    return (
      <Box position="relative" borderRadius="lg" overflow="hidden" border="1px solid" borderColor={borderColor}>
        <AspectRatio ratio={aspectRatio}>
          <Image
            src={image.urls[size]}
            alt={image.alt_description || productName}
            objectFit="cover"
            fallback={
              <Flex align="center" justify="center" bg={bgColor}>
                <Text fontSize="sm" color="gray.500">Loading...</Text>
              </Flex>
            }
          />
        </AspectRatio>
        
        {showDownload && (
          <IconButton
            aria-label="Download image"
            icon={<DownloadIcon />}
            size="sm"
            position="absolute"
            top={2}
            right={2}
            colorScheme="whiteAlpha"
            onClick={() => handleDownload(image)}
          />
        )}
        
        {showAttribution && (
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="blackAlpha.700"
            color="white"
            p={2}
          >
            <Text fontSize="xs" noOfLines={1}>
              {UnsplashService.getAttributionText(image)}
            </Text>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <Flex gap={3} overflowX="auto" pb={2}>
        {images.map((image, index) => (
          <Box
            key={image.id}
            position="relative"
            minW="200px"
            borderRadius="lg"
            overflow="hidden"
            border="1px solid"
            borderColor={borderColor}
          >
            <AspectRatio ratio={aspectRatio}>
              <Image
                src={image.urls[size]}
                alt={image.alt_description || `${productName} ${index + 1}`}
                objectFit="cover"
                fallback={
                  <Flex align="center" justify="center" bg={bgColor}>
                    <Text fontSize="sm" color="gray.500">Loading...</Text>
                  </Flex>
                }
              />
            </AspectRatio>
            
            {showDownload && (
              <IconButton
                aria-label="Download image"
                icon={<DownloadIcon />}
                size="sm"
                position="absolute"
                top={2}
                right={2}
                colorScheme="whiteAlpha"
                onClick={() => handleDownload(image)}
              />
            )}
            
            {showAttribution && (
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="blackAlpha.700"
                color="white"
                p={2}
              >
                <Text fontSize="xs" noOfLines={1}>
                  Photo by {image.user.name}
                </Text>
              </Box>
            )}
          </Box>
        ))}
      </Flex>
      
      {showAttribution && (
        <Badge colorScheme="gray" variant="subtle" fontSize="xs" mt={2}>
          Images from Unsplash
        </Badge>
      )}
    </Box>
  );
};

export default ProductImageDisplay;
