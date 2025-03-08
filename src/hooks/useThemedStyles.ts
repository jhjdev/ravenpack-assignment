import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createStyles as createBaseStyles } from '../styles/styles';
import { Theme } from '../styles/theme';

/**
 * A hook that generates and returns the appropriate styles based on the current theme
 * 
 * @example
 * // Basic usage
 * const styles = useThemedStyles();
 * 
 * // In your component
 * <View style={styles.container}>
 *   <Text style={styles.textBody}>Hello world!</Text>
 * </View>
 * 
 * @example
 * // With custom style creator
 * const styles = useThemedStyles((theme) => ({
 *   customContainer: {
 *     backgroundColor: theme.background.secondary,
 *     padding: 20,
 *   },
 * }));
 * 
 * // In your component
 * <View style={styles.customContainer}>
 *   <Text style={styles.textBody}>Hello with custom styles!</Text>
 * </View>
 */
export function useThemedStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  customStyleCreator?: (theme: Theme) => T
) {
  const { theme } = useTheme();
  
  // Memoize the styles to prevent unnecessary re-creations on renders
  const styles = useMemo(() => {
    // Get the base styles that are defined in styles.ts
    const baseStyles = createBaseStyles(theme);
    
    // If there's a custom style creator, create those styles and merge them with base styles
    if (customStyleCreator) {
      const customStyles = StyleSheet.create(customStyleCreator(theme));
      return { ...baseStyles, ...customStyles };
    }
    
    // Otherwise just return the base styles
    return baseStyles;
  }, [theme, customStyleCreator]);
  
  return styles;
}

/**
 * A utility function that creates styles for a specific theme
 * Useful for creating styles outside of components
 * 
 * @param theme The theme to create styles for
 * @param customStyleCreator A function that creates custom styles based on the theme
 * @returns The created styles
 */
export function createThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  theme: Theme,
  customStyleCreator?: (theme: Theme) => T
) {
  const baseStyles = createBaseStyles(theme);
  
  if (customStyleCreator) {
    const customStyles = StyleSheet.create(customStyleCreator(theme));
    return { ...baseStyles, ...customStyles };
  }
  
  return baseStyles;
}

export default useThemedStyles;

