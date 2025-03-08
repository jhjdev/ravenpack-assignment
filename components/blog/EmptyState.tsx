import React from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import ThemedText from '../ThemedText';
import ThemedView from '../ThemedView';
import { createStyles } from '../../src/styles/styles';

const EmptyState = React.memo(() => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedView style={styles.centeredContainer}>
      <ThemedText variant="h2" style={styles.textH2}>
        No Posts Found
      </ThemedText>

      <ThemedText variant="body1" style={styles.textBody}>
        There are no blog posts available at this time.
      </ThemedText>
    </ThemedView>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
