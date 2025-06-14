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
  Icon,
  IconProps
} from '@chakra-ui/react';
import ComingSoonModal from '@/components/common/ComingSoonModal';

// Custom modern icons for mobile navigation
const HomeIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
    />
  </Icon>
);

const StoreIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-.74L12 2z"
    />
  </Icon>
);

const PlusIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
    />
  </Icon>
);

const PackageIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12.89 3l-4.95 8.59L6.5 14l5.5 9.5L17.5 14l-1.44-2.41L12.89 3zm-1.44 6l1.44-2.5L14.33 9H9.67l1.44-2.5z"
    />
  </Icon>
);

const UserIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5L12 9.5L9 7.5L3 7V9C3 13.97 6.59 18.15 11.31 18.91L12 19L12.69 18.91C17.41 18.15 21 13.97 21 9Z"
    />
  </Icon>
);

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
      icon: HomeIcon,
      label: 'Home',
      path: '/',
      type: 'link' as const,
    },
    {
      icon: StoreIcon,
      label: 'Markets',
      path: '/markets',
      type: 'link' as const,
    },
    {
      icon: PlusIcon,
      label: 'Submit',
      path: '/submit',
      type: 'fab' as const, // Floating Action Button
    },
    {
      icon: PackageIcon,
      label: 'Products',
      path: '/products',
      type: 'link' as const,
    },
    {
      icon: UserIcon,
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
            const Icon = item.icon;
            
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
                      <Icon boxSize={6} />
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
                
                <Icon 
                  boxSize={isActive ? 6 : 5} 
                  transition="all 0.2s ease"
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
