import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '../../src/contexts/ThemeContext';
import ThemedText from '../ThemedText';
import ThemedView from '../ThemedView';
import { createStyles } from '../../src/styles/styles';

const LoadingState = React.memo(() => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedView style={styles.centeredContainer}>
      <ActivityIndicator size="large" color={theme.button.primary.background} />
      <ThemedText variant="body1" style={styles.textBody}>
        Loading posts...
      </ThemedText>
    </ThemedView>
  );
});

LoadingState.displayName = 'LoadingState';

export default LoadingState;
