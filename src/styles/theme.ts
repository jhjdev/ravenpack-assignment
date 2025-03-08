import { TextStyle } from 'react-native';

// Define base types
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type Sizes = Record<Size, number>;
type Shadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

// Export types for use in other files
export type { Size, Sizes, Shadow };

// Typography types
type TypographyStyle = Pick<
  TextStyle,
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'fontFamily'
  | 'textDecorationLine'
  | 'color'
> & {
  fontSize: number;
  fontWeight: TextStyle['fontWeight'];
  lineHeight: number;
};

// Define spacing values
export const spacing: Sizes = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

// Define border radius values
export const borderRadius: Sizes = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  xxl: 32,
};

// Define shadow styles
export const shadows: Record<string, Shadow> = {
  light: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  heavy: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Define typography styles
export const typography: Record<string, TypographyStyle> = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  body1: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    textDecorationLine: 'underline',
  },
} as const;

// Define light and dark themes
export const lightTheme = {
  background: {
    primary: '#ffffff',
    secondary: '#f0f0f0',
    card: '#ffffff',
    cardDark: '#e0e0e0',
    primaryDark: '#f0f0f0',
    secondaryDark: '#d0d0d0',
  },
  text: {
    primary: '#000000',
    secondary: '#555555',
    accent: '#007bff',
    accentDark: '#0056b3',
    link: '#007bff',
    linkDark: '#0056b3',
    primaryDark: '#000000',
    secondaryDark: '#555555',
    error: '#ff0000',
  },
  border: {
    light: '#e0e0e0',
    dark: '#c0c0c0',
  },
  button: {
    primary: {
      backgroundColor: '#007bff',
      textColor: '#ffffff',
    },
    accent: {
      backgroundColor: '#28a745',
      textColor: '#ffffff',
    },
  },
  shadow: shadows,
  spacing,
  borderRadius,
  typography,
};

export const darkTheme = {
  background: {
    primary: '#000000',
    secondary: '#333333',
    card: '#1a1a1a',
    cardDark: '#0d0d0d',
    primaryDark: '#1a1a1a',
    secondaryDark: '#0d0d0d',
  },
  text: {
    primary: '#ffffff',
    secondary: '#aaaaaa',
    accent: '#007bff',
    accentDark: '#0056b3',
    link: '#007bff',
    linkDark: '#0056b3',
    primaryDark: '#ffffff',
    secondaryDark: '#aaaaaa',
    error: '#ff0000',
  },
  border: {
    light: '#444444',
    dark: '#666666',
  },
  button: {
    primary: {
      backgroundColor: '#007bff',
      textColor: '#ffffff',
    },
    accent: {
      backgroundColor: '#28a745',
      textColor: '#ffffff',
    },
  },
  shadow: shadows,
  spacing,
  borderRadius,
  typography,
};

// Export current theme type
export type ThemeType = typeof lightTheme | typeof darkTheme;
