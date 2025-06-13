import React from 'react';
import {
  IconButton,
  Tooltip,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { SwipeablePriceSubmissionDrawer } from '../forms/SwipeablePriceSubmissionDrawer';

interface FloatingActionButtonProps {
  marketId?: string;
  marketName?: string;
  productId?: string;
  label?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  marketId,
  marketName = 'Selected Market',
  productId,
  label = 'Add Price'
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!marketId) {
    return null;
  }

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

      <SwipeablePriceSubmissionDrawer
        isOpen={isOpen}
        onClose={onClose}
        marketId={marketId}
        marketName={marketName}
        preselectedProductId={productId}
      />
    </>
  );
};
