import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/contexts/ThemeContext';
import ThemedText from '../ThemedText';
import ThemedView from '../ThemedView';
import { createStyles } from '../../src/styles/styles';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState = React.memo<ErrorStateProps>(({ message, onRetry }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedView style={styles.centeredContainer}>
      <ThemedText variant="h2" style={styles.textError}>
        Error Loading Posts
      </ThemedText>

      <ThemedText variant="body1" style={styles.textBody}>
        {message}
      </ThemedText>

      <TouchableOpacity onPress={onRetry} style={styles.buttonPrimary}>
        <ThemedText variant="body1" style={styles.buttonText}>
          Retry
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
});

ErrorState.displayName = 'ErrorState';

export default ErrorState;
