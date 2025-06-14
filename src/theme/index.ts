import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Color palette based on white, light yellow, and green
const colors = {
  sooq: {
    50: '#f7fafc',   // Very light gray
    100: '#fff9e6',  // Light yellow
    200: '#fef3cd',  // Lighter yellow
    300: '#fde68a',  // Yellow
    400: '#f59e0b',  // Amber
    500: '#d97706',  // Orange (accent)
    600: '#92400e',  // Dark orange
    700: '#78350f',  // Darker orange
    800: '#451a03',  // Very dark orange
    900: '#1c0a00',  // Almost black
  },
  green: {
    50: '#f0fff4',   // Very light green
    100: '#dcfce7',  // Light green
    200: '#bbf7d0',  // Lighter green
    300: '#86efac',  // Light-medium green
    400: '#4ade80',  // Medium green
    500: '#4A9B3B',  // Primary green (main brand color)
    600: '#2D5E1F',  // Dark green (hover states)
    700: '#15803d',  // Darker green
    800: '#166534',  // Very dark green
    900: '#14532d',  // Almost black green
  },
  gray: {
    50: '#fafafa',   // Almost white
    100: '#f4f4f5',  // Very light gray
    200: '#e4e4e7',  // Light gray
    300: '#d4d4d8',  // Medium light gray
    400: '#a1a1aa',  // Medium gray
    500: '#71717a',  // Medium dark gray
    600: '#52525b',  // Dark gray
    700: '#3f3f46',  // Darker gray
    800: '#27272a',  // Very dark gray
    900: '#18181b',  // Almost black
  }
};

// Theme configuration
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Custom component styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'lg',
    },
    sizes: {
      lg: {
        h: '48px',
        fontSize: 'lg',
        px: '24px',
      },
      md: {
        h: '44px',
        fontSize: 'md',
        px: '16px',
      },
      sm: {
        h: '36px',
        fontSize: 'sm',
        px: '12px',
      },
    },
    variants: {
      solid: {
        bg: 'green.500',
        color: 'white',
        _hover: {
          bg: 'green.600',
          transform: 'translateY(-1px)',
          boxShadow: 'lg',
        },
        _active: {
          bg: 'green.700',
          transform: 'translateY(0)',
        },
      },
      outline: {
        border: '2px solid',
        borderColor: 'green.500',
        color: 'green.500',
        _hover: {
          bg: 'green.50',
          borderColor: 'green.600',
          color: 'green.600',
        },
      },
      ghost: {
        color: 'green.500',
        _hover: {
          bg: 'green.50',
          color: 'green.600',
        },
      },
      secondary: {
        bg: 'sooq.100',
        color: 'gray.800',
        _hover: {
          bg: 'sooq.200',
          transform: 'translateY(-1px)',
          boxShadow: 'md',
        },
      },
    },
    defaultProps: {
      variant: 'solid',
      size: 'md',
    },
  },
  
  Card: {
    baseStyle: {
      container: {
        bg: 'white',
        borderRadius: 'xl',
        boxShadow: 'sm',
        _hover: {
          boxShadow: 'md',
          transform: 'translateY(-2px)',
          transition: 'all 0.2s',
        },
      },
      header: {
        pb: 3,
      },
      body: {
        py: 4,
      },
      footer: {
        pt: 3,
      },
    },
  },

  Input: {
    sizes: {
      lg: {
        field: {
          h: '48px',
          fontSize: 'lg',
        },
      },
      md: {
        field: {
          h: '44px',
          fontSize: 'md',
        },
      },
    },
    variants: {
      outline: {
        field: {
          borderColor: 'gray.300',
          _hover: {
            borderColor: 'gray.400',
          },
          _focus: {
            borderColor: 'green.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-green-500)',
          },
        },
      },
    },
    defaultProps: {
      size: 'md',
      variant: 'outline',
    },
  },

  Badge: {
    baseStyle: {
      borderRadius: 'full',
      fontWeight: 'medium',
      fontSize: 'xs',
    },
    variants: {
      solid: {
        bg: 'green.500',
        color: 'white',
      },
      subtle: {
        bg: 'green.100',
        color: 'green.800',
      },
      outline: {
        border: '1px solid',
        borderColor: 'green.500',
        color: 'green.500',
      },
      yellow: {
        bg: 'sooq.200',
        color: 'gray.800',
      },
    },
  },

  Tabs: {
    variants: {
      line: {
        tab: {
          color: 'gray.600',
          _selected: {
            color: 'green.500',
            borderColor: 'green.500',
          },
          _hover: {
            color: 'green.400',
          },
        },
      },
    },
  },
};

