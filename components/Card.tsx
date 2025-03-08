import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../src/contexts/ThemeContext';
import { createStyles } from '../src/styles/styles';

interface CardProps {
  title: string;
  body: string;
  authorName: string;
  onReadMore?: () => void;
  onViewAuthorPosts?: () => void;
  isFirst?: boolean;
  showButtons?: boolean;
  showFullText?: boolean;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  body,
  authorName,
  onReadMore,
  onViewAuthorPosts,
  isFirst = false,
  showButtons = true,
  showFullText = false,
  footer,
}) => {
  const { theme, isDarkMode } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.card, isFirst && styles.firstCard]}>
      <View style={styles.cardContent}>
        <Text style={styles.authorName}>By: {authorName}</Text>
        <Text style={[styles.cardTitle, isDarkMode && styles.cardTitleDark]}>
          {title}
        </Text>
        <Text
          style={[styles.cardBody, isDarkMode && styles.cardBodyDark]}
          numberOfLines={showFullText ? undefined : 2}
        >
          {body}
        </Text>
      </View>
      {showButtons && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onReadMore} style={styles.button}>
            <Text style={styles.buttonText}>Read More</Text>
          </TouchableOpacity>
          {onViewAuthorPosts && (
            <TouchableOpacity onPress={onViewAuthorPosts} style={styles.link}>
              <Text style={styles.linkText}>View Author's Posts</Text>
            </TouchableOpacity>
          )}
          {footer}
        </View>
      )}
    </View>
  );
};

export default Card;
