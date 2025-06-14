import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Text,
  Badge,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Circle,
} from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HamburgerIcon, SearchIcon, BellIcon } from '@chakra-ui/icons';
import { useAuth } from '../../hooks/useAuth';
import ComingSoonModal from '../common/ComingSoonModal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [rewardsModalOpen, setRewardsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Theme colors
  const headerBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const searchBg = useColorModeValue('gray.50', 'gray.700');
  const navButtonColor = useColorModeValue('gray.600', 'gray.300');
  const navButtonHoverColor = useColorModeValue('green.500', 'green.400');
  const navButtonActiveBg = useColorModeValue('green.50', 'green.900');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  // Custom navigation items with modern styling
  const NavButton = ({ 
    to, 
    children, 
    icon, 
    isActive = false 
  }: { 
    to: string; 
    children: React.ReactNode; 
    icon?: React.ReactNode; 
    isActive?: boolean;
  }) => (
    <Button
      as={Link}
      to={to}
      variant="ghost"
      color={isActive ? navButtonHoverColor : navButtonColor}
      bg={isActive ? navButtonActiveBg : 'transparent'}
      _hover={{ 
        color: navButtonHoverColor, 
        bg: navButtonActiveBg,
        transform: 'translateY(-1px)'
      }}
      _active={{
        transform: 'translateY(0)'
      }}
      transition="all 0.2s ease"
      fontWeight="medium"
      fontSize="sm"
      leftIcon={icon}
      borderRadius="lg"
      px={4}
      py={2}
      h="auto"
    >
      {children}
    </Button>
  );

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={headerBg}
      borderBottom="1px"
      borderColor={borderColor}
      boxShadow="sm"
      backdropFilter="blur(10px)"
      bgGradient={useColorModeValue(
        'linear(to-r, white, gray.50)',
        'linear(to-r, gray.800, gray.900)'
      )}
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={{ base: 3, md: 4 }}
        align="center"
        justify="space-between"
        h={{ base: "60px", md: "80px" }}
      >
        {/* Logo */}
        <Link to="/">
          <HStack spacing={3}>
            <Box
              w="40px"
              h="40px"
              _hover={{ transform: 'scale(1.05)' }}
              transition="transform 0.2s ease"
            >
              <img 
                src="/logo.svg" 
                alt="SooqPrice Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
            <Heading 
              size={{ base: "md", md: "lg" }} 
              color="green.500"
              fontWeight="bold"
              display={{ base: "none", sm: "block" }}
            >
              SooqPrice
            </Heading>
          </HStack>
        </Link>

        {/* Desktop Navigation */}
        <HStack spacing={8} display={{ base: "none", lg: "flex" }} flex={1} justify="center">
          <NavButton 
            to="/markets" 
            icon={<Text fontSize="lg">🏪</Text>}
            isActive={location.pathname === '/markets'}
          >
            Markets
          </NavButton>
          
          <NavButton 
            to="/products" 
            icon={<Text fontSize="lg">📦</Text>}
            isActive={location.pathname === '/products'}
          >
            Products
          </NavButton>

          {/* Enhanced Search Bar */}
          <Box minW="300px" maxW="400px">
            <form onSubmit={handleSearch}>
              <InputGroup size="md">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search products, markets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  bg={searchBg}
                  border="1px"
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                  borderRadius="full"
                  _hover={{ borderColor: 'green.300' }}
                  _focus={{ 
                    borderColor: 'green.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-green-500)'
                  }}
                  fontSize="sm"
                />
              </InputGroup>
            </form>
          </Box>

          {/* Notifications Button */}
          {user?.isAuthenticated && (
            <Box position="relative">
              <IconButton
                aria-label="Notifications"
                icon={<BellIcon />}
                variant="ghost"
                color={navButtonColor}
                bg="transparent"
                _hover={{ 
                  color: navButtonHoverColor, 
                  bg: navButtonActiveBg,
                  transform: 'translateY(-1px)'
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                transition="all 0.2s ease"
                onClick={() => setNotificationModalOpen(true)}
                size="md"
                borderRadius="lg"
              />
              {/* Notification Badge */}
              <Circle
                size="6px"
                bg="red.500"
                position="absolute"
                top="8px"
                right="8px"
                border="2px solid"
                borderColor={headerBg}
              />
            </Box>
          )}
        </HStack>

        {/* Mobile Menu & User Menu */}
        <HStack spacing={3}>
          {/* Mobile Search Button */}
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            variant="ghost"
            color={navButtonColor}
            _hover={{ color: navButtonHoverColor }}
            onClick={() => setSearchModalOpen(true)}
            display={{ base: "flex", lg: "none" }}
            size="md"
            borderRadius="lg"
          />

          {/* Mobile Menu */}
          <IconButton
            aria-label="Menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            color={navButtonColor}
            _hover={{ color: navButtonHoverColor }}
            onClick={onOpen}
            display={{ base: "flex", lg: "none" }}
            size="md"
            borderRadius="lg"
          />

          {/* User Menu or Login Button */}
          <Box>
            {user?.isAuthenticated ? (
              <Menu>
                <MenuButton>
                  <HStack spacing={3}>
                    <Avatar 
                      size="sm" 
                      name={user.profile?.fullName} 
                      src={user.profile?.avatarUrl}
                      border="2px solid"
                      borderColor="green.100"
                      _hover={{ borderColor: 'green.300' }}
                      transition="border-color 0.2s ease"
                    />
                    <Box display={{ base: "none", md: "block" }} textAlign="left">
                      <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('gray.800', 'white')}>
                        {user.profile?.fullName}
                      </Text>
                      <HStack spacing={1}>
                        <Text fontSize="xs" color="gray.500">
                          {user.profile?.reputationScore} pts
                        </Text>
                        {user.profile?.isVerified && (
                          <Badge size="xs" colorScheme="green" borderRadius="full">
                            ✓
                          </Badge>
                        )}
                      </HStack>
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to="/profile">
                    👤 Profile
                  </MenuItem>
                  <MenuItem as={Link} to="/profile?tab=submissions">
                    📊 My Submissions
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as={Link} to="/settings/account">
                    ⚙️ Account Settings
                  </MenuItem>
                  <MenuItem onClick={() => setNotificationModalOpen(true)}>
                    🔔 Notifications
                  </MenuItem>
                  <MenuItem onClick={() => setRewardsModalOpen(true)}>
                    🏆 Rewards & Achievements
                  </MenuItem>
                  {user.profile?.isAdmin && (
                    <>
                      <MenuDivider />
                      <MenuItem as={Link} to="/admin">
                        👑 Admin Dashboard
                      </MenuItem>
                    </>
                  )}
                  <MenuDivider />
                  <MenuItem onClick={handleLogout} color="red.500">
                    🚪 Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing={2}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogin}
                  display={{ base: "none", md: "inline-flex" }}
                  color={navButtonColor}
                  _hover={{ color: navButtonHoverColor }}
                  borderRadius="lg"
                >
                  Login
                </Button>
                <Button 
                  variant="solid" 
                  size="sm"
                  as={Link}
                  to="/register"
                  colorScheme="green"
                  borderRadius="lg"
                  _hover={{ transform: 'translateY(-1px)' }}
                  _active={{ transform: 'translateY(0)' }}
                  transition="all 0.2s ease"
                >
                  Join Now
                </Button>
              </HStack>
            )}
          </Box>
        </HStack>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack spacing={3}>
              <Box w="32px" h="32px">
                <img 
                  src="/logo.svg" 
                  alt="SooqPrice Logo" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
              <Heading size="md" color="green.500">
                SooqPrice
              </Heading>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {user?.isAuthenticated ? (
                <>
                  <Box p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                    <HStack spacing={3}>
                      <Avatar 
                        size="md" 
                        name={user.profile?.fullName} 
                        src={user.profile?.avatarUrl}
                      />
                      <Box>
                        <Text fontWeight="medium">
                          {user.profile?.fullName}
                        </Text>
                        <HStack spacing={2}>
                          <Text fontSize="sm" color="gray.500">
                            {user.profile?.reputationScore} pts
                          </Text>
                          {user.profile?.isVerified && (
                            <Badge size="sm" colorScheme="green">
                              Verified
                            </Badge>
                          )}
                        </HStack>
                      </Box>
                    </HStack>
                  </Box>
                  
                  <Button as={Link} to="/markets" variant="ghost" onClick={onClose} justifyContent="flex-start">
                    🏪 Markets
                  </Button>
                  <Button as={Link} to="/products" variant="ghost" onClick={onClose} justifyContent="flex-start">
                    📦 Products
                  </Button>
                  <Button as={Link} to="/profile" variant="ghost" onClick={onClose} justifyContent="flex-start">
                    👤 Profile
                  </Button>
                  <Button as={Link} to="/profile?tab=submissions" variant="ghost" onClick={onClose} justifyContent="flex-start">
                    📊 My Submissions
                  </Button>
                  <Button as={Link} to="/settings/account" variant="ghost" onClick={onClose} justifyContent="flex-start">
                    ⚙️ Settings
                  </Button>
                  <Button onClick={() => { setNotificationModalOpen(true); onClose(); }} variant="ghost" justifyContent="flex-start">
                    🔔 Notifications
                  </Button>
                  {user.profile?.isAdmin && (
                    <Button as={Link} to="/admin" variant="ghost" onClick={onClose} justifyContent="flex-start">
                      👑 Admin
                    </Button>
                  )}
                  <Button onClick={() => { handleLogout(); onClose(); }} variant="ghost" color="red.500" justifyContent="flex-start">
                    🚪 Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button as={Link} to="/markets" variant="ghost" onClick={onClose} justifyContent="flex-start">
                    🏪 Markets
                  </Button>
                  <Button as={Link} to="/products" variant="ghost" onClick={onClose} justifyContent="flex-start">
                    📦 Products
                  </Button>
                  <Button onClick={() => { handleLogin(); onClose(); }} variant="ghost" justifyContent="flex-start">
                    🔑 Login
                  </Button>
                  <Button as={Link} to="/register" colorScheme="green" onClick={onClose}>
                    ✨ Join Now
                  </Button>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Search Modal */}
      <ComingSoonModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
        title="Advanced Search"
        message="Advanced search functionality is coming soon! For now, use the search bar in the header."
      />

      {/* Notifications Modal */}
      <ComingSoonModal 
        isOpen={notificationModalOpen} 
        onClose={() => setNotificationModalOpen(false)} 
        title="Notifications"
        message="Real-time notifications are coming soon! Stay tuned for updates on your price submissions and market activities."
      />

      {/* Rewards Modal */}
      <ComingSoonModal 
        isOpen={rewardsModalOpen} 
        onClose={() => setRewardsModalOpen(false)} 
        title="Rewards & Achievements"
        message="The rewards system is coming soon! Earn points and unlock achievements by contributing accurate price data."
      />
    </Box>
  );
};

export default Header;
