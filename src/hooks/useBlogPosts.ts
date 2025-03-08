import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/apiService';
import { Post, PostsData, Comment, Author } from '../types';

const fetchPosts = async (page: number, limit: number): Promise<PostsData> => {
  const result = await apiService.getAllPosts(page, limit);
  if (result.error) {
    throw new Error(result.error.message);
  }
  return {
    posts: result.data!.posts,
    total: result.data!.total,
    page,
    limit,
  };
};

const fetchPostWithComments = async (postId: number) => {
  const result = await apiService.getPostWithComments(postId);
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result.data!;
};

const fetchAuthor = async (userId: number) => {
  const result = await apiService.getUserById(userId);
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result.data!;
};

const fetchPostsByUser = async (userId: number): Promise<PostsData> => {
  const result = await apiService.getPostsByUser(userId);
  if (result.error) {
    throw new Error(result.error.message);
  }
  return {
    posts: result.data!.posts,
    total: result.data!.total,
    page: 1, // Assuming all posts are fetched in one go
    limit: result.data!.total, // Assuming all posts are fetched in one go
  };
};

const fetchPostComments = async (postId: number) => {
  const result = await apiService.getPostComments(postId);
  if (result.error) {
    throw new Error(result.error.message);
  }
  return result.data!;
};

export const useBlogPosts = () => {
  const useGetAllPosts = (page: number, limit: number) => {
    return useQuery<PostsData, Error>({
      queryKey: ['posts', page, limit],
      queryFn: () => fetchPosts(page, limit),
      staleTime: 5000,
    });
  };

  const useGetPostWithComments = (postId: number) => {
    return useQuery({
      queryKey: ['postWithComments', postId],
      queryFn: () => fetchPostWithComments(postId),
    });
  };

  const useGetAuthor = (userId: number) => {
    return useQuery<Author, Error>({
      queryKey: ['author', userId],
      queryFn: () => apiService.getUserById(userId).then((res) => res.data!),
      enabled: !!userId,
    });
  };

  const useGetPostsByUser = (userId: number) => {
    return useQuery<PostsData, Error>({
      queryKey: ['postsByUser', userId],
      queryFn: () => fetchPostsByUser(userId),
    });
  };

  const useGetPostComments = (postId: number) => {
    return useQuery({
      queryKey: ['postComments', postId],
      queryFn: () => fetchPostComments(postId),
    });
  };

  return {
    useGetAllPosts,
    useGetPostWithComments,
    useGetAuthor,
    useGetPostsByUser,
    useGetPostComments,
  };
};
