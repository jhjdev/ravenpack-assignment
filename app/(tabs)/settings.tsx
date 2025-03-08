import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useTheme } from '@/src/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from '../../src/styles/styles';

interface SettingItemProps {
  title: string;
  description?: string;
  right?: React.ReactNode;
  onPress?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  description,
  right,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={[
        styles.settingsItem,
        {
          backgroundColor: theme.background.card,
          borderBottomColor: theme.border.light,
        },
      ]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.settingInfo}>
        <ThemedText variant="body1" style={styles.settingTitle}>
          {title}
        </ThemedText>
        {description && (
          <ThemedText variant="body2" style={styles.settingDescription}>
            {description}
          </ThemedText>
        )}
      </View>
      <View style={styles.rightContainer}>
        {right ||
          (onPress && (
            <Ionicons
              name="chevron-forward"
              size={18}
              color={theme.text.secondary}
            />
          ))}
      </View>
    </TouchableOpacity>
  );
};

const ThemeOption = ({
  title,
  description,
  value,
  isActive,
  onPress,
}: {
  title: string;
  description: string;
  value: 'light' | 'dark' | 'system';
  isActive: boolean;
  onPress: () => void;
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const getThemeIcon = () => {
    switch (value) {
      case 'light':
        return 'sunny-outline';
      case 'dark':
        return 'moon-outline';
      case 'system':
        return 'phone-portrait-outline';
      default:
        return 'options-outline';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.themeOption, isActive && styles.themeOptionActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.themeIconContainer}>
        <Ionicons
          name={getThemeIcon()}
          size={24}
          color={
            isActive ? theme.button.primary.background : theme.text.primary
          }
        />
      </View>
      <ThemedText
        variant="body1"
        style={[styles.themeTitle, isActive && styles.themeTitleActive]}
      >
        {title}
      </ThemedText>
      <ThemedText variant="body2" style={styles.themeDescription}>
        {description}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const { theme, themeMode, setThemeMode } = useTheme();
  const styles = createStyles(theme);

  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
  };

  return (
    <ThemedView style={styles.settingsContainer}>
      <View style={styles.contentContainer}>
        <ThemedText variant="h2" style={styles.sectionTitle}>
          Appearance
        </ThemedText>

        <View style={styles.themeOptionsContainer}>
          <ThemeOption
            title="Light"
            description="Light theme mode"
            value="light"
            isActive={themeMode === 'light'}
            onPress={() => handleThemeChange('light')}
          />
          <ThemeOption
            title="Dark"
            description="Dark theme mode"
            value="dark"
            isActive={themeMode === 'dark'}
            onPress={() => handleThemeChange('dark')}
          />
          <ThemeOption
            title="System"
            description="Follow device"
            value="system"
            isActive={themeMode === 'system'}
            onPress={() => handleThemeChange('system')}
          />
        </View>

        <ThemedText variant="h2" style={styles.sectionTitle}>
          About
        </ThemedText>

        <View style={styles.settingsGroup}>
          <SettingItem title="Version" description="1.0.0" />
          <SettingItem title="Developer" description="Jon Hnefill Jakobsson" />
          <SettingItem title="Framework" description="React Native + Expo" />
        </View>
      </View>
    </ThemedView>
  );
}
