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
  Avatar,
  Divider,
  useBreakpointValue,
  Slide,
  ScaleFade,
  IconButton,
  Progress,
  Portal,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ChevronDownIcon, CheckIcon } from '@chakra-ui/icons';
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

const CameraIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"
    />
  </Icon>
);

interface SwipeablePriceSubmissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  marketId: string;
  marketName: string;
  preselectedProductId?: string;
  onSuccess?: () => void;
}

interface FormData {
  productId: string;
  price: number;
  unit: string;
  quality: 'poor' | 'average' | 'good' | 'excellent';
  notes: string;
}

const FORM_STEPS = ['product', 'price', 'quality', 'review'] as const;
type FormStep = typeof FORM_STEPS[number];

export const SwipeablePriceSubmissionDrawer: React.FC<SwipeablePriceSubmissionDrawerProps> = ({
  isOpen,
  onClose,
  marketId,
  marketName,
  preselectedProductId,
  onSuccess
}) => {
  const { user } = useAuth();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<FormStep>('product');
  const [showSuccess, setShowSuccess] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false }) ?? true;
  const drawerSize = useBreakpointValue({ base: 'full', md: 'md' }) ?? 'full';
  const drawerPlacement: 'bottom' | 'right' = isMobile ? 'bottom' : 'right';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
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
  const watchedData = watch();

  const stepIndex = FORM_STEPS.indexOf(currentStep);
  const progress = ((stepIndex + 1) / FORM_STEPS.length) * 100;

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleClose = () => {
    reset();
    setCurrentStep('product');
    setShowSuccess(false);
    onClose();
  };

  const nextStep = async () => {
    let isValid = false;
    
    switch (currentStep) {
      case 'product':
        isValid = await trigger('productId');
        break;
      case 'price':
        isValid = await trigger(['price', 'unit']);
        break;
      case 'quality':
        isValid = true; // Quality is always valid since it has a default
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      const nextIndex = stepIndex + 1;
      if (nextIndex < FORM_STEPS.length) {
        setCurrentStep(FORM_STEPS[nextIndex]);
      }
    }
  };

  const prevStep = () => {
    const prevIndex = stepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(FORM_STEPS[prevIndex]);
    }
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
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Price submission:', {
        marketId,
        userId: user.id,
        ...data,
        submissionDate: new Date(),
      });

      setShowSuccess(true);
      
      setTimeout(() => {
        toast({
          title: 'Price Submitted Successfully! 🎉',
          description: `Thank you for contributing to ${marketName}'s price data. You earned +10 reputation points!`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        handleClose();
        onSuccess?.();
      }, 2000);

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

  const qualityOptions = [
    { value: 'poor', label: 'Poor Quality', color: 'red', emoji: '😞' },
    { value: 'average', label: 'Average Quality', color: 'orange', emoji: '😐' },
    { value: 'good', label: 'Good Quality', color: 'green', emoji: '😊' },
    { value: 'excellent', label: 'Excellent Quality', color: 'blue', emoji: '🤩' }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 'product':
        return (
          <VStack spacing={6} align="stretch" h="full">
            <Box textAlign="center">
              <Text fontSize="2xl" mb={2}>🛒</Text>
              <Text fontSize="lg" fontWeight="bold">What are you pricing?</Text>
              <Text color="gray.600" fontSize="sm">Select the product you want to add a price for</Text>
            </Box>

            <FormControl isInvalid={!!errors.productId} isRequired>
              <FormLabel>Product</FormLabel>
              <Select
                placeholder="Search and select a product..."
                size="lg"
                {...register('productId', { required: 'Product is required' })}
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: "green.300" }}
                _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px #48BB78" }}
              >
                {mockProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.nameAr})
                  </option>
                ))}
              </Select>
              {errors.productId && (
                <Text color="red.500" fontSize="sm" mt={1}>{errors.productId.message}</Text>
              )}
            </FormControl>

            {selectedProduct && (
              <ScaleFade in={!!selectedProduct}>
                <Box 
                  p={4} 
                  bg="green.50" 
                  borderRadius="lg" 
                  borderLeft="4px solid" 
                  borderColor="green.500"
                  transition="all 0.3s"
                  _hover={{ bg: "green.100" }}
                >
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold" color="green.700">{selectedProduct.name}</Text>
                    <Text fontSize="sm" color="green.600" dir="rtl">{selectedProduct.nameAr}</Text>
                    <HStack flexWrap="wrap">
                      <Badge colorScheme="green">{selectedProduct.category}</Badge>
                      <Text fontSize="sm" color="gray.600">
                        Common units: {selectedProduct.commonUnits?.join(', ') || 'kg, piece'}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </ScaleFade>
            )}
          </VStack>
        );

      case 'price':
        return (
          <VStack spacing={6} align="stretch" h="full">
            <Box textAlign="center">
              <Text fontSize="2xl" mb={2}>💰</Text>
              <Text fontSize="lg" fontWeight="bold">How much did you pay?</Text>
              <Text color="gray.600" fontSize="sm">Enter the price you paid for {selectedProduct?.name}</Text>
            </Box>

            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.price} isRequired>
                <FormLabel>Price (MAD)</FormLabel>
                <NumberInput 
                  size="lg" 
                  min={0} 
                  precision={2}
                  focusInputOnChange={true}
                  clampValueOnBlur={false}
                >
                  <NumberInputField
                    {...register('price', { 
                      required: 'Price is required',
                      min: { value: 0.01, message: 'Price must be greater than 0' }
                    })}
                    placeholder="0.00"
                    fontSize="2xl"
                    textAlign="center"
                    bg="white"
                    borderColor="gray.300"
                    _hover={{ borderColor: "green.300" }}
                    _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px #48BB78" }}
                    onKeyDown={(e) => {
                      // Allow Enter to go to next step
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        nextStep();
                      }
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {errors.price && (
                  <Text color="red.500" fontSize="sm" mt={1}>{errors.price.message}</Text>
                )}
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Unit</FormLabel>
                <Select 
                  size="lg" 
                  {...register('unit')}
                  bg="white"
                  borderColor="gray.300"
                  _hover={{ borderColor: "green.300" }}
                  _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px #48BB78" }}
                >
                  {selectedProduct?.commonUnits?.map(unit => (
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
            </VStack>

            <Box p={4} bg="blue.50" borderRadius="lg">
              <Text fontSize="sm" color="blue.700" textAlign="center">
                <Icon as={CameraIcon} mr={2} />
                Pro tip: Take a photo of your receipt for verification!
              </Text>
            </Box>
          </VStack>
        );

      case 'quality':
        return (
          <VStack spacing={6} align="stretch" h="full">
            <Box textAlign="center">
              <Text fontSize="2xl" mb={2}>⭐</Text>
              <Text fontSize="lg" fontWeight="bold">How was the quality?</Text>
              <Text color="gray.600" fontSize="sm">This helps other users make better decisions</Text>
            </Box>

            <VStack spacing={3}>
              {qualityOptions.map(option => (
                <Box
                  key={option.value}
                  p={4}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor={watchedData.quality === option.value ? `${option.color}.500` : 'gray.200'}
                  bg={watchedData.quality === option.value ? `${option.color}.50` : 'white'}
                  cursor="pointer"
                  onClick={() => setValue('quality', option.value as FormData['quality'])}
                  transition="all 0.2s"
                  _hover={{ borderColor: `${option.color}.300`, transform: "scale(1.02)" }}
                  _active={{ transform: "scale(0.98)" }}
                  w="full"
                  minH="60px"
                  shadow={watchedData.quality === option.value ? "md" : "sm"}
                >
                  <HStack justify="space-between" align="center" h="full">
                    <HStack spacing={3}>
                      <Text fontSize="2xl">{option.emoji}</Text>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium" fontSize="md">{option.label}</Text>
                      </VStack>
                    </HStack>
                    {watchedData.quality === option.value && (
                      <Box
                        bg={`${option.color}.500`}
                        borderRadius="full"
                        p={1}
                      >
                        <Icon as={CheckIcon} color="white" boxSize={3} />
                      </Box>
                    )}
                  </HStack>
                </Box>
              ))}
            </VStack>

            <FormControl>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <Textarea
                {...register('notes')}
                placeholder="Any additional information (seasonal, bulk discount, etc.)"
                size="sm"
                resize="none"
                rows={3}
              />
            </FormControl>
          </VStack>
        );

      case 'review':
        return (
          <VStack spacing={6} align="stretch" h="full">
            <Box textAlign="center">
              <Text fontSize="2xl" mb={2}>📋</Text>
              <Text fontSize="lg" fontWeight="bold">Review Your Submission</Text>
              <Text color="gray.600" fontSize="sm">Make sure everything looks correct</Text>
            </Box>

            <VStack spacing={4} align="stretch">
              <Box p={4} bg="gray.50" borderRadius="lg">
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <Text fontWeight="medium" color="gray.600">Product:</Text>
                    <Text fontWeight="bold">{selectedProduct?.name}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="medium" color="gray.600">Price:</Text>
                    <Text fontWeight="bold" fontSize="lg" color="green.500">
                      {watchedData.price} DH per {watchedData.unit}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="medium" color="gray.600">Quality:</Text>
                    <Badge colorScheme={qualityOptions.find(q => q.value === watchedData.quality)?.color}>
                      {qualityOptions.find(q => q.value === watchedData.quality)?.label}
                    </Badge>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="medium" color="gray.600">Market:</Text>
                    <Text fontWeight="bold">{marketName}</Text>
                  </HStack>
                  {watchedData.notes && (
                    <>
                      <Divider />
                      <Box>
                        <Text fontWeight="medium" color="gray.600" mb={1}>Notes:</Text>
                        <Text fontSize="sm" fontStyle="italic">"{watchedData.notes}"</Text>
                      </Box>
                    </>
                  )}
                </VStack>
              </Box>

              <Box p={4} bg="green.50" borderRadius="lg" borderLeft="4px solid" borderColor="green.500">
                <HStack>
                  <Avatar size="sm" name={user?.fullName} src={user?.avatarUrl} />
                  <VStack align="start" spacing={0} flex={1}>
                    <Text fontSize="sm" fontWeight="medium">Submitting as {user?.username}</Text>
                    <Text fontSize="xs" color="gray.600">+10 reputation points on approval</Text>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          </VStack>
        );

      default:
        return null;
    }
  };

  const renderMobileHeader = () => (
    <VStack align="stretch" spacing={3} position="relative">
      {/* Swipe indicator for mobile */}
      {isMobile && (
        <Flex justify="center" pt={2} pb={1}>
          <Box
            w="40px"
            h="4px"
            bg="gray.300"
            borderRadius="full"
            cursor="grab"
            _active={{ cursor: "grabbing" }}
            transition="all 0.2s"
            _hover={{ bg: "gray.400" }}
          />
        </Flex>
      )}
      
      <HStack justify="space-between" align="center">
        <HStack spacing={3}>
          <Icon as={PriceTagIcon} color="green.500" boxSize={6} />
          <VStack align="start" spacing={0}>
            <Text fontSize="lg" fontWeight="bold">Submit Price</Text>
            <Text fontSize="sm" color="gray.600" fontWeight="normal">
              Step {stepIndex + 1} of {FORM_STEPS.length}
            </Text>
          </VStack>
        </HStack>
        {!isMobile && <DrawerCloseButton position="relative" right={0} top={0} />}
        {isMobile && (
          <IconButton
            aria-label="Close"
            icon={<Text fontSize="lg">✕</Text>}
            variant="ghost"
            size="sm"
            onClick={handleClose}
            borderRadius="full"
          />
        )}
      </HStack>
      <Progress 
        value={progress} 
        colorScheme="green" 
        size="sm" 
        borderRadius="full"
        bg="gray.100"
      />
    </VStack>
  );

  if (showSuccess) {
    return (
      <Drawer 
        isOpen={isOpen} 
        placement={drawerPlacement} 
        onClose={handleClose} 
        size={drawerSize}
        blockScrollOnMount={true}
        preserveScrollBarGap={true}
      >
        <DrawerOverlay />
        <DrawerContent
          maxH={isMobile ? "90vh" : "100vh"}
          borderTopRadius={isMobile ? "xl" : "none"}
          borderBottomRadius={isMobile ? "none" : "md"}
        >
          <DrawerBody display="flex" alignItems="center" justifyContent="center">
            <VStack spacing={6} textAlign="center" py={8}>
              <Box fontSize="6xl">🎉</Box>
              <VStack spacing={2}>
                <Text fontSize="2xl" fontWeight="bold" color="green.500">Success!</Text>
                <Text color="gray.600">Your price has been submitted and is being reviewed.</Text>
                <Text fontSize="sm" color="gray.500">You'll earn reputation points once approved!</Text>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer 
      isOpen={isOpen} 
      placement={drawerPlacement} 
      onClose={handleClose} 
      size={drawerSize}
      // Add better mobile support
      blockScrollOnMount={true}
      preserveScrollBarGap={true}
    >
      <DrawerOverlay />
      <DrawerContent
        // Ensure proper mobile styling for bottom placement
        maxH={isMobile ? "90vh" : "100vh"}
        borderTopRadius={isMobile ? "xl" : "none"}
        borderBottomRadius={isMobile ? "none" : "md"}
      >
        <DrawerHeader pb={2}>
          {renderMobileHeader()}
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerBody py={4}>
            <Box h="full">
              {renderStepContent()}
            </Box>
          </DrawerBody>

          <DrawerFooter 
            borderTopWidth="1px" 
            pt={4}
            pb={isMobile ? 6 : 4}
            px={isMobile ? 6 : 4}
          >
            <HStack w="full" spacing={3}>
              {stepIndex > 0 && (
                <Button 
                  variant="ghost" 
                  onClick={prevStep} 
                  flex={1}
                  size={isMobile ? "lg" : "md"}
                  h={isMobile ? "48px" : "auto"}
                >
                  Previous
                </Button>
              )}
              
              {currentStep !== 'review' ? (
                <Button 
                  colorScheme="green" 
                  onClick={nextStep}
                  flex={2}
                  size={isMobile ? "lg" : "md"}
                  h={isMobile ? "48px" : "auto"}
                  isDisabled={currentStep === 'product' && !selectedProductId}
                  _disabled={{
                    opacity: 0.4,
                    cursor: 'not-allowed'
                  }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  colorScheme="green"
                  isLoading={isSubmitting}
                  loadingText="Submitting..."
                  flex={2}
                  size={isMobile ? "lg" : "md"}
                  h={isMobile ? "48px" : "auto"}
                  fontWeight="bold"
                >
                  Submit Price
                </Button>
              )}
            </HStack>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default SwipeablePriceSubmissionDrawer;
