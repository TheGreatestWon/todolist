/**
 * Barrel file for all type definitions
 * Provides centralized export for easy imports throughout the application
 */

// User types
export type { User, RegisterDto, LoginDto } from './user.types';

// Todo types
export type {
  Todo,
  CreateTodoDto,
  UpdateTodoDto,
  TodoWithStatus
} from './todo.types';
export { TodoStatus } from './todo.types';

// API types
export type {
  ApiResponse,
  ErrorResponse,
  AuthResponse,
  TodosResponse,
  TodoResponse,
  DeleteTodoResponse
} from './api.types';
