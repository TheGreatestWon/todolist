import { User } from './user.types';
import { Todo } from './todo.types';

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
    created_at: string; // ISO 8601 format
    updated_at: string; // ISO 8601 format
  };
}

/**
 * Todos list response interface
 */
export interface TodosResponse {
  todos: Todo[];
}

/**
 * Single todo response interface
 */
export interface TodoResponse {
  todo: Todo;
}

/**
 * Delete todo response interface
 */
export interface DeleteTodoResponse {
  message: string;
  id: number;
}
