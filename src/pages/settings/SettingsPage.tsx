import React, { useState } from 'react';
import {
  Container,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Select,
  HStack,
  Badge,
  Alert,
  AlertIcon,
  IconButton,
  SimpleGrid,
  Box,
  Divider,
} from '@chakra-ui/react';
import { ArrowBackIcon, BellIcon, SettingsIcon, StarIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import ComingSoonModal from '../../components/common/ComingSoonModal';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentLanguage, t } = useLanguage();
  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {    const selectedLanguage = event.target.value;
    if (selectedLanguage !== 'en') {
      // Show coming soon message for non-English languages
      alert(`${selectedLanguage === 'ar' ? 'Arabic' : 'French'} - Coming soon! Arabic and French language support will be available in Phase 2.`);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack>
          <IconButton
            aria-label="Back to Profile"
            icon={<ArrowBackIcon />}
            variant="ghost"
            onClick={() => navigate('/profile')}
          />
          <VStack align="start" spacing={1} flex={1}>
            <Heading size="lg">Settings & Preferences</Heading>
            <Text color="gray.600">Customize your SooqPrice experience</Text>
          </VStack>
        </HStack>

        {/* Language Settings */}
        <Card>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="md">🌍 Language Settings</Heading>
              <FormControl>
                <FormLabel>Preferred Language</FormLabel>                <Select value={currentLanguage} onChange={handleLanguageChange}>
                  <option value="en">English</option>
                  <option value="ar">Arabic - Coming Soon</option>
                  <option value="fr">French - Coming Soon</option>
                </Select>
              </FormControl>
              <Alert status="info" size="sm">
                <AlertIcon />
                <Box>
                  <Text fontSize="sm">
                    <strong>Current:</strong> {t('language.current')}
                  </Text>
                  <Text fontSize="xs" color="gray.600" mt={1}>
                    Arabic and French translations will be available in Phase 2
                  </Text>
                </Box>
              </Alert>
            </VStack>
          </CardBody>
        </Card>

        {/* Settings Categories */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Card 
            cursor="pointer" 
            _hover={{ shadow: "md", transform: "translateY(-2px)" }}
            transition="all 0.2s"
            onClick={() => setNotificationsModalOpen(true)}
          >
            <CardBody textAlign="center">
              <VStack spacing={3}>
                <BellIcon boxSize={8} color="blue.500" />
                <Heading size="sm">Notifications</Heading>
                <Text fontSize="sm" color="gray.600">
                  Manage alerts and notifications
                </Text>
                <Badge colorScheme="yellow">Coming Soon</Badge>
              </VStack>
            </CardBody>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ shadow: "md", transform: "translateY(-2px)" }}
            transition="all 0.2s"
            onClick={() => setPrivacyModalOpen(true)}
          >
            <CardBody textAlign="center">              <VStack spacing={3}>
                <SettingsIcon boxSize={8} color="green.500" />
                <Heading size="sm">Privacy</Heading>
                <Text fontSize="sm" color="gray.600">
                  Control your data and privacy
                </Text>
                <Badge colorScheme="yellow">Coming Soon</Badge>
              </VStack>
            </CardBody>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ shadow: "md", transform: "translateY(-2px)" }}
            transition="all 0.2s"
            onClick={() => setThemeModalOpen(true)}
          >
            <CardBody textAlign="center">              <VStack spacing={3}>
                <StarIcon boxSize={8} color="purple.500" />
                <Heading size="sm">Appearance</Heading>
                <Text fontSize="sm" color="gray.600">
                  Customize theme and display
                </Text>
                <Badge colorScheme="yellow">Coming Soon</Badge>
              </VStack>
            </CardBody>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ shadow: "md", transform: "translateY(-2px)" }}
            transition="all 0.2s"
            onClick={() => setAccountModalOpen(true)}
          >
            <CardBody textAlign="center">
              <VStack spacing={3}>
                <Box fontSize="2xl">👤</Box>
                <Heading size="sm">Account</Heading>
                <Text fontSize="sm" color="gray.600">
                  Manage account security
                </Text>
                <Badge colorScheme="yellow">Coming Soon</Badge>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Divider />

        {/* Current Features Note */}
        <Alert status="info">
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">Phase 1 - Basic Features</Text>
            <Text fontSize="sm">
              Most settings features are planned for Phase 2. Currently available: Language selection (English only)
            </Text>
          </Box>
        </Alert>
      </VStack>      {/* Coming Soon Modals */}
      <ComingSoonModal
        isOpen={notificationsModalOpen}
        onClose={() => setNotificationsModalOpen(false)}
        title="Notification Settings"
        description="Control when and how you receive notifications about price changes, market updates, and community activities"
        icon="🔔"
        expectedRelease="Phase 2 - Coming Soon"
      />

      <ComingSoonModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        title="Privacy & Data Controls"
        description="Manage your data sharing preferences, export personal data, and control profile visibility"
        icon="🛡️"
        expectedRelease="Phase 2 - Coming Soon"
      />

      <ComingSoonModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        title="Appearance & Theme"
        description="Customize the app's appearance with dark mode, font size preferences, and color themes"
        icon="🎨"
        expectedRelease="Phase 2 - Coming Soon"
      />

      <ComingSoonModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        title="Account Security"
        description="Change password, enable two-factor authentication, and manage connected accounts"
        icon="🔐"
        expectedRelease="Phase 2 - Coming Soon"
      />
    </Container>
  );
};

export default SettingsPage;
