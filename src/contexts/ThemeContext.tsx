import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, darkTheme, lightTheme, typography } from '../styles/theme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void; // Added toggle function for convenience
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_MODE_STORAGE_KEY = '@theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme() || 'light';
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [isLoading, setIsLoading] = useState(true);

  // Determine if we're in dark mode based on theme mode and system settings
  const isDarkMode = themeMode === 'system' 
    ? systemColorScheme === 'dark' 
    : themeMode === 'dark';

  // Get the appropriate theme object based on dark/light mode
  const theme = {
    ...isDarkMode ? darkTheme : lightTheme,
    typography // Include typography in the theme object
  };

  // Toggle between light, dark, and system modes
  const toggleThemeMode = () => {
    if (themeMode === 'light') {
      handleThemeModeChange('dark');
    } else if (themeMode === 'dark') {
      handleThemeModeChange('system');
    } else {
      handleThemeModeChange('light');
    }
  };

  // Load the saved theme mode from AsyncStorage on component mount
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedThemeMode = await AsyncStorage.getItem(THEME_MODE_STORAGE_KEY);
        if (savedThemeMode) {
          setThemeMode(savedThemeMode as ThemeMode);
        }
      } catch (error) {
        console.error('Failed to load theme mode from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemeMode();
  }, []);

  // Save the theme mode to AsyncStorage whenever it changes
  const handleThemeModeChange = async (newMode: ThemeMode) => {
    setThemeMode(newMode);
    try {
      await AsyncStorage.setItem(THEME_MODE_STORAGE_KEY, newMode);
    } catch (error) {
      console.error('Failed to save theme mode to AsyncStorage:', error);
    }
  };

  // Listen for system theme changes when using system theme
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'system') {
        // We don't need to call setThemeMode here since we're using the system theme
        // This will just trigger a re-render with the new systemColorScheme
      }
    });

    return () => {
      subscription.remove();
    };
  }, [themeMode]);

  // Don't render children until we've loaded the theme from storage
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        setThemeMode: handleThemeModeChange,
        toggleThemeMode,
        isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
// For convenience in components that just need themed colors
export const useThemeColors = () => {
  const { theme } = useTheme();
  // Return text colors as they exist in the theme
  return theme.text;
};

export default ThemeProvider;
