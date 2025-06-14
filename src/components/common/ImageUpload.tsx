import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  Image,
  VStack,
  HStack,
  Text,
  Progress,
  Alert,
  AlertIcon,
  AlertDescription,
  IconButton,
  SimpleGrid,
  Badge,
  useColorModeValue,
  useToast,
  Flex,
  AspectRatio,
  useBreakpointValue,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { ImageUploadService, UploadedImage, uploadProductImage, uploadProfilePicture } from '@/services/imageUpload';

interface ImageUploadProps {
  maxImages?: number;
  isProfilePicture?: boolean;
  existingImages?: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  userId: string;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  maxImages = 3,
  isProfilePicture = false,
  existingImages = [],
  onImagesChange,
  userId,
  disabled = false,
}) => {
  const [images, setImages] = useState<UploadedImage[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const hoverBg = useColorModeValue('gray.100', 'gray.600');
  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setError(null);
    setUploading(true);
    setUploadProgress(0);

    const remainingSlots = maxImages - images.length;
    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => Math.min(prev + 10, 90));
        }, 200);

        try {
          const uploadedImage = isProfilePicture 
            ? await uploadProfilePicture(file, userId)
            : await uploadProductImage(file, userId);
          
          clearInterval(progressInterval);
          setUploadProgress(100);
          
          return uploadedImage;
        } catch (error) {
          clearInterval(progressInterval);
          throw error;
        }
      });

      const uploadedImages = await Promise.all(uploadPromises);
      const newImages = [...images, ...uploadedImages];
      
      setImages(newImages);
      onImagesChange(newImages);
      
      toast({
        title: 'Images uploaded successfully!',
        description: `${uploadedImages.length} image(s) uploaded`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      console.error('Upload failed:', error);
      setError(error instanceof Error ? error.message : 'Upload failed');
      
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Please try again',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }  }, [images, maxImages, userId, isProfilePicture, onImagesChange, toast]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const removeImage = useCallback((index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
    
    toast({
      title: 'Image removed',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  }, [images, onImagesChange, toast]);

  const canUploadMore = images.length < maxImages && !disabled;

  return (
    <VStack spacing={4} align="stretch">      {/* Upload Area */}
      {canUploadMore && (
        <Box>
          {/* Hidden file inputs - separate for camera and gallery on mobile */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple={!isProfilePicture && maxImages > 1}
            onChange={(e) => handleFileSelect(e.target.files)}
            style={{ display: 'none' }}
            disabled={uploading || disabled}
          />
            {/* Camera input for mobile */}
          {isMobile && !isProfilePicture && (
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              capture="environment"
              onChange={(e) => handleFileSelect(e.target.files)}
              style={{ display: 'none' }}
              disabled={uploading || disabled}
              id="camera-input"
            />
          )}
          
          <Box
            border="2px dashed"
            borderColor={borderColor}
            borderRadius="lg"
            p={6}
            bg={bgColor}
            cursor={uploading || disabled ? 'not-allowed' : 'pointer'}
            _hover={!uploading && !disabled ? { bg: hoverBg, borderColor: 'green.300' } : {}}
            onClick={() => !uploading && !disabled && fileInputRef.current?.click()}
            transition="all 0.2s"
          >
            <VStack spacing={3}>
              <Box
                w={12}
                h={12}
                bg="green.100"
                color="green.600"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <AddIcon boxSize={5} />
              </Box>              <VStack spacing={1}>
                <Text fontWeight="medium" color="gray.700">
                  {isProfilePicture 
                    ? 'Upload Profile Picture' 
                    : (isMobile ? '📸 Take Photo or Choose from Gallery' : 'Upload from Computer')
                  }
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  {isMobile ? (
                    <>
                      Tap to open camera or select from gallery
                      <br />
                      JPEG, PNG, WebP • Max 10MB
                      {!isProfilePicture && ` • Up to ${maxImages} images`}
                    </>
                  ) : (
                    <>
                      Drag and drop or click to select files
                      <br />
                      JPEG, PNG, WebP • Max 10MB
                      {!isProfilePicture && ` • Up to ${maxImages} images`}
                    </>
                  )}
                </Text>
              </VStack>
              
              {canUploadMore && !isProfilePicture && (
                <Badge colorScheme="green" variant="subtle">
                  {images.length}/{maxImages} uploaded
                </Badge>
              )}
            </VStack>
          </Box>
        </Box>
      )}

      {/* Upload Progress */}
      {uploading && (
        <Box>
          <HStack justify="space-between" mb={2}>
            <Text fontSize="sm" color="gray.600">Uploading...</Text>
            <Text fontSize="sm" color="green.500" fontWeight="medium">
              {uploadProgress}%
            </Text>
          </HStack>
          <Progress
            value={uploadProgress}
            colorScheme="green"
            size="sm"
            borderRadius="full"
            bg={useColorModeValue('gray.100', 'gray.700')}
            isAnimated
          />
        </Box>
      )}

      {/* Error Display */}
      {error && (
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <AlertDescription fontSize="sm">{error}</AlertDescription>
        </Alert>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={3}>
            {isProfilePicture ? 'Profile Picture' : 'Uploaded Images'} ({images.length})
          </Text>
          
          <SimpleGrid columns={isProfilePicture ? 1 : { base: 2, md: 3 }} spacing={4}>
            {images.map((image, index) => (
              <Box
                key={image.publicId}
                position="relative"
                borderRadius="lg"
                overflow="hidden"
                border="1px solid"
                borderColor={borderColor}
                _hover={{ boxShadow: 'md' }}
                transition="all 0.2s"
              >
                <AspectRatio ratio={isProfilePicture ? 1 : 4/3}>
                  <Image
                    src={ImageUploadService.getThumbnailUrl(image.publicId, isProfilePicture ? 300 : 300)}
                    alt={`Upload ${index + 1}`}
                    objectFit="cover"
                    fallback={
                      <Flex align="center" justify="center" bg={bgColor}>
                        <Text fontSize="sm" color="gray.500">Loading...</Text>
                      </Flex>
                    }
                  />
                </AspectRatio>
                
                {/* Delete Button */}
                <IconButton
                  aria-label="Remove image"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  variant="solid"
                  position="absolute"
                  top={2}
                  right={2}
                  onClick={() => removeImage(index)}
                  isDisabled={uploading || disabled}
                  boxShadow="md"
                />
                
                {/* Image Info */}
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
                    {image.format.toUpperCase()} • {(image.bytes / 1024).toFixed(0)} KB
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}      {/* Upload Button (Alternative to drag-drop) */}
      {canUploadMore && (
        <VStack spacing={2}>
          {isMobile && !isProfilePicture ? (
            // Mobile: Separate Camera and Gallery buttons
            <HStack spacing={2} w="full">
              <Button
                leftIcon={<>📸</>}
                variant="outline"
                colorScheme="green"
                onClick={() => document.getElementById('camera-input')?.click()}
                isLoading={uploading}
                loadingText="Uploading..."
                disabled={disabled}
                size="md"
                flex={1}
              >
                Camera
              </Button>
              <Button
                leftIcon={<>🖼️</>}
                variant="outline"
                colorScheme="blue"
                onClick={() => fileInputRef.current?.click()}
                isLoading={uploading}
                loadingText="Uploading..."
                disabled={disabled}
                size="md"
                flex={1}
              >
                Gallery
              </Button>
            </HStack>
          ) : (
            // Desktop or Profile Picture: Single button
            <Button
              leftIcon={<AddIcon />}
              variant="outline"
              colorScheme="green"
              onClick={() => fileInputRef.current?.click()}
              isLoading={uploading}
              loadingText="Uploading..."
              disabled={disabled}
              size="md"
              w="full"
            >
              {isMobile 
                ? (isProfilePicture ? '📸 Take/Choose Photo' : `📸 Camera/Gallery (${images.length}/${maxImages})`)
                : (isProfilePicture ? 'Choose File' : `Upload Files (${images.length}/${maxImages})`)
              }
            </Button>
          )}
          
          {/* Progress indicator */}
          {!isProfilePicture && (
            <Text fontSize="xs" color="gray.500" textAlign="center">
              {images.length}/{maxImages} photos uploaded
            </Text>
          )}
        </VStack>
      )}
    </VStack>
  );
};

export default ImageUpload;
