import React from 'react';
import {
  IconButton,
  Button,
  useDisclosure,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ReportModal } from '../forms/ReportModal';

// Custom icons
const ReportIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17A1.5,1.5 0 0,1 10.5,15.5A1.5,1.5 0 0,1 12,14A1.5,1.5 0 0,1 13.5,15.5A1.5,1.5 0 0,1 12,17M12,10.5A1.5,1.5 0 0,1 10.5,9A1.5,1.5 0 0,1 12,7.5A1.5,1.5 0 0,1 13.5,9A1.5,1.5 0 0,1 12,10.5Z"
    />
  </Icon>
);

interface ReportButtonProps {
  reportType: 'user' | 'market' | 'price';
  targetId: string;
  targetName: string;
  variant?: 'icon' | 'button' | 'menu-item';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: string;
}

export const ReportButton: React.FC<ReportButtonProps> = ({
  reportType,
  targetId,
  targetName,
  variant = 'icon',
  size = 'sm',
  colorScheme = 'gray'
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleReport = () => {
    onOpen();
  };

  if (variant === 'menu-item') {
    return (
      <>
        <MenuItem icon={<ReportIcon />} onClick={handleReport}>
          Report {reportType === 'user' ? 'User' : reportType === 'market' ? 'Market' : 'Price'}
        </MenuItem>
        <ReportModal
          isOpen={isOpen}
          onClose={onClose}
          reportType={reportType}
          targetId={targetId}
          targetName={targetName}
        />
      </>
    );
  }

  if (variant === 'button') {
    return (
      <>
        <Button
          leftIcon={<ReportIcon />}
          colorScheme={colorScheme}
          size={size}
          variant="outline"
          onClick={handleReport}
        >
          Report
        </Button>
        <ReportModal
          isOpen={isOpen}
          onClose={onClose}
          reportType={reportType}
          targetId={targetId}
          targetName={targetName}
        />
      </>
    );
  }

  return (
    <>
      <Tooltip label={`Report ${reportType}`} placement="top">
        <IconButton
          aria-label={`Report ${reportType}`}
          icon={<ReportIcon />}
          colorScheme={colorScheme}
          size={size}
          variant="ghost"
          onClick={handleReport}
        />
      </Tooltip>
      <ReportModal
        isOpen={isOpen}
        onClose={onClose}
        reportType={reportType}
        targetId={targetId}
        targetName={targetName}
      />
    </>
  );
};
