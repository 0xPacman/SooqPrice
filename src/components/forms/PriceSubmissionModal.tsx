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
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Badge,
  Box,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { mockProducts } from '../../utils/mockData';
import { useAuth } from '../../hooks/useAuth';

// Custom icons
const PriceTagIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M5.5,9A1.5,1.5 0 0,0 7,7.5A1.5,1.5 0 0,0 5.5,6A1.5,1.5 0 0,0 4,7.5A1.5,1.5 0 0,0 5.5,9M17.41,11.58C17.77,11.94 18,12.44 18,13C18,13.55 17.78,14.05 17.41,14.41L12.41,19.41C12.05,19.77 11.55,20 11,20C10.45,20 9.95,19.78 9.59,19.41L2.59,12.41C2.22,12.05 2,11.55 2,11V4C2,2.89 2.89,2 4,2H11C11.55,2 12.05,2.22 12.41,2.59L19.41,9.59C19.77,9.95 20,10.45 20,11C20,11.55 19.78,12.05 19.41,12.41L17.41,11.58Z"
    />
  </Icon>
);

interface PriceSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketId: string;
  marketName: string;
  preselectedProductId?: string;
}

interface FormData {
  productId: string;
  price: number;
  unit: string;
  quality: 'poor' | 'average' | 'good' | 'excellent';
  notes: string;
}

export const PriceSubmissionModal: React.FC<PriceSubmissionModalProps> = ({
  isOpen,
  onClose,
  marketId,
  marketName,
  preselectedProductId
}) => {
  const { user } = useAuth();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      productId: preselectedProductId || '',
      price: 0,
      unit: 'kg',
      quality: 'good',
      notes: ''
    }
  });

  const selectedProductId = watch('productId');
  const selectedProduct = mockProducts.find(p => p.id === selectedProductId);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to submit prices.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, this would be an API call
      console.log('Price submission:', {
        marketId,
        userId: user.id,
        ...data,
        submissionDate: new Date(),
      });

      toast({
        title: 'Price Submitted Successfully!',
        description: `Thank you for contributing to ${marketName}'s price data.`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      handleClose();
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your price. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const qualityColors = {
    poor: 'red',
    average: 'orange',
    good: 'green',
    excellent: 'blue'
  };

  const qualityLabels = {
    poor: 'Poor Quality',
    average: 'Average Quality',
    good: 'Good Quality',
    excellent: 'Excellent Quality'
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent mx={4}>
        <ModalHeader>
          <Flex align="center" gap={3}>
            <Icon as={PriceTagIcon} color="green.500" boxSize={6} />
            <Box>
              <Text fontSize="lg" fontWeight="bold">Submit Price</Text>
              <Text fontSize="sm" color="gray.600" fontWeight="normal">
                {marketName}
              </Text>
            </Box>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={!!errors.productId} isRequired>
                <FormLabel>Product</FormLabel>
                <Select
                  placeholder="Select a product"
                  {...register('productId', { required: 'Product is required' })}
                >
                  {mockProducts.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} ({product.nameAr})
                    </option>
                  ))}
                </Select>
                {errors.productId && (
                  <Text color="red.500" fontSize="sm">{errors.productId.message}</Text>
                )}
              </FormControl>

              {selectedProduct && (
                <Box p={3} bg="gray.50" borderRadius="md">
                  <Text fontSize="sm" color="gray.600">
                    <strong>Category:</strong> {selectedProduct.category}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    <strong>Common Units:</strong> {selectedProduct.commonUnits.join(', ')}
                  </Text>
                </Box>
              )}

              <HStack spacing={4}>
                <FormControl isInvalid={!!errors.price} isRequired flex={2}>
                  <FormLabel>Price (MAD)</FormLabel>
                  <NumberInput min={0} precision={2}>
                    <NumberInputField
                      {...register('price', { 
                        required: 'Price is required',
                        min: { value: 0.01, message: 'Price must be greater than 0' }
                      })}
                      placeholder="0.00"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  {errors.price && (
                    <Text color="red.500" fontSize="sm">{errors.price.message}</Text>
                  )}
                </FormControl>

                <FormControl isRequired flex={1}>
                  <FormLabel>Unit</FormLabel>
                  <Select {...register('unit')}>
                    {selectedProduct?.commonUnits.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    )) || (
                      <>
                        <option value="kg">kg</option>
                        <option value="piece">piece</option>
                        <option value="bunch">bunch</option>
                        <option value="bag">bag</option>
                      </>
                    )}
                  </Select>
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Quality</FormLabel>
                <HStack spacing={2} flexWrap="wrap">
                  {Object.entries(qualityLabels).map(([value, label]) => (
                    <Badge
                      key={value}
                      colorScheme={qualityColors[value as keyof typeof qualityColors]}
                      variant={watch('quality') === value ? 'solid' : 'outline'}
                      cursor="pointer"
                      px={3}
                      py={1}
                      onClick={() => setValue('quality', value as FormData['quality'])}
                    >
                      {label}
                    </Badge>
                  ))}
                </HStack>
              </FormControl>

              <FormControl>
                <FormLabel>Notes (Optional)</FormLabel>
                <Textarea
                  {...register('notes')}
                  placeholder="Any additional information about this price (seasonal, bulk, etc.)"
                  size="sm"
                  resize="none"
                />
              </FormControl>

              <Box p={3} bg="blue.50" borderRadius="md" borderLeft="4px solid" borderColor="blue.500">
                <Text fontSize="sm" color="blue.700">
                  <strong>Tip:</strong> Accurate price submissions help the community and earn you reputation points!
                </Text>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="green"
              isLoading={isSubmitting}
              loadingText="Submitting..."
            >
              Submit Price
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
