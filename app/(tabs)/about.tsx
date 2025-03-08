import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useTheme } from '../../src/contexts/ThemeContext';
import { createStyles } from '../../src/styles/styles';

type TechItem = {
  name: string;
  version: string;
  description: string;
};

const techStack: TechItem[] = [
  {
    name: 'React Native',
    version: Constants.expoConfig?.sdkVersion || '0.72.x',
    description: 'A framework for building native apps using React',
  },
  {
    name: 'Expo',
    version: Constants.expoConfig?.sdkVersion || '49.x',
    description: 'A framework and platform for universal React applications',
  },
  {
    name: 'TypeScript',
    version: '^5.1.3',
    description:
      'A typed superset of JavaScript that compiles to plain JavaScript',
  },
  {
    name: 'TanStack Query',
    version: '^4.32.0',
    description: 'Powerful asynchronous state management for data fetching',
  },
  {
    name: 'Axios',
    version: '^1.4.0',
    description: 'Promise based HTTP client for the browser and Node.js',
  },
  {
    name: 'Expo Router',
    version: '^2.0.0',
    description: 'File-based routing for React Native apps with Expo',
  },
  {
    name: 'React Navigation',
    version: '^6.0.0',
    description: 'Routing and navigation for React Native apps',
  },
  {
    name: 'date-fns',
    version: '^2.30.0',
    description: 'Modern JavaScript date utility library',
  },
  {
    name: 'ESLint',
    version: '^8.45.0',
    description: 'Pluggable JavaScript linter for identifying code issues',
  },
  {
    name: 'Prettier',
    version: '^3.0.0',
    description: 'An opinionated code formatter',
  },
  {
    name: 'Jest',
    version: '^29.5.0',
    description: 'JavaScript Testing Framework with a focus on simplicity',
  },
  {
    name: 'React Testing Library',
    version: '^14.0.0',
    description: 'Simple and complete React DOM testing utilities',
  },
];

export default function AboutScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.aboutContainer}>
        <ThemedText variant="h1" style={styles.aboutTitle}>
          About This App
        </ThemedText>
        <ThemedText variant="body1" style={styles.aboutSubtitle}>
          This application is a simple blog post reader that demonstrates the
          use of modern React Native development practices.
        </ThemedText>

        <ThemedView style={styles.aboutSeparator} />

        <ThemedText variant="h2" style={styles.aboutSectionTitle}>
          Technology Stack
        </ThemedText>

        <ScrollView
          style={styles.aboutScrollView}
          contentContainerStyle={styles.aboutScrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {techStack.map((tech, index) => (
            <ThemedView key={`tech-${index}`} style={styles.aboutTechCard}>
              <View style={styles.aboutTechHeader}>
                <ThemedText variant="h2" style={styles.aboutTechName}>
                  {tech.name}
                </ThemedText>
                <ThemedView style={styles.aboutVersionContainer}>
                  <ThemedText variant="body2" style={styles.aboutTechVersion}>
                    {tech.version}
                  </ThemedText>
                </ThemedView>
              </View>
              <ThemedText variant="body1" style={styles.aboutTechDescription}>
                {tech.description}
              </ThemedText>
            </ThemedView>
          ))}
        </ScrollView>

        <ThemedView style={styles.aboutFooter}>
          <ThemedText variant="body2" style={styles.aboutFooterText}>
            Version {Constants.expoConfig?.version || '1.0.0'}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}
