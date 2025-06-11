import React from 'react';
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Icon,
  IconProps
} from '@chakra-ui/react';

// Custom icons since Chakra UI doesn't have all the icons we need
const HomeIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"
    />
  </Icon>
);

const SearchIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    />
  </Icon>
);

const AddIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
    />
  </Icon>
);

const BellIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
    />
  </Icon>
);

const PersonIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
    />
  </Icon>
);

const MobileNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: HomeIcon,
      label: 'Home',
      path: '/',
    },
    {
      icon: SearchIcon,
      label: 'Markets',
      path: '/markets',
    },
    {
      icon: AddIcon,
      label: 'Submit',
      path: '/submit',
    },
    {
      icon: BellIcon,
      label: 'Activity',
      path: '/activity',
    },
    {
      icon: PersonIcon,
      label: 'Profile',
      path: '/profile',
    },
  ];

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTop="1px"
      borderColor="gray.200"
      boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
      zIndex={1000}
      display={{ base: "block", md: "none" }}
    >
      <HStack spacing={0} justify="space-around" py={2}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <VStack
              key={item.path}
              as={Link}
              to={item.path}
              spacing={1}
              py={2}
              px={3}
              flex={1}
              align="center"
              color={isActive ? 'green.500' : 'gray.500'}
              _hover={{ color: 'green.400' }}
              transition="color 0.2s"
            >
              <Icon boxSize={5} />
              <Text fontSize="xs" fontWeight={isActive ? 'medium' : 'normal'}>
                {item.label}
              </Text>
            </VStack>
          );
        })}
      </HStack>
    </Box>
  );
};

export default MobileNavigation;
