/**
 * Type definition tests
 * These tests verify that type definitions compile correctly
 */

import { User, RegisterDto, LoginDto } from '../user.types';
import { Todo, CreateTodoDto, UpdateTodoDto, TodoStatus } from '../todo.types';
import { AuthResponse, TodosResponse, ErrorResponse } from '../api.types';

describe('Type Definitions', () => {
  describe('User Types', () => {
    it('should create valid User object', () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        created_at: '2026-02-12T00:00:00Z',
        updated_at: '2026-02-12T00:00:00Z',
      };

      expect(user).toBeDefined();
      expect(user.id).toBe(1);
      expect(user.email).toBe('test@example.com');
    });

    it('should create valid RegisterDto object', () => {
      const registerDto: RegisterDto = {
        email: 'newuser@example.com',
        password: 'password123',
      };

      expect(registerDto).toBeDefined();
      expect(registerDto.email).toBe('newuser@example.com');
    });

    it('should create valid LoginDto object', () => {
      const loginDto: LoginDto = {
        email: 'user@example.com',
        password: 'password123',
      };

      expect(loginDto).toBeDefined();
      expect(loginDto.email).toBe('user@example.com');
    });
  });

  describe('Todo Types', () => {
    it('should create valid Todo object', () => {
      const todo: Todo = {
        id: 1,
        user_id: 1,
        title: 'Test Todo',
        description: 'Test description',
        due_date: '2026-02-15',
        is_completed: false,
        created_at: '2026-02-12T00:00:00Z',
        updated_at: '2026-02-12T00:00:00Z',
      };

      expect(todo).toBeDefined();
      expect(todo.title).toBe('Test Todo');
      expect(todo.is_completed).toBe(false);
    });

    it('should create valid CreateTodoDto object', () => {
      const createDto: CreateTodoDto = {
        title: 'New Todo',
        description: 'Description',
        due_date: '2026-02-20',
      };

      expect(createDto).toBeDefined();
      expect(createDto.title).toBe('New Todo');
    });

    it('should create valid UpdateTodoDto object', () => {
      const updateDto: UpdateTodoDto = {
        title: 'Updated Title',
        is_completed: true,
      };

      expect(updateDto).toBeDefined();
      expect(updateDto.is_completed).toBe(true);
    });

    it('should have TodoStatus enum values', () => {
      expect(TodoStatus.TODAY).toBe('TODAY');
      expect(TodoStatus.UPCOMING).toBe('UPCOMING');
      expect(TodoStatus.OVERDUE).toBe('OVERDUE');
      expect(TodoStatus.COMPLETED).toBe('COMPLETED');
      expect(TodoStatus.NO_DUE_DATE).toBe('NO_DUE_DATE');
    });
  });

  describe('API Types', () => {
    it('should create valid AuthResponse object', () => {
      const authResponse: AuthResponse = {
        token: 'jwt-token-here',
        user: {
          id: 1,
          email: 'user@example.com',
          created_at: '2026-02-12T00:00:00Z',
          updated_at: '2026-02-12T00:00:00Z',
        },
      };

      expect(authResponse).toBeDefined();
      expect(authResponse.token).toBe('jwt-token-here');
      expect(authResponse.user.email).toBe('user@example.com');
    });

    it('should create valid TodosResponse object', () => {
      const todosResponse: TodosResponse = {
        todos: [
          {
            id: 1,
            user_id: 1,
            title: 'Todo 1',
            description: null,
            due_date: '2026-02-15',
            is_completed: false,
            created_at: '2026-02-12T00:00:00Z',
            updated_at: '2026-02-12T00:00:00Z',
          },
        ],
      };

      expect(todosResponse).toBeDefined();
      expect(todosResponse.todos).toHaveLength(1);
    });

    it('should create valid ErrorResponse object', () => {
      const errorResponse: ErrorResponse = {
        error: 'Something went wrong',
      };

      expect(errorResponse).toBeDefined();
      expect(errorResponse.error).toBe('Something went wrong');
    });
  });
});
