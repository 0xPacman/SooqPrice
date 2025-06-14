import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  IconButton,
  Divider,  Select,
  useColorModeValue,
  useToast,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,  SimpleGrid,
  Icon,
} from '@chakra-ui/react';
import { ArrowBackIcon, EditIcon, LockIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ImageUpload } from '@/components/common/ImageUpload';
import { UploadedImage } from '@/services/imageUpload';

// Custom icons
const PersonIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
    />
  </Icon>
);

const LocationIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22S19,14.25 19,9C19,5.13 15.87,2 12,2M12,11.5C10.62,11.5 9.5,10.38 9.5,9C9.5,7.62 10.62,6.5 12,6.5C13.38,6.5 14.5,7.62 14.5,9C14.5,10.38 13.38,11.5 12,11.5Z"
    />
  </Icon>
);

const SecurityIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V17H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"
    />
  </Icon>
);

const DeleteIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
    />
  </Icon>
);

const AccountSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  
  // Modals
  const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onClose: onPasswordModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  
  // Form states
  const [profileImage, setProfileImage] = useState<UploadedImage[]>([]);
  const [formData, setFormData] = useState({
    fullName: user?.profile?.fullName || '',
    email: user?.profile?.email || '',
    location: user?.profile?.city || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Theme colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgGradient = useColorModeValue(
    'linear(to-br, green.50, blue.50)',
    'linear(to-br, green.900, blue.900)'
  );

  if (!user?.isAuthenticated) {
    return <div>Please log in to access account settings.</div>;
  }

  const handleProfileSave = async () => {
    setIsLoading(true);
    try {
      // Here you would save the profile data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: 'Profile updated successfully!',
        description: 'Your profile changes have been saved.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setIsEditingProfile(false);
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'New password and confirmation do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 8 characters long.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Here you would change the password via your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: 'Password changed successfully!',
        description: 'Your password has been updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      onPasswordModalClose();
    } catch (error) {
      toast({
        title: 'Password change failed',
        description: 'Please check your current password and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      // Here you would disable/delete the account via your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: 'Account deactivated',
        description: 'Your account has been successfully deactivated.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      
      // Navigate to home or login page
      navigate('/');
    } catch (error) {
      toast({
        title: 'Account deactivation failed',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      onDeleteModalClose();
    }
  };

  const handleProfileImageChange = (images: UploadedImage[]) => {
    setProfileImage(images);
  };

  return (
    <Box bgGradient={bgGradient} minH="100vh" py={8}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <HStack spacing={4} mb={4}>
            <IconButton
              as={Link}
              to="/profile"
              aria-label="Back to profile"
              icon={<ArrowBackIcon />}
              variant="ghost"
              size="lg"
            />
            <Heading size="xl" color="green.600">
              Account Settings
            </Heading>
          </HStack>

          {/* Profile Information Card */}
          <Card bg={cardBg} borderColor={borderColor}>
            <CardHeader>
              <HStack justify="space-between">
                <HStack spacing={3}>
                  <PersonIcon boxSize={6} color="green.500" />
                  <Heading size="md">Profile Information</Heading>
                </HStack>
                <IconButton
                  aria-label="Edit profile"
                  icon={<EditIcon />}
                  size="sm"
                  colorScheme="green"
                  variant="ghost"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                />
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                {/* Profile Picture */}
                <Box textAlign="center">
                  <VStack spacing={4}>
                    <Box position="relative">
                      <Avatar
                        size="2xl"
                        name={formData.fullName}
                        src={user.profile?.avatarUrl}
                      />
                      {isEditingProfile && (
                        <IconButton
                          aria-label="Edit profile picture"
                          icon={<EditIcon />}
                          size="sm"
                          colorScheme="green"
                          borderRadius="full"
                          position="absolute"
                          bottom={2}
                          right={2}
                        />
                      )}
                    </Box>
                    
                    {isEditingProfile && (
                      <Box maxW="md">
                        <Text fontSize="sm" color="gray.600" mb={3}>
                          Update your profile picture
                        </Text>
                        <ImageUpload
                          maxImages={1}
                          isProfilePicture={true}
                          existingImages={profileImage}
                          onImagesChange={handleProfileImageChange}
                          userId={user.id}
                        />
                      </Box>
                    )}
                  </VStack>
                </Box>

                <Divider />

                {/* Form Fields */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      isReadOnly={!isEditingProfile}
                      bg={isEditingProfile ? 'white' : 'gray.50'}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      isReadOnly={!isEditingProfile}
                      bg={isEditingProfile ? 'white' : 'gray.50'}
                      type="email"
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel>
                    <HStack>
                      <LocationIcon boxSize={4} />
                      <Text>Location</Text>
                    </HStack>
                  </FormLabel>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    isReadOnly={!isEditingProfile}
                    bg={isEditingProfile ? 'white' : 'gray.50'}
                    placeholder="Enter your city/location"
                  />
                </FormControl>

                {isEditingProfile && (
                  <HStack spacing={3} justify="flex-end">
                    <Button
                      variant="ghost"
                      onClick={() => setIsEditingProfile(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      colorScheme="green"
                      onClick={handleProfileSave}
                      isLoading={isLoading}
                    >
                      Save Changes
                    </Button>
                  </HStack>
                )}
              </VStack>
            </CardBody>
          </Card>

          {/* Security Settings Card */}
          <Card bg={cardBg} borderColor={borderColor}>
            <CardHeader>
              <HStack spacing={3}>
                <SecurityIcon boxSize={6} color="blue.500" />
                <Heading size="md">Security Settings</Heading>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">Password</Text>
                    <Text fontSize="sm" color="gray.600">
                      Change your account password
                    </Text>
                  </VStack>
                  <Button
                    leftIcon={<LockIcon />}
                    colorScheme="blue"
                    variant="outline"
                    onClick={onPasswordModalOpen}
                  >
                    Change Password
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Language & Theme Settings Card */}
          <Card bg={cardBg} borderColor={borderColor}>
            <CardHeader>
              <HStack spacing={3}>
                <Icon viewBox="0 0 24 24" boxSize={6} color="purple.500">
                  <path
                    fill="currentColor"
                    d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07Z"
                  />
                </Icon>
                <Heading size="md">Preferences</Heading>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">Language</Text>
                    <Text fontSize="sm" color="gray.600">
                      Choose your preferred language
                    </Text>
                  </VStack>
                  <HStack>
                    <Select value="en" isDisabled width="150px">
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                    </Select>
                    <Badge colorScheme="orange" variant="subtle">
                      Coming Soon
                    </Badge>
                  </HStack>
                </HStack>

                <Divider />

                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">Theme</Text>
                    <Text fontSize="sm" color="gray.600">
                      Switch between light and dark mode
                    </Text>
                  </VStack>
                  <HStack>
                    <Select value="system" isDisabled width="150px">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </Select>
                    <Badge colorScheme="orange" variant="subtle">
                      Coming Soon
                    </Badge>
                  </HStack>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Danger Zone Card */}
          <Card bg={cardBg} borderColor="red.200" borderWidth="2px">
            <CardHeader>
              <HStack spacing={3}>
                <DeleteIcon boxSize={6} color="red.500" />
                <Heading size="md" color="red.500">Danger Zone</Heading>
              </HStack>
            </CardHeader>
            <CardBody>
              <Alert status="warning" borderRadius="md" mb={4}>
                <AlertIcon />
                <Box>
                  <AlertTitle>Account Deactivation</AlertTitle>
                  <AlertDescription>
                    This action will deactivate your account. You can reactivate it by logging in again.
                  </AlertDescription>
                </Box>
              </Alert>

              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontWeight="medium">Disable Account</Text>
                  <Text fontSize="sm" color="gray.600">
                    Temporarily disable your account
                  </Text>
                </VStack>
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={onDeleteModalOpen}
                  leftIcon={<DeleteIcon />}
                >
                  Disable Account
                </Button>
              </HStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>

      {/* Change Password Modal */}
      <Modal isOpen={isPasswordModalOpen} onClose={onPasswordModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Current Password</FormLabel>
                <Input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                />
              </FormControl>

              <Alert status="info" size="sm">
                <AlertIcon />
                <Text fontSize="sm">
                  Password must be at least 8 characters long.
                </Text>
              </Alert>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onPasswordModalClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handlePasswordChange}
              isLoading={isLoading}
              isDisabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            >
              Change Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Account Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red.500">Disable Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Alert status="warning">
                <AlertIcon />
                <Box>
                  <AlertTitle>Are you sure?</AlertTitle>
                  <AlertDescription>
                    This will temporarily disable your account. You can reactivate it by logging in again.
                    Your data will be preserved.
                  </AlertDescription>
                </Box>
              </Alert>

              <Text fontSize="sm" color="gray.600">
                This action will:
              </Text>
              <VStack align="start" spacing={1} w="full">
                <Text fontSize="sm">• Disable access to your account</Text>
                <Text fontSize="sm">• Hide your profile from other users</Text>
                <Text fontSize="sm">• Preserve your data for reactivation</Text>
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDeleteModalClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDeleteAccount}
              isLoading={isLoading}
            >
              Disable Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AccountSettingsPage;
