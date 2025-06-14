import React, { useState } from 'react';
import { 
  Box, 
  HStack, 
  Text, 
  VStack, 
  Circle,
  useColorModeValue
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HiHome,
  HiShoppingBag,
  HiPlus,
  HiUser
} from 'react-icons/hi2';
import { 
  IoStorefront
} from 'react-icons/io5';
import ComingSoonModal from '@/components/common/ComingSoonModal';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const [productsModalOpen, setProductsModalOpen] = useState(false);

  // Animation keyframes for the floating action button
  const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `;

  // Theme colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const shadowColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)');

  const navItems = [
    {
      icon: HiHome,
      label: 'Home',
      path: '/',
      type: 'link' as const,
    },
    {
      icon: IoStorefront,
      label: 'Markets',
      path: '/markets',
      type: 'link' as const,
    },
    {
      icon: HiPlus,
      label: 'Submit',
      path: '/submit',
      type: 'fab' as const, // Floating Action Button
    },
    {
      icon: HiShoppingBag,
      label: 'Products',
      path: '/products',
      type: 'link' as const,
    },
    {
      icon: HiUser,
      label: 'Profile',
      path: '/profile',
      type: 'link' as const,
    },
  ];

  return (
    <>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg={bgColor}
        borderTop="1px"
        borderColor={borderColor}
        boxShadow={`0 -4px 20px ${shadowColor}`}
        zIndex={1000}
        display={{ base: "block", md: "none" }}
        backdropFilter="blur(10px)"
        borderTopRadius="xl"
      >
        {/* Decorative top line */}
        <Box
          h="3px"
          w="60px"
          bg="gray.300"
          mx="auto"
          mt={2}
          borderRadius="full"
        />
        
        <HStack spacing={0} justify="space-around" py={3} px={2}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            
            // Special styling for the floating action button (Submit)
            if (item.type === 'fab') {
              return (
                <Box key={item.path} position="relative" flex={1} display="flex" justifyContent="center">
                  <Circle
                    as={Link}
                    to={item.path}
                    size="56px"
                    bg="linear-gradient(135deg, #48BB78 0%, #38A169 100%)"
                    color="white"
                    boxShadow="0 4px 20px rgba(72, 187, 120, 0.4)"
                    position="relative"
                    top="-8px"
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    _hover={{ 
                      transform: 'translateY(-2px) scale(1.05)',
                      boxShadow: '0 8px 25px rgba(72, 187, 120, 0.6)'
                    }}
                    _active={{ 
                      transform: 'translateY(-1px) scale(0.98)' 
                    }}
                    animation={isActive ? `${pulse} 2s infinite` : undefined}
                  >
                    <VStack spacing={0}>
                      <IconComponent size={24} />
                      <Text fontSize="9px" fontWeight="bold" mt="-1px">
                        {item.label}
                      </Text>
                    </VStack>
                  </Circle>
                </Box>
              );
            }
            
            // Regular navigation items
            return (
              <VStack
                key={item.path}
                as={Link}
                to={item.path}
                spacing={1}
                py={2}
                px={2}
                flex={1}
                align="center"
                color={isActive ? 'green.500' : 'gray.500'}
                transition="all 0.2s ease"
                borderRadius="lg"
                _hover={{ 
                  color: 'green.400',
                  transform: 'translateY(-1px)',
                  bg: useColorModeValue('green.50', 'green.900')
                }}
                _active={{ transform: 'translateY(0px)' }}
                position="relative"
              >
                {/* Active indicator */}
                {isActive && (
                  <Box
                    position="absolute"
                    top="-2px"
                    w="4px"
                    h="4px"
                    bg="green.500"
                    borderRadius="full"
                  />
                )}
                
                <IconComponent 
                  size={isActive ? 24 : 20}
                  style={{ transition: 'all 0.2s ease' }}
                />
                <Text 
                  fontSize="xs" 
                  fontWeight={isActive ? 'bold' : 'medium'}
                  transition="all 0.2s ease"
                >
                  {item.label}
                </Text>
              </VStack>
            );
          })}
        </HStack>
        
        {/* Safe area for iPhone */}
        <Box h="env(safe-area-inset-bottom)" />
      </Box>

      {/* Coming Soon Modal for Products */}
      <ComingSoonModal
        isOpen={productsModalOpen}
        onClose={() => setProductsModalOpen(false)}
        title="Products Directory"
        description="Browse and discover all products with comprehensive price information and market availability."
        icon="📦"
        expectedRelease="Available Now"
        features={[
          "Complete product catalog",
          "Price comparison across markets",
          "Product search and filtering",
          "Detailed product information"
        ]}
      />
    </>
  );
};

export default MobileNavigation;
