/**
 * API Client Tests
 */

import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  authApi,
  todoApi,
} from '../api';

// Mock fetch
global.fetch = jest.fn();

describe('API Client', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Token Management', () => {
    it('should set and get auth token', () => {
      const token = 'test-jwt-token';
      setAuthToken(token);
      expect(getAuthToken()).toBe(token);
    });

    it('should remove auth token', () => {
      setAuthToken('test-token');
      removeAuthToken();
      expect(getAuthToken()).toBeNull();
    });

    it('should return null when no token exists', () => {
      expect(getAuthToken()).toBeNull();
    });
  });

  describe('Auth API', () => {
    it('should register a new user', async () => {
      const mockResponse = { message: 'User registered successfully' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await authApi.register({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('should login and store token', async () => {
      const mockResponse = {
        token: 'jwt-token-123',
        user: {
          id: 1,
          email: 'test@example.com',
          created_at: '2026-02-12T00:00:00Z',
          updated_at: '2026-02-12T00:00:00Z',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await authApi.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toEqual(mockResponse);
      expect(getAuthToken()).toBe('jwt-token-123');
    });

    it('should logout and remove token', () => {
      setAuthToken('test-token');
      authApi.logout();
      expect(getAuthToken()).toBeNull();
    });

    it('should handle login error', async () => {
      const mockError = { error: 'Invalid email or password' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => mockError,
      });

      await expect(
        authApi.login({
          email: 'test@example.com',
          password: 'wrong',
        })
      ).rejects.toEqual(mockError);
    });
  });

  describe('Todo API', () => {
    beforeEach(() => {
      // Set token for authenticated requests
      setAuthToken('test-token');
    });

    it('should get todos with auth token', async () => {
      const mockResponse = {
        todos: [
          {
            id: 1,
            user_id: 1,
            title: 'Test Todo',
            description: null,
            due_date: '2026-02-15',
            is_completed: false,
            created_at: '2026-02-12T00:00:00Z',
            updated_at: '2026-02-12T00:00:00Z',
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await todoApi.getTodos();

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/todos'),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );
    });

    it('should create todo', async () => {
      const mockResponse = {
        todo: {
          id: 1,
          user_id: 1,
          title: 'New Todo',
          description: 'Description',
          due_date: '2026-02-20',
          is_completed: false,
          created_at: '2026-02-12T00:00:00Z',
          updated_at: '2026-02-12T00:00:00Z',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await todoApi.createTodo({
        title: 'New Todo',
        description: 'Description',
        due_date: '2026-02-20',
      });

      expect(result).toEqual(mockResponse);
    });

    it('should update todo', async () => {
      const mockResponse = {
        todo: {
          id: 1,
          user_id: 1,
          title: 'Updated Todo',
          description: null,
          due_date: null,
          is_completed: true,
          created_at: '2026-02-12T00:00:00Z',
          updated_at: '2026-02-12T00:00:00Z',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await todoApi.updateTodo(1, {
        title: 'Updated Todo',
        is_completed: true,
      });

      expect(result).toEqual(mockResponse);
    });

    it('should delete todo', async () => {
      const mockResponse = {
        message: 'Todo deleted successfully',
        id: 1,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await todoApi.deleteTodo(1);

      expect(result).toEqual(mockResponse);
    });

    it('should handle 401 and remove token', async () => {
      const mockError = { error: 'Authentication required' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => mockError,
      });

      await expect(todoApi.getTodos()).rejects.toEqual(mockError);
      expect(getAuthToken()).toBeNull(); // Token should be removed
    });

    it('should handle network error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      await expect(todoApi.getTodos()).rejects.toEqual({
        error: 'Network error',
      });
    });
  });
});
