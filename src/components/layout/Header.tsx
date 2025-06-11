import React from 'react';
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
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { HamburgerIcon, SearchIcon, BellIcon } from '@chakra-ui/icons';
import { useAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      boxShadow="sm"
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
          <Heading 
            size={{ base: "md", md: "lg" }} 
            color="green.500"
            fontWeight="bold"
          >
            🛒 SooqPrice
          </Heading>
        </Link>

        {/* Desktop Navigation */}
        <HStack spacing={6} display={{ base: "none", md: "flex" }}>
          <Button 
            as={Link} 
            to="/markets" 
            variant="ghost" 
            color="gray.600"
            _hover={{ color: "green.500" }}
          >
            Markets
          </Button>
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            variant="ghost"
            color="gray.600"
            _hover={{ color: "green.500" }}
          />
          {user?.isAuthenticated && (
            <IconButton
              aria-label="Notifications"
              icon={<BellIcon />}
              variant="ghost"
              color="gray.600"
              _hover={{ color: "green.500" }}
            />
          )}
        </HStack>

        {/* User Menu or Login Button */}
        <Box>
          {user?.isAuthenticated ? (
            <Menu>
              <MenuButton>
                <HStack spacing={2}>
                  <Avatar 
                    size="sm" 
                    name={user.profile?.fullName} 
                    src={user.profile?.avatarUrl}
                  />
                  <Box display={{ base: "none", md: "block" }} textAlign="left">
                    <Text fontSize="sm" fontWeight="medium">
                      {user.profile?.fullName}
                    </Text>
                    <HStack spacing={1}>
                      <Text fontSize="xs" color="gray.500">
                        {user.profile?.reputationScore} pts
                      </Text>
                      {user.profile?.isVerified && (
                        <Badge size="xs" colorScheme="green">
                          ✓
                        </Badge>
                      )}
                    </HStack>
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem as={Link} to="/profile?tab=submissions">
                  My Submissions
                </MenuItem>
                <MenuItem as={Link} to="/profile?tab=rewards">
                  Rewards
                </MenuItem>
                {user.profile?.isAdmin && (
                  <>
                    <MenuDivider />
                    <MenuItem as={Link} to="/admin">
                      Admin Dashboard
                    </MenuItem>
                  </>
                )}
                <MenuDivider />
                <MenuItem onClick={handleLogout} color="red.500">
                  Logout
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
              >
                Login
              </Button>
              <Button 
                variant="solid" 
                size="sm"
                as={Link}
                to="/register"
              >
                Join Now
              </Button>
            </HStack>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading size="md" color="green.500">
              SooqPrice
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {user?.isAuthenticated ? (
                <>
                  <Box p={4} bg="gray.50" borderRadius="lg">
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
                  
                  <Button as={Link} to="/markets" variant="ghost" onClick={onClose}>
                    Markets
                  </Button>
                  <Button as={Link} to="/profile" variant="ghost" onClick={onClose}>
                    Profile
                  </Button>
                  <Button as={Link} to="/profile?tab=submissions" variant="ghost" onClick={onClose}>
                    My Submissions
                  </Button>
                  <Button as={Link} to="/profile?tab=rewards" variant="ghost" onClick={onClose}>
                    Rewards
                  </Button>
                  
                  {user.profile?.isAdmin && (
                    <Button as={Link} to="/admin" variant="ghost" onClick={onClose}>
                      Admin Dashboard
                    </Button>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    color="red.500" 
                    onClick={() => {
                      handleLogout();
                      onClose();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button as={Link} to="/markets" variant="ghost" onClick={onClose}>
                    Markets
                  </Button>
                  <Button as={Link} to="/login" variant="ghost" onClick={onClose}>
                    Login
                  </Button>
                  <Button as={Link} to="/register" variant="solid" onClick={onClose}>
                    Join Now
                  </Button>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
