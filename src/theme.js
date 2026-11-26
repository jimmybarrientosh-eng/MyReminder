import { extendTheme } from '@chakra-ui/react';

const racing = {
  50: '#FDECEC', 100: '#FAD0D0', 200: '#F4A3A3', 300: '#EC7070', 400: '#E4443F',
  500: '#D3161C', 600: '#B71116', 700: '#930D12', 800: '#6F0A0E', 900: '#4A0709',
};

const darkTokens = {
  '--chakra-colors-white': '#16202A',
  '--chakra-colors-polar-50': '#0D141B',
  '--chakra-colors-polar-100': '#121B24',
  '--chakra-colors-glacier-50': '#142330',
  '--chakra-colors-glacier-100': '#1E3342',
  '--chakra-colors-glacier-700': '#A5CCE2',
  '--chakra-colors-glacier-800': '#C3DDEC',
  '--chakra-colors-glacier-900': '#E6F1F8',
  '--chakra-colors-gray-500': '#8A9CAD',
  '--chakra-colors-gray-600': '#A6B5C3',
  '--chakra-colors-brand-600': '#E4443F',
  '--chakra-colors-red-600': '#E4443F',
};

const DARK = 'html[data-theme=dark], body.chakra-ui-dark';

export default extendTheme({
  config: { initialColorMode: 'system', useSystemColorMode: false },
  fonts: { heading: "'Archivo', sans-serif", body: "'Public Sans', sans-serif" },
  colors: {
    polar: { 50: '#F4F8FB', 100: '#E9F0F6' },
    glacier: {
      50: '#EAF4FA', 100: '#D3E8F4', 200: '#B5D8EC', 300: '#92C4E0', 400: '#6AAAD0',
      500: '#4A8DB7', 600: '#336F96', 700: '#255573', 800: '#193D54', 900: '#102836',
    },
    brand: racing,
    red: racing,
  },
  styles: {
    global: {
      body: { bg: 'polar.50', color: 'glacier.900', transition: 'background-color .2s ease' },
      [DARK]: darkTokens,
      [`${DARK.split(', ').map((s) => `${s} header`).join(', ')}`]: {
        background: 'rgba(13,20,27,0.85)',
        borderColor: '#1E3342',
      },
      'html[data-theme=dark] ::selection, body.chakra-ui-dark ::selection': { background: '#336F96', color: '#FFFFFF' },
    },
  },
  components: {
    Button: {
      baseStyle: { borderRadius: 'lg', fontWeight: 600, transition: 'all .15s ease' },
      variants: {
        solid: (props) =>
          ['brand', 'red'].includes(props.colorScheme)
            ? { bg: 'brand.500', color: '#FFFFFF', _hover: { bg: 'brand.600', _disabled: { bg: 'brand.500' } }, _active: { bg: 'brand.700' } }
            : {},
      },
    },
    Heading: { baseStyle: { fontWeight: 800, letterSpacing: 'tight' } },
    Input: { defaultProps: { focusBorderColor: 'glacier.500' } },
    Select: { defaultProps: { focusBorderColor: 'glacier.500' } },
    Textarea: { defaultProps: { focusBorderColor: 'glacier.500' } },
  },
});
