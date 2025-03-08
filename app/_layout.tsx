import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { QueryProvider } from '@/src/lib/query';
import ThemeProvider, { useTheme } from '@/src/contexts/ThemeContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <ThemeProvider>
        <ThemedNavigationContainer />
      </ThemeProvider>
    </QueryProvider>
  );
}

function ThemedNavigationContainer() {
  const { isDarkMode, theme } = useTheme();

  return (
    <NavigationThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="post/[id]"
          options={{
            headerBackTitle: 'Back', // Set the back button text to "Back"
            headerTintColor: theme.text.accent, // Set the back button text color to match the author's name color
          }}
        />
        <Stack.Screen
          name="user/[id]"
          options={{
            headerBackTitle: 'Back', // Set the back button text to "Back"
            headerTintColor: theme.text.accent, // Set the back button text color to match the author's name color
          }}
        />
      </Stack>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}
