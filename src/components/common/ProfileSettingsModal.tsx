import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Text,
  Divider,
  useToast,
  Box,
  Badge,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useAuth } from '@/hooks/useAuth';
import { ImageUpload } from '@/components/common/ImageUpload';
import { ProfileImage } from '@/components/common/OptimizedImage';
import { UploadedImage } from '@/services/imageUpload';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const toast = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<UploadedImage[]>([]);
  const [formData, setFormData] = useState({
    fullName: user?.profile?.fullName || '',
    username: user?.profile?.username || '',
    email: user?.profile?.email || '',
    city: user?.profile?.city || '',
  });

  if (!user?.profile) return null;

  const handleSave = async () => {
    try {
      // Here you would save the profile data to your backend
      // For now, we'll just show a success message
      
      toast({
        title: 'Profile updated successfully!',
        description: 'Your changes have been saved.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setIsEditing(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleProfileImageChange = (images: UploadedImage[]) => {
    setProfileImage(images);
    // Here you would update the user's profile picture in your backend
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack spacing={3}>
            <Text>Profile Settings</Text>
            <Badge colorScheme="blue" variant="subtle">
              Coming Soon - Full Version
            </Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Profile Picture Section */}
            <Box textAlign="center">
              <VStack spacing={4}>
                <Box position="relative">
                  {profileImage.length > 0 ? (
                    <ProfileImage
                      publicId={profileImage[0].publicId}
                      alt="Profile Picture"
                      size="xl"
                    />
                  ) : (
                    <Avatar
                      size="2xl"
                      name={user.profile.fullName}
                      src={user.profile.avatarUrl}
                    />
                  )}
                  
                  <IconButton
                    aria-label="Edit profile picture"
                    icon={<EditIcon />}
                    size="sm"
                    colorScheme="green"
                    borderRadius="full"
                    position="absolute"
                    bottom={2}
                    right={2}
                    onClick={() => setIsEditing(true)}
                  />
                </Box>
                
                <Text fontSize="sm" color="gray.600">
                  Click the edit button to update your profile picture
                </Text>
              </VStack>
            </Box>

            {/* Profile Picture Upload (when editing) */}
            {isEditing && (
              <Box>
                <Text fontWeight="medium" mb={4}>Update Profile Picture</Text>
                <ImageUpload
                  maxImages={1}
                  isProfilePicture={true}
                  existingImages={profileImage}
                  onImagesChange={handleProfileImageChange}
                  userId={user.id}
                />
              </Box>
            )}

            <Divider />

            {/* Basic Information */}
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" fontWeight="semibold">Basic Information</Text>
              
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  isReadOnly={!isEditing}
                  bg={isEditing ? 'white' : 'gray.50'}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  isReadOnly={!isEditing}
                  bg={isEditing ? 'white' : 'gray.50'}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  isReadOnly={!isEditing}
                  bg={isEditing ? 'white' : 'gray.50'}
                />
              </FormControl>

              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  isReadOnly={!isEditing}
                  bg={isEditing ? 'white' : 'gray.50'}
                  placeholder="Enter your city"
                />
              </FormControl>
            </VStack>

            {/* Coming Soon Features */}
            <VStack spacing={3} align="stretch">
              <Text fontSize="lg" fontWeight="semibold">Additional Settings</Text>
              
              <Box p={4} bg="gray.50" borderRadius="md" textAlign="center">
                <VStack spacing={2}>
                  <Text fontSize="sm" color="gray.600">
                    🔔 Notification Preferences
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    🔒 Privacy Settings
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    🎨 Theme & Appearance
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    🔐 Account Security
                  </Text>
                  <Badge colorScheme="orange" variant="subtle" mt={2}>
                    Coming in Phase 2
                  </Badge>
                </VStack>
              </Box>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            
            {!isEditing ? (
              <Button colorScheme="green" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <Button colorScheme="green" onClick={handleSave}>
                Save Changes
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileSettingsModal;
