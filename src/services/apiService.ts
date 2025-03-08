import axios, { AxiosError, AxiosInstance } from 'axios';

// Types
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string; // Added email property
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface ApiResult<T> {
  data: T | null;
  error: ApiError | null;
}

export class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private handleError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      return {
        message:
          error.response?.data?.message || error.message || 'An error occurred',
        status: error.response?.status,
      };
    }
    return {
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }

  private async request<T>(endpoint: string): Promise<ApiResult<T>> {
    try {
      const response = await this.api.get<T>(endpoint);
      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }

  async getAllPosts(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResult<{ posts: Post[]; total: number }>> {
    try {
      const response = await this.api.get<Post[]>('/posts');
      const posts = response.data;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      return {
        data: {
          posts: posts.slice(startIndex, endIndex),
          total: posts.length,
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }

  async getPostById(postId: number): Promise<ApiResult<Post>> {
    return this.request<Post>(`/posts/${postId}`);
  }

  async getPostComments(postId: number): Promise<ApiResult<Comment[]>> {
    return this.request<Comment[]>(`/posts/${postId}/comments`);
  }

  async getPostsByUser(
    userId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResult<{ posts: Post[]; total: number }>> {
    try {
      const response = await this.api.get<Post[]>('/posts', {
        params: { userId },
      });
      const posts = response.data;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      return {
        data: {
          posts: posts.slice(startIndex, endIndex),
          total: posts.length,
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }

  async getUserById(userId: number): Promise<ApiResult<User>> {
    return this.request<User>(`/users/${userId}`);
  }

  async getPostWithComments(
    postId: number
  ): Promise<ApiResult<{ post: Post; comments: Comment[] }>> {
    try {
      const [postResult, commentsResult] = await Promise.all([
        this.getPostById(postId),
        this.getPostComments(postId),
      ]);

      if (postResult.error) {
        return {
          data: null,
          error: postResult.error,
        };
      }

      if (commentsResult.error) {
        return {
          data: null,
          error: commentsResult.error,
        };
      }

      return {
        data: {
          post: postResult.data!,
          comments: commentsResult.data!,
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
      };
    }
  }
}

// Export a singleton instance
export const apiService = new ApiService();
