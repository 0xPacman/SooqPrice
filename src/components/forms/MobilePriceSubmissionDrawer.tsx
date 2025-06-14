import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
  Box,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';
import { ImageUpload } from '@/components/common/ImageUpload';
import { ImageCarousel } from '@/components/common/ImageCarousel';
import { UploadedImage } from '@/services/imageUpload';
import { mockMarkets, mockProducts } from '@/utils/mockData';

interface MobilePriceSubmissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const qualityOptions = [
  { value: 'premium', label: 'Premium Quality', description: 'Fresh, perfect condition' },
  { value: 'good', label: 'Good Quality', description: 'Fresh, minor imperfections' },
  { value: 'fair', label: 'Fair Quality', description: 'Acceptable, some issues' },
];

const CameraIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"
    />
  </Icon>
);

export const MobilePriceSubmissionDrawer: React.FC<MobilePriceSubmissionDrawerProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const toast = useToast();
  
  const [submitting, setSubmitting] = useState(false);
  const [productImages, setProductImages] = useState<UploadedImage[]>([]);
  const [formData, setFormData] = useState({
    productId: '',
    marketId: '',
    price: '',
    quality: 'good',
    unit: 'kg',
    notes: '',
    availableQuantity: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.productId) newErrors.productId = 'Please select a product';
    if (!formData.marketId) newErrors.marketId = 'Please select a market';
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }
    
    // Photos are optional for mobile too
    // Removed the mandatory photo requirement

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    
    try {
      const submissionData = {
        ...formData,
        price: parseFloat(formData.price),
        images: productImages.map(img => ({
          url: img.url,
          publicId: img.publicId
        })),
        userId: user?.id,
        submissionDate: new Date().toISOString(),
        platform: 'mobile',
      };

      console.log('Submitting mobile price data:', submissionData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Price submitted successfully! 🎉',
        description: `Price submitted with ${productImages.length} photo(s)`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        productId: '',
        marketId: '',
        price: '',
        quality: 'good',
        unit: 'kg',
        notes: '',
        availableQuantity: '',
      });
      setProductImages([]);
      setErrors({});

      onSuccess?.();
      onClose();

    } catch (error) {
      toast({
        title: 'Submission failed',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };
  const handleProductImagesChange = (images: UploadedImage[]) => {
    setProductImages(images);
    // Clear image error when user adds photos (if any validation errors existed)
    if (images.length > 0 && errors.images) {
      setErrors(prev => ({ ...prev, images: '' }));
    }
  };
  const selectedProduct = mockProducts.find(p => p.id === formData.productId);
  const selectedMarket = mockMarkets.find(m => m.id === formData.marketId);

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent borderTopRadius="xl">
        <DrawerCloseButton />        <DrawerHeader pb={2}>
          <VStack spacing={2} align="center">
            <HStack spacing={3}>
              <Icon as={CameraIcon} color="green.500" boxSize={6} />
              <Text fontSize="lg" fontWeight="bold">Submit Price</Text>
            </HStack>            <Text fontSize="sm" color="gray.600" textAlign="center">
              📱 Take photos or upload from gallery
            </Text>
          </VStack>
        </DrawerHeader>
        
        <DrawerBody px={4}>
          <VStack spacing={4} align="stretch">            {/* Product Images - Optional for Mobile with Camera */}
            <Box>              <FormLabel mb={3}>
                Product Photos (Optional)
              </FormLabel>
              
              {errors.images && (
                <Alert status="error" borderRadius="md" mb={3} size="sm">
                  <AlertIcon boxSize={4} />
                  <AlertDescription fontSize="sm">{errors.images}</AlertDescription>
                </Alert>
              )}
                <Text fontSize="sm" color="gray.600" mb={4}>
                📸 Take photos with camera or choose from gallery to help verify prices
              </Text>
              
              <ImageUpload
                maxImages={3}
                isProfilePicture={false}
                existingImages={productImages}
                onImagesChange={handleProductImagesChange}
                userId={user?.id || 'anonymous'}
              />
            </Box>

            <Divider />

            {/* Product Selection */}
            <FormControl isInvalid={!!errors.productId} size="sm">
              <FormLabel fontSize="sm">Product *</FormLabel>
              <Select
                placeholder="Select a product"
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                size="sm"
              >
                {mockProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.category})
                  </option>
                ))}
              </Select>
              {errors.productId && (
                <Text color="red.500" fontSize="xs" mt={1}>{errors.productId}</Text>
              )}
            </FormControl>            {/* Product Images from Unsplash */}
            {selectedProduct && (
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={3}>
                  📸 Reference Images for {selectedProduct.name}
                </Text>
                <Box borderRadius="lg" overflow="hidden">
                  <ImageCarousel
                    productName={selectedProduct.name}
                    maxImages={3}
                    showAttribution={true}
                    aspectRatio={16/9}
                    autoPlay={true}
                    autoPlayInterval={4000}
                    showDots={true}
                    size="small"
                  />
                </Box>
              </Box>
            )}

            {/* Market Selection */}
            <FormControl isInvalid={!!errors.marketId} size="sm">
              <FormLabel fontSize="sm">Market *</FormLabel>              <Select
                placeholder="Select a market"
                value={formData.marketId}
                onChange={(e) => setFormData({ ...formData, marketId: e.target.value })}
                size="sm"
              >
                {mockMarkets.map(market => (
                  <option key={market.id} value={market.id}>
                    {market.name}
                  </option>
                ))}
              </Select>
              {errors.marketId && (
                <Text color="red.500" fontSize="xs" mt={1}>{errors.marketId}</Text>
              )}
            </FormControl>

            {/* Price and Unit */}
            <HStack spacing={3} align="end">
              <FormControl isInvalid={!!errors.price} flex={2} size="sm">
                <FormLabel fontSize="sm">Price (DH) *</FormLabel>
                <NumberInput
                  value={formData.price}
                  onChange={(value) => setFormData({ ...formData, price: value })}
                  min={0}
                  precision={2}
                  step={0.5}
                  size="sm"
                >
                  <NumberInputField placeholder="0.00" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {errors.price && (
                  <Text color="red.500" fontSize="xs" mt={1}>{errors.price}</Text>
                )}
              </FormControl>

              <FormControl flex={1} size="sm">
                <FormLabel fontSize="sm">Unit</FormLabel>
                <Select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  size="sm"
                >
                  <option value="kg">per kg</option>
                  <option value="piece">per piece</option>
                  <option value="bunch">per bunch</option>
                  <option value="box">per box</option>
                </Select>
              </FormControl>
            </HStack>

            {/* Quality Selection */}
            <FormControl size="sm">
              <FormLabel fontSize="sm">Quality</FormLabel>
              <Select
                value={formData.quality}
                onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                size="sm"
              >
                {qualityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Notes */}
            <FormControl size="sm">
              <FormLabel fontSize="sm">Notes (Optional)</FormLabel>
              <Textarea
                placeholder="Any additional information..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                size="sm"
              />
            </FormControl>

            {/* Submission Preview */}
            {(selectedProduct || selectedMarket || formData.price || productImages.length > 0) && (
              <Alert status="info" borderRadius="md" size="sm">
                <AlertIcon boxSize={4} />
                <Box>
                  <Text fontWeight="bold" fontSize="sm">Submission Preview:</Text>
                  <VStack align="start" spacing={1} mt={1}>
                    {selectedProduct && (
                      <Text fontSize="xs">📦 {selectedProduct.name}</Text>
                    )}
                    {selectedMarket && (
                      <Text fontSize="xs">🏪 {selectedMarket.name}</Text>
                    )}
                    {formData.price && (
                      <Text fontSize="xs">💰 {formData.price} DH/{formData.unit}</Text>
                    )}                    {productImages.length > 0 && (
                      <Text fontSize="xs" color="green.600" fontWeight="medium">
                        📸 {productImages.length} photo(s) attached
                      </Text>
                    )}
                    {productImages.length === 0 && (
                      <Text fontSize="xs" color="gray.500">
                        📸 No photos
                      </Text>
                    )}
                  </VStack>
                </Box>
              </Alert>
            )}

            {/* Product Image Display - Show selected product images */}            {selectedProduct && (
              <Box mt={4}>
                <Text fontWeight="bold" fontSize="sm" mb={2}>Product Images:</Text>
                <ImageCarousel
                  productName={selectedProduct.name}
                  maxImages={3}
                  showAttribution={false}
                  showDownload={false}
                  aspectRatio={4/3}
                  autoPlay={false}
                  showDots={true}
                  size="regular"
                />
              </Box>
            )}
          </VStack>
        </DrawerBody>

        <DrawerFooter px={4} pt={2}>
          <VStack spacing={3} w="full">            <Button
              colorScheme="green"
              size="lg"
              w="full"
              onClick={handleSubmit}
              isLoading={submitting}
              loadingText="Submitting..."
              disabled={!formData.productId || !formData.marketId || !formData.price}
              leftIcon={<Icon as={CameraIcon} />}
            >
              {productImages.length > 0 
                ? `Submit with ${productImages.length} Photo(s)` 
                : 'Submit Price'
              }
            </Button>
            
            <Button
              variant="ghost"
              size="md"
              onClick={onClose}
              disabled={submitting}
              w="full"
            >
              Cancel
            </Button>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobilePriceSubmissionDrawer;
