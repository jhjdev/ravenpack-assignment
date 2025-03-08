import { ActivityIndicator, FlatList, ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useMemo } from 'react';

import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useBlogPosts } from '../../src/hooks/useBlogPosts';
import { Comment, Post } from '../../src/services/apiService';
import { createStyles } from '../../src/styles/styles';
import Card from '../../components/Card';

/**
 * PostDetailsScreen displays a single post with its comments
 * Uses the id parameter from the route to fetch the specific post
 */
export default function PostDetailsScreen() {
  // Get the post ID from the route params
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = id ? parseInt(id as string) : 0;
  const router = useRouter();

  // Get theme and check if it's dark mode
  const { theme, isDarkMode } = useTheme();

  // Fetch post with comments
  const {
    data: postWithComments,
    isLoading,
    isError,
    error,
  } = useBlogPosts().useGetPostWithComments(postId);

  // Fetch author name
  const userId = postWithComments?.post.userId;
  const { data: authorData } = useBlogPosts().useGetAuthor(userId ?? 0);

  // Create styles with the current theme
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Render comment item
  const renderComment = ({ item }: { item: Comment }) => (
    <ThemedView
      style={styles.commentContainer}
      lightColor={theme.background.secondary}
      darkColor={theme.background.secondaryDark}
    >
      <ThemedText
        variant="subtitle"
        style={styles.commentName}
        lightColor={theme.text.accent}
        darkColor={theme.text.accentDark}
      >
        {item.name}
      </ThemedText>
      <ThemedText
        variant="caption"
        style={styles.commentEmail}
        lightColor={theme.text.secondary}
        darkColor={theme.text.secondaryDark}
      >
        {item.email}
      </ThemedText>
      <ThemedText
        variant="body1"
        style={styles.commentBody}
        lightColor={theme.text.primary}
        darkColor={theme.text.primaryDark}
      >
        {item.body}
      </ThemedText>
    </ThemedView>
  );

  // Render loading state
  if (isLoading) {
    return (
      <ThemedView
        style={styles.loadingContainer}
        lightColor={theme.background.primary}
        darkColor={theme.background.primaryDark}
      >
        <ActivityIndicator
          size="large"
          color={
            isDarkMode
              ? theme.button.accent.backgroundColor
              : theme.button.primary.backgroundColor
          }
        />
        <ThemedText
          variant="body1"
          style={styles.loadingText}
          lightColor={theme.text.primary}
          darkColor={theme.text.primaryDark}
        >
          Loading post details...
        </ThemedText>
      </ThemedView>
    );
  }

  // Render error state
  if (isError || !postWithComments?.post) {
    return (
      <ThemedView
        style={styles.errorContainer}
        lightColor={theme.background.primary}
        darkColor={theme.background.primaryDark}
      >
        <Feather name="alert-circle" size={48} color={theme.text.error} />
        <ThemedText
          variant="h2"
          style={styles.errorTitle}
          lightColor={theme.text.error}
          darkColor={theme.text.error}
        >
          Error Loading Post
        </ThemedText>
        <ThemedText
          variant="body1"
          style={styles.errorMessage}
          lightColor={theme.text.primary}
          darkColor={theme.text.primaryDark}
        >
          {error?.message || 'Failed to load post details. Please try again.'}
        </ThemedText>
      </ThemedView>
    );
  }

  const post = postWithComments.post;
  const comments = postWithComments.comments || [];
  const authorName = authorData?.name || 'Unknown Author';

  return (
    <ThemedView
      style={styles.container}
      lightColor={theme.background.primary}
      darkColor={theme.background.primaryDark}
    >
      <Stack.Screen
        options={{
          title: 'Post Details',
          headerStyle: {
            backgroundColor: isDarkMode
              ? theme.background.primaryDark
              : theme.background.primary,
          },
          headerTintColor: isDarkMode
            ? theme.text.primaryDark
            : theme.text.primary,
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Post Details */}
        <Card
          title={post.title}
          body={post.body}
          authorName={authorName} // Use the fetched author name
          showButtons={false} // Hide buttons
          showFullText={true} // Show full text
          isFirst={false}
        />

        {/* Comments Section */}
        <ThemedView
          style={styles.commentsSection}
          lightColor={theme.background.primary}
          darkColor={theme.background.primaryDark}
        >
          <ThemedText
            variant="h2"
            style={styles.commentsTitle}
            lightColor={theme.text.primary}
            darkColor={theme.text.primaryDark}
          >
            Comments ({comments.length})
          </ThemedText>

          {comments.length === 0 ? (
            <ThemedView
              style={styles.noCommentsContainer}
              lightColor={theme.background.secondary}
              darkColor={theme.background.secondaryDark}
            >
              <ThemedText
                variant="body1"
                lightColor={theme.text.secondary}
                darkColor={theme.text.secondaryDark}
              >
                No comments yet
              </ThemedText>
            </ThemedView>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderComment}
              contentContainerStyle={styles.commentsList}
              scrollEnabled={false}
            />
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
