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
  Select,
  Textarea,
  VStack,
  Text,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
  Icon,
  Flex,
  Box,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';

// Custom icons
const ReportIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17A1.5,1.5 0 0,1 10.5,15.5A1.5,1.5 0 0,1 12,14A1.5,1.5 0 0,1 13.5,15.5A1.5,1.5 0 0,1 12,17M12,10.5A1.5,1.5 0 0,1 10.5,9A1.5,1.5 0 0,1 12,7.5A1.5,1.5 0 0,1 13.5,9A1.5,1.5 0 0,1 12,10.5Z"
    />
  </Icon>
);

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportType: 'user' | 'market' | 'price';
  targetId: string;
  targetName: string;
}

interface FormData {
  reason: string;
  description: string;
}

const reportReasons = {
  user: [
    { value: 'spam', label: 'Spam or inappropriate content' },
    { value: 'fake_prices', label: 'Consistently submitting fake prices' },
    { value: 'harassment', label: 'Harassment or offensive behavior' },
    { value: 'impersonation', label: 'Impersonation or fake account' },
    { value: 'other', label: 'Other violation' },
  ],
  market: [
    { value: 'incorrect_info', label: 'Incorrect market information' },
    { value: 'closed_permanently', label: 'Market is permanently closed' },
    { value: 'wrong_location', label: 'Wrong location or address' },
    { value: 'duplicate', label: 'Duplicate market listing' },
    { value: 'other', label: 'Other issue' },
  ],
  price: [
    { value: 'obviously_wrong', label: 'Price is obviously incorrect' },
    { value: 'outdated', label: 'Price is very outdated' },
    { value: 'spam', label: 'Spam or fake submission' },
    { value: 'wrong_product', label: 'Wrong product category' },
    { value: 'other', label: 'Other issue' },
  ],
};

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  reportType,
  targetId,
  targetName
}) => {
  const { user } = useAuth();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to submit reports.',
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

      // In a real app, this would be an API call to submit the report
      console.log('Report submitted:', {
        reportType,
        targetId,
        targetName,
        reporterId: user.id,
        ...data,
        submissionDate: new Date(),
      });

      toast({
        title: 'Report Submitted',
        description: 'Thank you for helping us maintain quality. We will review this report.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      handleClose();
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your report. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const reasons = reportReasons[reportType] || [];
  const typeLabels = {
    user: 'User',
    market: 'Market',
    price: 'Price'
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent mx={4}>
        <ModalHeader>
          <Flex align="center" gap={3}>
            <Icon as={ReportIcon} color="orange.500" boxSize={6} />
            <Box>
              <Text fontSize="lg" fontWeight="bold">Report {typeLabels[reportType]}</Text>
              <Text fontSize="sm" color="gray.600" fontWeight="normal">
                {targetName}
              </Text>
            </Box>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <AlertDescription fontSize="sm">
                  Reports are reviewed by our moderation team. False reports may result in account restrictions.
                </AlertDescription>
              </Alert>

              <FormControl isInvalid={!!errors.reason} isRequired>
                <FormLabel>Reason for Report</FormLabel>
                <Select
                  placeholder="Select a reason"
                  {...register('reason', { required: 'Please select a reason' })}
                >
                  {reasons.map(reason => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </Select>
                {errors.reason && (
                  <Text color="red.500" fontSize="sm">{errors.reason.message}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.description} isRequired>
                <FormLabel>Additional Details</FormLabel>
                <Textarea
                  {...register('description', { 
                    required: 'Please provide additional details',
                    minLength: { value: 10, message: 'Please provide at least 10 characters' }
                  })}
                  placeholder="Please provide specific details about the issue..."
                  rows={4}
                  resize="none"
                />
                {errors.description && (
                  <Text color="red.500" fontSize="sm">{errors.description.message}</Text>
                )}
              </FormControl>

              <Alert status="warning" borderRadius="md">
                <AlertIcon />
                <AlertDescription fontSize="sm">
                  Your report will be anonymous to other users but visible to moderators with your account information.
                </AlertDescription>
              </Alert>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="orange"
              isLoading={isSubmitting}
              loadingText="Submitting..."
            >
              Submit Report
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
