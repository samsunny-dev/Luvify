import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#FFE5EC',
      100: '#FFB8CC',
      200: '#FF8AAD',
      300: '#FF5C8D',
      400: '#FF2E6E',
      500: '#FF0054', // Primary pink
      600: '#CC0043',
      700: '#990033',
      800: '#660022',
      900: '#330011',
    },
    accent: {
      50: '#F0E6FF',
      100: '#D1B8FF',
      200: '#B28AFF',
      300: '#935CFF',
      400: '#742EFF',
      500: '#5500FF', // Secondary purple
      600: '#4400CC',
      700: '#330099',
      800: '#220066',
      900: '#110033',
    },
  },
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Inter", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'full',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          overflow: 'hidden',
          boxShadow: 'lg',
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            borderRadius: 'full',
            bg: 'gray.50',
            _hover: {
              bg: 'gray.100',
            },
            _focus: {
              bg: 'white',
              borderColor: 'brand.500',
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
});

export default theme;
