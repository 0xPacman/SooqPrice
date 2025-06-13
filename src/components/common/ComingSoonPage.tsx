import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  Container,
  Icon,
  Badge,
  HStack,
  useColorModeValue,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon: string;
  features?: string[];
  expectedRelease?: string;
  backPath?: string;
  bgGradient?: string;
}

const ComingSoonIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"
    />
  </Icon>
);

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  title,
  description,
  icon,
  features = [],
  expectedRelease = "Phase 2",
  backPath = "/",
  bgGradient = "linear(to-br, green.400, green.600)"
}) => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Back Button */}
        <HStack>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="ghost"
            onClick={() => navigate(backPath)}
            size="sm"
          >
            Back
          </Button>
        </HStack>

        {/* Main Card */}
        <Card boxShadow="xl" overflow="hidden">
          <Box
            bgGradient={bgGradient}
            color="white"
            px={8}
            py={12}
            textAlign="center"
          >
            <VStack spacing={4}>
              <Text fontSize="6xl">{icon}</Text>
              <VStack spacing={2}>
                <Heading size="xl">{title}</Heading>
                <Badge colorScheme="whiteAlpha" variant="solid" px={3} py={1}>
                  Coming Soon
                </Badge>
              </VStack>
            </VStack>
          </Box>

          <CardBody bg={cardBg} px={8} py={8}>
            <VStack spacing={6} align="stretch">
              <Text fontSize="lg" color={textColor} textAlign="center">
                {description}
              </Text>

              {features.length > 0 && (
                <>
                  <Divider />
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md" textAlign="center">
                      What to Expect
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                      {features.map((feature, index) => (
                        <HStack key={index} spacing={3} align="start">
                          <Icon as={ComingSoonIcon} color="green.500" mt={1} />
                          <Text fontSize="sm" color={textColor}>
                            {feature}
                          </Text>
                        </HStack>
                      ))}
                    </SimpleGrid>
                  </VStack>
                </>
              )}

              <Divider />

              <VStack spacing={4}>
                <HStack spacing={2} align="center">
                  <Text fontSize="sm" color={textColor}>
                    Expected in:
                  </Text>
                  <Badge colorScheme="green" variant="subtle">
                    {expectedRelease}
                  </Badge>
                </HStack>

                <VStack spacing={3} w="full">
                  <Button
                    colorScheme="green"
                    size="lg"
                    w="full"
                    maxW="sm"
                    onClick={() => navigate('/')}
                  >
                    Back to Home
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    w="full"
                    maxW="sm"
                    onClick={() => navigate('/markets')}
                  >
                    Browse Markets
                  </Button>
                </VStack>
              </VStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Additional Info */}
        <Card>
          <CardBody textAlign="center">
            <VStack spacing={3}>
              <Text fontSize="sm" color={textColor}>
                <strong>Stay Updated:</strong> Follow our development progress
              </Text>
              <Text fontSize="xs" color="gray.400">
                We're working hard to bring you the best price tracking experience in Morocco
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default ComingSoonPage;
