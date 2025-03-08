import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../src/contexts/ThemeContext';
import ThemedText from '../ThemedText';
import ThemedView from '../ThemedView';
import { createStyles } from '../../src/styles/styles';
import { Post } from '../../src/types';

interface PostItemProps {
  post: Post;
  onReadMore: (post: Post) => void;
  onAuthorPress: (userId: number) => void;
}

const PostItem = React.memo<PostItemProps>(({ post, onReadMore, onAuthorPress }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const truncatedBody = post.body.length > 100 
    ? `${post.body.substring(0, 100)}...` 
    : post.body;

  return (
    <ThemedView style={styles.card}>
      <ThemedText variant="h2" style={styles.textH2}>
        {post.title}
      </ThemedText>

      <ThemedText variant="body1" style={styles.textBody}>
        {truncatedBody}
      </ThemedText>

      <View style={styles.rowBetween}>
        <TouchableOpacity onPress={() => onReadMore(post)} style={styles.buttonPrimary}>
          <ThemedText variant="body1" style={styles.buttonText}>
            Read more
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => post.userId && onAuthorPress(post.userId)} 
          style={[styles.buttonSecondary, !post.userId && styles.buttonDisabled]}
          disabled={!post.userId}
        >
          <ThemedText 
            variant="body2" 
            style={[styles.buttonTextSecondary, !post.userId && styles.textDisabled]}
          >
            Author: {post.userId || 'Unknown'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
});

PostItem.displayName = 'PostItem';

export default PostItem;
