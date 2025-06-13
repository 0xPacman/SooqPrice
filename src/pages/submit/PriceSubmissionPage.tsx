import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  useDisclosure,
  Alert,
  AlertIcon,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import SwipeablePriceSubmissionDrawer from '../../components/forms/SwipeablePriceSubmissionDrawer';

// Custom icons
const PriceTagIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M5.5,9A1.5,1.5 0 0,0 7,7.5A1.5,1.5 0 0,0 5.5,6A1.5,1.5 0 0,0 4,7.5A1.5,1.5 0 0,0 5.5,9M17.41,11.58C17.77,11.94 18,12.44 18,13C18,13.55 17.78,14.05 17.41,14.41L12.41,19.41C12.05,19.77 11.55,20 11,20C10.45,20 9.95,19.78 9.59,19.41L2.59,12.41C2.22,12.05 2,11.55 2,11V4C2,2.89 2.89,2 4,2H11C11.55,2 12.05,2.22 12.41,2.59L19.41,9.59C19.77,9.95 20,10.45 20,11C20,11.55 19.78,12.05 19.41,12.41L17.41,11.58Z"
    />
  </Icon>
);

const PriceSubmissionPage: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSuccess = () => {
    onClose();
    // Navigate to markets page or stay on current page
    navigate('/markets');
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Flex justify="center" mb={4}>
            <Icon as={PriceTagIcon} w={12} h={12} color="green.500" />
          </Flex>
          <Heading size="xl" color="gray.800" mb={4}>
            تقديم أسعار السوق
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="md" mx="auto">
            ساعد مجتمعك بمشاركة أسعار المنتجات الطازجة من الأسواق المحلية
          </Text>
        </Box>

        {/* Info Alert */}
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold">نصائح لتقديم أسعار دقيقة:</Text>
            <Text fontSize="sm">
              • تأكد من الأسعار الحالية للمنتجات
            </Text>
            <Text fontSize="sm">
              • اختر جودة المنتج بدقة
            </Text>
            <Text fontSize="sm">
              • أضف ملاحظات مفيدة للمشترين
            </Text>
          </VStack>
        </Alert>

        {/* Main Action */}
        <Box textAlign="center" py={8}>
          <Button
            size="lg"
            colorScheme="green"
            leftIcon={<AddIcon />}
            onClick={onOpen}
            w="full"
            maxW="sm"
            mx="auto"
            h={16}
            fontSize="lg"
            borderRadius="xl"
            shadow="lg"
            _hover={{
              transform: 'translateY(-2px)',
              shadow: 'xl',
            }}
            transition="all 0.2s"
          >
            إضافة سعر جديد
          </Button>
        </Box>

        {/* Quick Stats */}
        <Box bg="white" p={6} borderRadius="xl" shadow="sm">
          <Heading size="md" mb={4} textAlign="center">
            إحصائيات سريعة
          </Heading>
          <VStack spacing={3}>
            <Flex justify="space-between" w="full">
              <Text color="gray.600">الأسعار المقدمة اليوم:</Text>
              <Text fontWeight="bold" color="green.600">245</Text>
            </Flex>
            <Flex justify="space-between" w="full">
              <Text color="gray.600">أكثر الأسواق نشاطاً:</Text>
              <Text fontWeight="bold" color="blue.600">سوق الدار البيضاء المركزي</Text>
            </Flex>
            <Flex justify="space-between" w="full">
              <Text color="gray.600">المنتج الأكثر طلباً:</Text>
              <Text fontWeight="bold" color="orange.600">طماطم</Text>
            </Flex>
          </VStack>
        </Box>

        {/* Navigation Buttons */}
        <VStack spacing={3}>
          <Button
            variant="outline"
            colorScheme="blue"
            w="full"
            onClick={() => navigate('/markets')}
          >
            استعراض الأسواق
          </Button>
          <Button
            variant="outline"
            colorScheme="orange"
            w="full"
            onClick={() => navigate('/')}
          >
            العودة للرئيسية
          </Button>
        </VStack>
      </VStack>

      {/* Price Submission Drawer */}
      <SwipeablePriceSubmissionDrawer
        isOpen={isOpen}
        onClose={onClose}
        marketId="default-market"
        marketName="السوق المحلي"
        onSuccess={handleSuccess}
      />
    </Container>
  );
};

export default PriceSubmissionPage;