// Global styles
const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.800',
      fontSize: '16px',
      lineHeight: '1.6',
    },
    '*::placeholder': {
      color: 'gray.400',
    },
    '*, *::before, &::after': {
      borderColor: 'gray.200',
    },
    // Custom scrollbar styles
    '::-webkit-scrollbar': {
      width: '12px',
      height: '12px',
    },
    '::-webkit-scrollbar-track': {
      background: 'var(--chakra-colors-gray-100)',
      borderRadius: '6px',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(180deg, var(--chakra-colors-green-500), var(--chakra-colors-green-600))',
      borderRadius: '6px',
      border: '2px solid var(--chakra-colors-gray-100)',
      boxShadow: '0 2px 4px rgba(74, 155, 59, 0.2)',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: 'linear-gradient(180deg, var(--chakra-colors-green-600), var(--chakra-colors-green-700))',
      boxShadow: '0 4px 8px rgba(74, 155, 59, 0.3)',
    },
    '::-webkit-scrollbar-thumb:active': {
      background: 'var(--chakra-colors-green-700)',
    },
    '::-webkit-scrollbar-corner': {
      background: 'var(--chakra-colors-gray-100)',
    },
    // Firefox scrollbar styles
    'html': {
      scrollbarWidth: 'thin',
      scrollbarColor: 'var(--chakra-colors-green-500) var(--chakra-colors-gray-100)',
    },
    // Dark mode scrollbar adjustments
    '.chakra-ui-dark': {
      '::-webkit-scrollbar-track': {
        background: 'var(--chakra-colors-gray-700)',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'linear-gradient(180deg, var(--chakra-colors-green-400), var(--chakra-colors-green-500))',
        border: '2px solid var(--chakra-colors-gray-700)',
        boxShadow: '0 2px 4px rgba(134, 239, 172, 0.2)',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: 'linear-gradient(180deg, var(--chakra-colors-green-500), var(--chakra-colors-green-600))',
        boxShadow: '0 4px 8px rgba(134, 239, 172, 0.3)',
      },
      '::-webkit-scrollbar-corner': {
        background: 'var(--chakra-colors-gray-700)',
      },
      'html': {
        scrollbarColor: 'var(--chakra-colors-green-400) var(--chakra-colors-gray-700)',
      },
    },
  },
};

// Fonts
const fonts = {
  heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

// Font sizes
const fontSizes = {
  xs: '0.75rem',   // 12px
  sm: '0.875rem',  // 14px
  md: '1rem',      // 16px
  lg: '1.125rem',  // 18px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
};

// Spacing (8px grid system)
const space = {
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
};

// Border radius
const radii = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

// Shadows
const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  outline: '0 0 0 3px rgba(74, 155, 59, 0.6)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// Breakpoints for responsive design
const breakpoints = {
  base: '0px',
  sm: '480px',   // Mobile
  md: '768px',   // Tablet
  lg: '992px',   // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
};

// Create the theme
const theme = extendTheme({
  config,
  colors,
  components,
  styles,
  fonts,
  fontSizes,
  space,
  radii,
  shadows,
  breakpoints,
});

export default theme;
