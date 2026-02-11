/**
 * Generic API response type
 */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Error response interface
 */
export interface ErrorResponse {
  error: string;
}

/**
 * Authentication response interface
 */
export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    created_at: string;
    updated_at: string;
  };
}