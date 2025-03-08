import * as React from 'react';
import {
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  View,
} from 'react-native';
import { Stack, useRouter, ScreenProps } from 'expo-router';
import { UseQueryResult } from '@tanstack/react-query';
import { useTheme } from '../../src/contexts/ThemeContext';
import { createStyles } from '../../src/styles/styles';
import { Post, PostsData } from '../../src/types';
import Card from '../../components/Card';
import LoadingState from '../../components/blog/LoadingState';
import ErrorState from '../../components/blog/ErrorState';
import { useBlogPosts } from '../../src/hooks/useBlogPosts';
import ThemedView from '../../components/ThemedView';
import { apiService } from '../../src/services/apiService'; // Add this import

const createHeaderOptions = (
  styles: ReturnType<typeof createStyles>
): ScreenProps['options'] => ({
  title: 'Blog Posts',
  headerStyle: styles.header,
  headerTitleStyle: styles.headerTitle,
});

const Home = (): JSX.Element => {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const headerOptions = React.useMemo(
    () => createHeaderOptions(styles),
    [styles]
  );
  const [page, setPage] = React.useState(1);
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);
  const [authors, setAuthors] = React.useState<{ [key: number]: string }>({});
  const flatListRef = React.useRef<FlatList>(null);

  const { useGetAllPosts } = useBlogPosts();
  const { data, isLoading, error, refetch }: UseQueryResult<PostsData, Error> =
    useGetAllPosts(page, 10); // Set the limit to 10

  React.useEffect(() => {
    if (data?.posts) {
      setAllPosts((prevPosts) => [...prevPosts, ...data.posts]);
    }
  }, [data]);

  React.useEffect(() => {
    const fetchAuthors = async () => {
      const uniqueUserIds = Array.from(
        new Set(allPosts.map((post) => post.userId))
      );
      const authorPromises = uniqueUserIds.map(async (userId) => {
        const result = await apiService.getUserById(userId);
        return {
          userId,
          name: result.data?.name || 'Unknown Author',
        };
      });
      const authorResults = await Promise.all(authorPromises);
      const newAuthors = authorResults.reduce(
        (acc: { [key: number]: string }, { userId, name }) => {
          acc[userId] = name;
          return acc;
        },
        {}
      );
      setAuthors((prevAuthors) => ({ ...prevAuthors, ...newAuthors }));
    };

    if (allPosts.length > 0) {
      fetchAuthors();
    }
  }, [allPosts]);

  const handleReadMore = React.useCallback(
    (post: Post) => {
      router.push(`/post/${post.id}`);
    },
    [router]
  );

  const handleAuthorPress = React.useCallback(
    (userId: number) => {
      router.push(`/user/${userId}`);
    },
    [router]
  );

  const handleLoadMore = React.useCallback(() => {
    if (!isLoading && data && data.posts.length > 0) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, data]);

  const renderItem: ListRenderItem<Post> = ({ item, index }) => {
    const authorName = authors[item.userId] || 'Unknown Author';

    return (
      <Card
        title={item.title}
        body={item.body}
        authorName={authorName} // Use the fetched author name
        onReadMore={() => handleReadMore(item)}
        onViewAuthorPosts={() => handleAuthorPress(item.userId)}
        isFirst={index === 0} // Add margin top for the first card
        showFullText={false} // Show only the first two lines
      />
    );
  };

  const renderFooter = () => (
    <>{isLoading && page > 1 && <ActivityIndicator />}</>
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={headerOptions} />
      {isLoading && page === 1 ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error.message} onRetry={refetch} />
      ) : (
        <FlatList
          ref={flatListRef}
          data={allPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </ThemedView>
  );
};

export default Home;
