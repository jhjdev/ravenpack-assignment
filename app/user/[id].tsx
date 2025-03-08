import * as React from 'react';
import {
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  View,
  Text,
} from 'react-native';
import {
  Stack,
  useRouter,
  useLocalSearchParams,
  ScreenProps,
} from 'expo-router';
import { UseQueryResult } from '@tanstack/react-query';
import { useTheme } from '../../src/contexts/ThemeContext';
import { createStyles } from '../../src/styles/styles';
import { Post, PostsData } from '../../src/types';
import Card from '../../components/Card';
import LoadingState from '../../components/blog/LoadingState';
import ErrorState from '../../components/blog/ErrorState';
import EmptyState from '../../components/blog/EmptyState';
import { useBlogPosts } from '../../src/hooks/useBlogPosts';
import ThemedView from '../../components/ThemedView';
import { apiService } from '../../src/services/apiService';

const createHeaderOptions = (
  styles: ReturnType<typeof createStyles>
): ScreenProps['options'] => ({
  title: 'Author Posts',
  headerStyle: styles.header,
  headerTitleStyle: styles.headerTitle,
});

const AuthorPosts = (): JSX.Element => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = id ? parseInt(id as string) : 0;
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const headerOptions = React.useMemo(
    () => createHeaderOptions(styles),
    [styles]
  );
  const [commentsData, setCommentsData] = React.useState<{
    [key: number]: number;
  }>({});

  const { useGetPostsByUser, useGetAuthor } = useBlogPosts();
  const { data, isLoading, error, refetch }: UseQueryResult<PostsData, Error> =
    useGetPostsByUser(userId);

  const { data: authorData } = useGetAuthor(userId);
  const authorName = authorData?.name || 'Unknown Author';

  React.useEffect(() => {
    const fetchCommentsData = async () => {
      if (!data?.posts) return;
      const commentsPromises = data.posts.map(async (post) => {
        const result = await apiService.getPostComments(post.id);
        return {
          postId: post.id,
          commentsCount: result.data?.length || 0,
        };
      });
      const results = await Promise.all(commentsPromises);
      const newCommentsData = results.reduce(
        (acc, { postId, commentsCount }) => {
          acc[postId] = commentsCount;
          return acc;
        },
        {} as { [key: number]: number }
      );
      setCommentsData(newCommentsData);
    };

    fetchCommentsData();
  }, [data]);

  const handleReadMore = React.useCallback(
    (post: Post) => {
      router.push(`/post/${post.id}`);
    },
    [router]
  );

  const renderItem: ListRenderItem<Post> = ({ item }) => {
    const commentsCount = commentsData[item.id] || 0;

    return (
      <Card
        title={item.title}
        body={item.body}
        authorName={authorName} // Use the fetched author name
        onReadMore={() => handleReadMore(item)}
        showButtons={true} // Show buttons
        showFullText={true} // Show full text
        isFirst={false}
        footer={
          <Text style={styles.commentsCount}>Comment: {commentsCount}</Text>
        }
      />
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={headerOptions} />
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error.message} onRetry={refetch} />
      ) : (
        <FlatList
          data={data?.posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<EmptyState />}
          ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
        />
      )}
    </ThemedView>
  );
};

export default AuthorPosts;
