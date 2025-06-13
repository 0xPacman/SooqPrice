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
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { HamburgerIcon, SearchIcon, BellIcon } from '@chakra-ui/icons';
import { useAuth } from '@/hooks/useAuth';
import ComingSoonModal from '@/components/common/ComingSoonModal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [rewardsModalOpen, setRewardsModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

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
            onClick={() => setSearchModalOpen(true)}
          />
          {user?.isAuthenticated && (
            <IconButton
              aria-label="Notifications"
              icon={<BellIcon />}
              variant="ghost"
              color="gray.600"
              _hover={{ color: "green.500" }}
              onClick={() => setNotificationModalOpen(true)}
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
                  👤 Profile
                </MenuItem>
                <MenuItem as={Link} to="/profile?tab=submissions">
                  📊 My Submissions
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => setSettingsModalOpen(true)}>
                  ⚙️ Profile Settings
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
                    🏪 Markets
                  </Button>
                  <Button as={Link} to="/profile" variant="ghost" onClick={onClose}>
                    👤 Profile
                  </Button>
                  <Button as={Link} to="/profile?tab=submissions" variant="ghost" onClick={onClose}>
                    📊 My Submissions
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setSettingsModalOpen(true);
                      onClose();
                    }}
                  >
                    ⚙️ Profile Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setNotificationModalOpen(true);
                      onClose();
                    }}
                  >
                    🔔 Notifications
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setRewardsModalOpen(true);
                      onClose();
                    }}
                  >
                    🏆 Rewards & Achievements
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

      {/* Coming Soon Modals */}
      <ComingSoonModal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        title="Notifications & Alerts"
        description="Get instant notifications about price changes, market updates, and community activities."
        icon="🔔"
        expectedRelease="Phase 2"
        features={[
          "Price drop alerts for your favorite products",
          "New market opening notifications",
          "Weekly price comparison reports",
          "Reward and badge achievement alerts"
        ]}
      />

      <ComingSoonModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        title="Advanced Search"
        description="Search for specific products, markets, and prices with advanced filtering options."
        icon="🔍"
        expectedRelease="Phase 2"
        features={[
          "Product-specific search and filtering",
          "Market and location-based search",
          "Price range and quality filters",
          "Recent submissions and trends"
        ]}
      />

      <ComingSoonModal
        isOpen={rewardsModalOpen}
        onClose={() => setRewardsModalOpen(false)}
        title="Rewards & Leaderboard"
        description="Earn points, climb the leaderboard, and get rewarded for your contributions to the community."
        icon="🏆"
        expectedRelease="Phase 3"
        features={[
          "Monthly leaderboard competitions",
          "Reputation points and badges system",
          "Exclusive rewards for top contributors",
          "Achievement unlocks and milestones"
        ]}
      />

      <ComingSoonModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        title="Profile Settings"
        description="Customize your profile, manage account preferences, and control privacy settings."
        icon="⚙️"
        expectedRelease="Phase 2"
        features={[
          "Profile information management",
          "Privacy and notification preferences",
          "Account security settings",
          "Language and region preferences"
        ]}
      />
    </Box>
  );
};

export default Header;
