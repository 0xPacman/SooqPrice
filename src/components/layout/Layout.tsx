import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import Header from './Header';
import MobileNavigation from './MobileNavigation';
import { useAuth } from '../../hooks/useAuth';

const Layout: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <Box as="main" pt={{ base: "60px", md: "80px" }} pb={{ base: "80px", md: "40px" }}>
        <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
          <Outlet />
        </Container>
      </Box>
      
      {/* Mobile Navigation - only show when authenticated */}
      {user?.isAuthenticated && <MobileNavigation />}
    </Box>
  );
};

export default Layout;
