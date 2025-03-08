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

export interface PostsData {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}

export interface Author {
  id: number;
  name: string;
}

export interface Theme {
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
  border: {
    light: string;
  };
  background: {
    primary: string;
    secondary: string;
    card: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  button: {
    primary: {
      background: string;
      text: string;
    };
    accent: {
      background: string;
      text: string;
    };
  };
  shadow?: {
    color: string;
  };
  error: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: {
    message: string;
  };
}

export interface PaginatedResponse<T> {
  posts: T[];
  total: number;
}
