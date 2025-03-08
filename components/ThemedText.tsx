import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../src/contexts/ThemeContext';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'subtitle'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption';

export type ThemedTextProps = TextProps & {
  variant?: TextVariant;
  lightColor?: string;
  darkColor?: string;
};

/**
 * Enhanced ThemedText component with improved contrast handling and fallbacks
 * Ensures text is always visible regardless of theme context availability
 */
export function ThemedText(props: ThemedTextProps) {
  const {
    style,
    lightColor,
    darkColor,
    variant = 'body1',
    ...otherProps
  } = props;
  const { theme, isDarkMode } = useTheme();

  // Debug info to help trace issues
  const debugInfo = {
    hasTheme: !!theme,
    isDarkMode,
    variant,
    providedLightColor: lightColor,
    providedDarkColor: darkColor,
  };

  console.debug('ThemedText rendering with:', debugInfo);

  // Get text color based on theme and provided override colors
  const getTextColor = () => {
    // Handle case where theme is undefined (fallback to system defaults)
    if (!theme) {
      console.warn(
        'ThemedText: Theme context is undefined, using fallback colors'
      );
      return isDarkMode ? darkColor || '#FFFFFF' : lightColor || '#000000';
    }

    // Use provided colors if available
    if (isDarkMode && darkColor) {
      return darkColor;
    }
    if (!isDarkMode && lightColor) {
      return lightColor;
    }

    // Use theme colors with fallbacks for each property access
    try {
      if (isDarkMode) {
        return theme.text?.primary || '#FFFFFF';
      } else {
        return theme.text?.primary || '#000000';
      }
    } catch (error) {
      console.error('ThemedText: Error accessing theme properties', error);
      return isDarkMode ? '#FFFFFF' : '#000000';
    }
  };

  // Get typography styles based on variant
  const getTypographyStyles = () => {
    if (!theme || !theme.typography) {
      console.warn(
        'ThemedText: Typography not available in theme, using fallback styles'
      );
      return fallbackTypography[variant] || fallbackTypography.body1;
    }

    try {
      return (
        theme.typography[variant] ||
        fallbackTypography[variant] ||
        fallbackTypography.body1
      );
    } catch (error) {
      console.error('ThemedText: Error accessing typography styles', error);
      return fallbackTypography[variant] || fallbackTypography.body1;
    }
  };

  // Apply styles ensuring text is always visible
  const textColor = getTextColor();
  const typographyStyles = getTypographyStyles();

  return (
    <Text
      style={[
        typographyStyles,
        { color: textColor },
        // Ensure dark mode has appropriate contrast
        isDarkMode && {
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 1,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

// Fallback typography styles to ensure text always has some styling
const fallbackTypography = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  h3: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 4,
  },
  body1: {
    fontSize: 16,
    marginVertical: 2,
  },
  body2: {
    fontSize: 14,
    marginVertical: 2,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
  },
  caption: {
    fontSize: 12,
  },
});

export default ThemedText;
