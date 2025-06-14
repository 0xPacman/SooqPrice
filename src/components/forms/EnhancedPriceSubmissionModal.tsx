import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
  Box,
  Divider,
  Icon,  SimpleGrid,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useAuth } from '@/hooks/useAuth';
import { ImageUpload } from '@/components/common/ImageUpload';
import { ImageCarousel } from '@/components/common/ImageCarousel';
import { UploadedImage } from '@/services/imageUpload';
import { mockMarkets, mockProducts } from '@/utils/mockData';

interface EnhancedPriceSubmissionModalProps {
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

export const EnhancedPriceSubmissionModal: React.FC<EnhancedPriceSubmissionModalProps> = ({
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    
    try {
      // Here you would submit to your backend
      const submissionData = {
        ...formData,
        price: parseFloat(formData.price),
        images: productImages.map(img => ({
          url: img.url,
          publicId: img.publicId
        })),
        userId: user?.id,
        submissionDate: new Date().toISOString(),
      };

      console.log('Submitting price data:', submissionData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Price submitted successfully! 🎉',
        description: productImages.length > 0 
          ? `Price submitted with ${productImages.length} photo(s)`
          : 'Price submitted successfully',
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
  };
  const selectedProduct = mockProducts.find(p => p.id === formData.productId);
  const selectedMarket = mockMarkets.find(m => m.id === formData.marketId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>        <ModalHeader>
          <HStack spacing={3}>
            <Icon as={CameraIcon} color="green.500" />
            <Text>Submit Market Price</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Product Selection */}
            <FormControl isInvalid={!!errors.productId}>
              <FormLabel>Product *</FormLabel>
              <Select
                placeholder="Select a product"
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
              >                {mockProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.category})
                  </option>
                ))}
              </Select>
              {errors.productId && (
                <Text color="red.500" fontSize="sm" mt={1}>{errors.productId}</Text>
              )}
            </FormControl>            {/* Product Images from Unsplash */}
            {selectedProduct && (
              <Box>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={3}>
                  📸 Reference Images for {selectedProduct.name}
                </Text>
                <Box borderRadius="xl" overflow="hidden">
                  <ImageCarousel
                    productName={selectedProduct.name}
                    maxImages={4}
                    showAttribution={true}
                    showDownload={true}
                    aspectRatio={16/9}
                    autoPlay={true}
                    autoPlayInterval={5000}
                    showDots={true}
                    size="regular"
                  />
                </Box>
              </Box>
            )}

            {/* Market Selection */}
            <FormControl isInvalid={!!errors.marketId}>
              <FormLabel>Market *</FormLabel>
              <Select
                placeholder="Select a market"
                value={formData.marketId}
                onChange={(e) => setFormData({ ...formData, marketId: e.target.value })}
              >                {mockMarkets.map(market => (
                  <option key={market.id} value={market.id}>
                    {market.name}
                  </option>
                ))}
              </Select>
              {errors.marketId && (
                <Text color="red.500" fontSize="sm" mt={1}>{errors.marketId}</Text>
              )}
            </FormControl>

            {/* Price and Unit */}
            <HStack spacing={4} align="end">
              <FormControl isInvalid={!!errors.price} flex={2}>
                <FormLabel>Price (DH) *</FormLabel>
                <NumberInput
                  value={formData.price}
                  onChange={(value) => setFormData({ ...formData, price: value })}
                  min={0}
                  precision={2}
                  step={0.5}
                >
                  <NumberInputField placeholder="0.00" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {errors.price && (
                  <Text color="red.500" fontSize="sm" mt={1}>{errors.price}</Text>
                )}
              </FormControl>

              <FormControl flex={1}>
                <FormLabel>Unit</FormLabel>
                <Select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                >
                  <option value="kg">per kg</option>
                  <option value="piece">per piece</option>
                  <option value="bunch">per bunch</option>
                  <option value="box">per box</option>
                </Select>
              </FormControl>
            </HStack>

            {/* Quality Selection */}
            <FormControl>
              <FormLabel>Quality</FormLabel>
              <Select
                value={formData.quality}
                onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
              >
                {qualityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} - {option.description}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Available Quantity */}
            <FormControl>
              <FormLabel>Available Quantity (Optional)</FormLabel>
              <Input
                placeholder="e.g., Limited stock, Plenty available"
                value={formData.availableQuantity}
                onChange={(e) => setFormData({ ...formData, availableQuantity: e.target.value })}
              />
            </FormControl>            <Divider />            {/* Product Images - Desktop File Upload */}
            <Box display={{ base: "none", md: "block" }}>
              <FormLabel mb={3}>
                Product Photos (optional)
              </FormLabel>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Upload photos from your computer to help buyers make better decisions and increase trust.
              </Text>
              
              <ImageUpload
                maxImages={3}
                isProfilePicture={false}
                existingImages={productImages}
                onImagesChange={handleProductImagesChange}
                userId={user?.id || 'anonymous'}
              />
            </Box>

            {/* Product Images - Mobile Preview */}
            <Box display={{ base: "block", md: "none" }}>
              <FormLabel mb={3}>
                Product Photos (optional)
              </FormLabel>
              
              <SimpleGrid columns={3} spacing={2}>
                {productImages.length === 0 && (
                  <Text color="gray.500" fontSize="sm" textAlign="center" py={4}>
                    No photos uploaded yet.
                  </Text>
                )}
                {productImages.map((image, index) => (
                  <Box key={index} position="relative" borderRadius="md" overflow="hidden">
                    <Image
                      src={image.url}
                      alt={`Product Image ${index + 1}`}
                      borderRadius="md"
                      objectFit="cover"
                      width="100%"
                      height={100}
                    />
                    <IconButton
                      aria-label="Remove image"
                      icon={<CloseIcon />}
                      size="sm"
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme="red"
                      onClick={() => handleProductImagesChange(productImages.filter((_, i) => i !== index))}
                    />
                  </Box>
                ))}
              </SimpleGrid>
              
              <Text fontSize="sm" color="gray.600" mt={2}>
                Tap on an image to remove it.
              </Text>
            </Box>

            <Divider />

            {/* Notes */}
            <FormControl>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <Textarea
                placeholder="Any additional information about the product, market conditions, or pricing..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </FormControl>

            {/* Submission Preview */}
            {(selectedProduct || selectedMarket || formData.price) && (
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <AlertDescription>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold">Submission Preview:</Text>
                    {selectedProduct && (
                      <Text fontSize="sm">📦 {selectedProduct.name}</Text>
                    )}
                    {selectedMarket && (
                      <Text fontSize="sm">🏪 {selectedMarket.name}</Text>
                    )}
                    {formData.price && (
                      <Text fontSize="sm">💰 {formData.price} DH/{formData.unit}</Text>
                    )}
                    {productImages.length > 0 && (
                      <Text fontSize="sm">📸 {productImages.length} photo(s) attached</Text>
                    )}
                  </VStack>
                </AlertDescription>
              </Alert>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={handleSubmit}
              isLoading={submitting}
              loadingText="Submitting..."
              disabled={!formData.productId || !formData.marketId || !formData.price}
            >
              Submit Price
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EnhancedPriceSubmissionModal;
