import axios from 'axios';
import {
  ApiService,
  Post,
  Comment,
  User,
  apiService,
} from '../services/apiService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ApiService', () => {
  let service: ApiService;

  // Sample data for tests
  const mockPost: Post = {
    id: 1,
    userId: 1,
    title: 'Test Post',
    body: 'This is a test post body',
  };

  const mockPosts: Post[] = [
    mockPost,
    {
      id: 2,
      userId: 1,
      title: 'Another Test Post',
      body: 'This is another test post body',
    },
  ];

  const mockComments: Comment[] = [
    {
      id: 1,
      postId: 1,
      name: 'Test Comment',
      email: 'test@example.com',
      body: 'This is a test comment',
    },
  ];

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
  };

  beforeEach(() => {
    jest.resetAllMocks();
    // Create a new instance for each test
    service = new ApiService();

    // Mock axios.create to return mockedAxios
    mockedAxios.create = jest.fn(() => mockedAxios);
  });

  describe('getAllPosts', () => {
    it('should return all posts on successful API call', async () => {
      // Setup mock response
      mockedAxios.get.mockResolvedValueOnce({ data: mockPosts });

      // Call the method
      const result = await service.getAllPosts();

      // Assertions
      expect(mockedAxios.get).toHaveBeenCalledWith('/posts');
      expect(result.data?.posts).toEqual(mockPosts.slice(0, 10));
      expect(result.data?.total).toBe(mockPosts.length);
      expect(result.error).toBeNull();
    });

    it('should handle error when API call fails', async () => {
      // Setup mock error response
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce({
        message: errorMessage,
        response: { status: 500 },
      });

      // Call the method
      const result = await service.getAllPosts();

      // Assertions
      expect(result.data).toBeNull();
      expect(result.error).toEqual(
        expect.objectContaining({ message: errorMessage, status: 500 })
      );
    });
  });

  describe('getPostById', () => {
    it('should return a post by ID on successful API call', async () => {
      // Setup mock response
      mockedAxios.get.mockResolvedValueOnce({ data: mockPost });

      // Call the method
      const result = await service.getPostById(1);

      // Assertions
      expect(mockedAxios.get).toHaveBeenCalledWith('/posts/1');
      expect(result.data).toEqual(mockPost);
      expect(result.error).toBeNull();
    });

    it('should handle error when API call fails', async () => {
      // Setup mock error response
      const errorMessage = 'Not Found';
      mockedAxios.get.mockRejectedValueOnce({
        message: errorMessage,
        response: { status: 404 },
      });

      // Call the method
      const result = await service.getPostById(999);

      // Assertions
      expect(result.data).toBeNull();
      expect(result.error).toEqual(
        expect.objectContaining({ message: errorMessage, status: 404 })
      );
    });
  });

  describe('getPostComments', () => {
    it('should return comments for a post on successful API call', async () => {
      // Setup mock response
      mockedAxios.get.mockResolvedValueOnce({ data: mockComments });

      // Call the method
      const result = await service.getPostComments(1);

      // Assertions
      expect(mockedAxios.get).toHaveBeenCalledWith('/posts/1/comments');
      expect(result.data).toEqual(mockComments);
      expect(result.error).toBeNull();
    });

    it('should handle error when API call fails', async () => {
      // Setup mock error response
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce({ message: errorMessage });

      // Call the method
      const result = await service.getPostComments(1);

      // Assertions
      expect(result.data).toBeNull();
      expect(result.error?.message).toBe(errorMessage);
    });
  });

  describe('getPostWithComments', () => {
    it('should return a post with its comments on successful API calls', async () => {
      // Setup mock responses - we need to mock twice since this method makes two API calls
      // First for the post
      mockedAxios.get.mockResolvedValueOnce({ data: mockPost });
      // Then for the comments
      mockedAxios.get.mockResolvedValueOnce({ data: mockComments });

      // Call the method
      const result = await service.getPostWithComments(1);

      // Assertions
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual({ post: mockPost, comments: mockComments });
      expect(result.error).toBeNull();
    });

    it('should handle error when post API call fails', async () => {
      // Setup mock error response for post request
      const errorMessage = 'Not Found';
      mockedAxios.get.mockRejectedValueOnce({
        message: errorMessage,
        response: { status: 404 },
      });

      // Call the method
      const result = await service.getPostWithComments(999);

      // Assertions
      expect(mockedAxios.get).toHaveBeenCalledTimes(1); // Only the first API call is made
      expect(result.data).toBeNull();
      expect(result.error).toEqual(
        expect.objectContaining({ message: errorMessage, status: 404 })
      );
    });

    it('should handle error when comments API call fails', async () => {
      // Setup mock response for post request
      mockedAxios.get.mockResolvedValueOnce({ data: mockPost });
      // Setup mock error response for comments request
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce({ message: errorMessage });

      // Call the method
      const result = await service.getPostWithComments(1);

      // Assertions
      expect(mockedAxios.get).toHaveBeenCalledTimes(2); // Both API calls are made
      expect(result.data).toBeNull();
      expect(result.error?.message).toBe(errorMessage);
    });
  });

  describe('getPostsByUser', () => {
    it('should return posts by a specific user on successful API call', async () => {
      // Setup mock response
      mockedAxios.get.mockResolvedValueOnce({ data: mockPosts });

      // Call the method
      const result = await service.getPostsByUser(1);

      // Assertions
      expect(mockedAxios.get).toHaveBeenCalledWith('/posts', {
        params: { userId: 1 },
      });
      expect(result.data?.posts).toEqual(mockPosts.slice(0, 10));
      expect(result.data?.total).toBe(mockPosts.length);
      expect(result.error).toBeNull();
    });

    it('should handle error when API call fails', async () => {
      // Setup mock error response
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce({ message: errorMessage });

      // Call the method
      const result = await service.getPostsByUser(1);

      // Assertions
      expect(result.data).toBeNull();
      expect(result.error?.message).toBe(errorMessage);
    });
  });

  // Testing the exported singleton instance
  describe('apiService singleton', () => {
    it('should be an instance of ApiService', () => {
      expect(apiService).toBeInstanceOf(ApiService);
    });
  });
});
