import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../src/contexts/ThemeContext';
import type { ThemeType } from '../src/styles/theme';

/**
 * Props for the ThemedView component
 * @typedef {Object} ThemedViewProps
 * @property {string} [lightColor] - Override color for light theme
 * @property {string} [darkColor] - Override color for dark theme
 * @property {keyof Theme['background']} [colorName='default'] - Named background color from theme
 * @property {boolean} [transparent=false] - Whether the view should be transparent
 * @property {string} [borderColor] - Override border color
 * @property {keyof Theme['border']} [borderColorName] - Named border color from theme
 * @property {number} [borderWidth] - Border width
 * @property {number} [borderRadius] - Border radius
 * @property {number} [elevation] - Elevation for shadow (Android)
 * @property {ViewProps['style']} [style] - Additional styles
 */
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof ThemeType['background'];
  transparent?: boolean;
  borderColor?: string;
  borderColorName?: keyof ThemeType['border'];
  borderWidth?: number;
  borderRadius?: number;
  elevation?: number;
};

/**
 * A View component that automatically adapts to the current theme
 *
 * @example
 * // Basic usage
 * <ThemedView>
 *   <Text>Hello World</Text>
 * </ThemedView>
 *
 * @example
 * // With custom colors
 * <ThemedView
 *   colorName="card"
 *   borderColorName="light"
 *   borderWidth={1}
 *   borderRadius={8}
 *   elevation={2}
 * >
 *   <Text>Card Content</Text>
 * </ThemedView>
 *
 * @example
 * // With manual colors
 * <ThemedView
 *   lightColor="#f8f9fa"
 *   darkColor="#343a40"
 *   borderColor="#ced4da"
 * >
 *   <Text>Custom Colors</Text>
 * </ThemedView>
 */
export function ThemedView({
  style,
  lightColor,
  darkColor,
  colorName = 'primary',
  transparent = false,
  borderColor,
  borderColorName,
  borderWidth,
  borderRadius,
  elevation,
  ...otherProps
}: ThemedViewProps) {
  const { theme, isDarkMode } = useTheme();

  // Determine background color
  let backgroundColor;
  if (transparent) {
    backgroundColor = 'transparent';
  } else if (lightColor && darkColor) {
    backgroundColor = isDarkMode ? darkColor : lightColor;
  } else {
    // Access named color from theme background object
    // Use default if specified colorName doesn't exist
    backgroundColor = theme.background[colorName] || theme.background.default;
  }

  // Determine border color
  let borderColorValue;
  if (borderColor) {
    borderColorValue = borderColor;
  } else if (borderColorName && theme.border[borderColorName]) {
    borderColorValue = theme.border[borderColorName];
  }

  // Create dynamic styles
  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor,
      ...(borderColorValue && borderWidth
        ? { borderColor: borderColorValue, borderWidth }
        : {}),
      ...(borderRadius ? { borderRadius } : {}),
      ...(elevation
        ? {
            elevation,
            shadowColor: theme.shadow?.color || '#000',
            shadowOffset: { width: 0, height: elevation / 2 },
            shadowOpacity: 0.2,
            shadowRadius: elevation / 2,
          }
        : {}),
    },
  });

  return <View style={[dynamicStyles.container, style]} {...otherProps} />;
}

export default ThemedView;
