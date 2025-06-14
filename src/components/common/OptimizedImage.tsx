import React, { useState } from 'react';
import {
  Box,
  Image,
  Skeleton,
  AspectRatio,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ImageUploadService } from '@/services/imageUpload';

interface OptimizedImageProps {
  publicId?: string;
  src?: string;
  alt: string;
  aspectRatio?: number;
  width?: number;
  height?: number;
  quality?: 'auto' | 'auto:low' | 'auto:good' | 'auto:best';
  borderRadius?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  showPlaceholder?: boolean;
  placeholderIcon?: string;
  className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  publicId,
  src,
  alt,
  aspectRatio = 4/3,
  width,
  height,
  quality = 'auto:good',
  borderRadius = 'md',
  objectFit = 'cover',
  showPlaceholder = true,
  placeholderIcon = '🖼️',
  className,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const placeholderBg = useColorModeValue('gray.100', 'gray.700');
  const placeholderColor = useColorModeValue('gray.400', 'gray.500');

  // Generate optimized URL if using Cloudinary
  const imageUrl = publicId 
    ? ImageUploadService.getOptimizedUrl(publicId, { width, height, quality })
    : src;

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  const PlaceholderContent = () => (
    <Flex
      align="center"
      justify="center"
      direction="column"
      bg={placeholderBg}
      color={placeholderColor}
      w="full"
      h="full"
    >
      <Text fontSize="2xl" mb={2}>{placeholderIcon}</Text>
      <Text fontSize="sm" textAlign="center">
        {hasError ? 'Failed to load' : 'Loading...'}
      </Text>
    </Flex>
  );

  if (!imageUrl && !showPlaceholder) {
    return null;
  }

  return (
    <AspectRatio ratio={aspectRatio} className={className}>
      <Box position="relative" w="full" h="full" borderRadius={borderRadius} overflow="hidden">
        {/* Loading Skeleton */}
        {!isLoaded && !hasError && (
          <Skeleton
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            borderRadius={borderRadius}
          />
        )}

        {/* Placeholder or Error State */}
        {(!imageUrl || hasError) && showPlaceholder && (
          <PlaceholderContent />
        )}

        {/* Actual Image */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={alt}
            objectFit={objectFit}
            w="full"
            h="full"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
            loading="lazy"
          />
        )}
      </Box>
    </AspectRatio>
  );
};

// Specialized components for common use cases
export const ProductImage: React.FC<{
  publicId?: string;
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ publicId, src, alt, size = 'md', className }) => {
  const dimensions = {
    sm: { width: 150, aspectRatio: 1 },
    md: { width: 300, aspectRatio: 4/3 },
    lg: { width: 600, aspectRatio: 4/3 },
  };

  return (
    <OptimizedImage
      publicId={publicId}
      src={src}
      alt={alt}
      width={dimensions[size].width}
      aspectRatio={dimensions[size].aspectRatio}
      quality="auto:good"
      placeholderIcon="📦"
      className={className}
    />
  );
};

export const ProfileImage: React.FC<{
  publicId?: string;
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ publicId, src, alt, size = 'md', className }) => {
  const dimensions = {
    sm: 80,
    md: 120,
    lg: 200,
    xl: 300,
  };

  return (
    <OptimizedImage
      publicId={publicId}
      src={src}
      alt={alt}
      width={dimensions[size]}
      height={dimensions[size]}
      aspectRatio={1}
      quality="auto:good"
      borderRadius="full"
      placeholderIcon="👤"
      className={className}
    />
  );
};

export default OptimizedImage;
