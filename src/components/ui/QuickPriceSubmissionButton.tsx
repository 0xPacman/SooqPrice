import React from 'react';
import {
  IconButton,
  Tooltip,
  useDisclosure,
  Box,
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
  Select,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { mockMarkets, mockCities } from '../../utils/mockData';
import { SwipeablePriceSubmissionDrawer } from '../forms/SwipeablePriceSubmissionDrawer';

interface QuickPriceSubmissionButtonProps {
  label?: string;
}

export const QuickPriceSubmissionButton: React.FC<QuickPriceSubmissionButtonProps> = ({
  label = 'Quick Price Submission'
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPriceModalOpen, onOpen: onPriceModalOpen, onClose: onPriceModalClose } = useDisclosure();
  const [selectedMarketId, setSelectedMarketId] = useState('');
  const toast = useToast();

  const handleMarketSelect = () => {
    if (!selectedMarketId) {
      toast({
        title: 'Please select a market',
        description: 'You need to select a market before submitting a price.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    onClose();
    onPriceModalOpen();
  };

  const handleClose = () => {
    setSelectedMarketId('');
    onClose();
  };

  const selectedMarket = mockMarkets.find(m => m.id === selectedMarketId);

  return (
    <>
      <Box
        position="fixed"
        bottom="80px" // Above mobile navigation
        right="4"
        zIndex={1000}
      >
        <Tooltip label={label} placement="left">
          <IconButton
            aria-label={label}
            icon={<AddIcon />}
            colorScheme="green"
            size="lg"
            borderRadius="full"
            boxShadow="lg"
            onClick={onOpen}
            _hover={{
              transform: 'scale(1.1)',
              boxShadow: 'xl',
            }}
            transition="all 0.2s"
            bg="green.500"
            color="white"
            w="60px"
            h="60px"
          />
        </Tooltip>
      </Box>

      {/* Market Selection Modal */}
      <Modal isOpen={isOpen} onClose={handleClose} size="md" isCentered>
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <ModalContent mx={4}>
          <ModalHeader>Select Market</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text color="gray.600">
                Choose a market where you want to submit a price:
              </Text>
              
              <FormControl>
                <FormLabel>Market</FormLabel>
                <Select
                  placeholder="Select a market"
                  value={selectedMarketId}
                  onChange={(e) => setSelectedMarketId(e.target.value)}
                >
                  {mockCities.map(city => (
                    <optgroup key={city.id} label={city.name}>
                      {mockMarkets
                        .filter(market => market.cityId === city.id)
                        .map(market => (
                          <option key={market.id} value={market.id}>
                            {market.name} - {market.address}
                          </option>
                        ))
                      }
                    </optgroup>
                  ))}
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleMarketSelect}>
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Price Submission Drawer */}
      {selectedMarket && (
        <SwipeablePriceSubmissionDrawer
          isOpen={isPriceModalOpen}
          onClose={onPriceModalClose}
          marketId={selectedMarket.id}
          marketName={selectedMarket.name}
        />
      )}
    </>
  );
};
