import React from 'react';
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
  Text,
  Icon,
  Badge,
  HStack,
  useColorModeValue,
  Divider,
  Box,
} from '@chakra-ui/react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: string;
  expectedRelease?: string;
  features?: string[];
}

const ComingSoonIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"
    />
  </Icon>
);

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  expectedRelease = "Phase 2",
  features = []
}) => {
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent mx={4}>
        <ModalHeader textAlign="center" pb={2}>
          <VStack spacing={3}>
            <Text fontSize="4xl">{icon}</Text>
            <VStack spacing={1}>
              <Text fontSize="lg" fontWeight="bold">{title}</Text>
              <Badge colorScheme="green" variant="subtle" px={3} py={1}>
                Coming Soon
              </Badge>
            </VStack>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="sm" color={textColor} textAlign="center">
              {description}
            </Text>

            {features.length > 0 && (
              <>
                <Divider />
                <VStack align="stretch" spacing={3}>
                  <Text fontSize="sm" fontWeight="medium" textAlign="center">
                    What to Expect:
                  </Text>
                  <VStack align="stretch" spacing={2}>
                    {features.slice(0, 4).map((feature, index) => (
                      <HStack key={index} spacing={2} align="start">
                        <Icon as={ComingSoonIcon} color="green.500" mt={0.5} boxSize={3} />
                        <Text fontSize="xs" color={textColor}>
                          {feature}
                        </Text>
                      </HStack>
                    ))}
                    {features.length > 4 && (
                      <Text fontSize="xs" color="gray.400" textAlign="center" fontStyle="italic">
                        ...and {features.length - 4} more features
                      </Text>
                    )}
                  </VStack>
                </VStack>
              </>
            )}

            <Divider />
            
            <Box textAlign="center">
              <HStack spacing={2} justify="center" align="center">
                <Text fontSize="xs" color={textColor}>
                  Expected in:
                </Text>
                <Badge colorScheme="green" variant="subtle" size="sm">
                  {expectedRelease}
                </Badge>
              </HStack>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter pt={2}>
          <VStack spacing={2} w="full">
            <Button colorScheme="green" onClick={onClose} w="full">
              Got it!
            </Button>
            <Text fontSize="xs" color="gray.400" textAlign="center">
              We're working hard to bring you these features
            </Text>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ComingSoonModal;
