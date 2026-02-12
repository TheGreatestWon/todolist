import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { authService } from '../../services/auth.service';
import { User } from '../../types';

// Mock authService
jest.mock('../../services/auth.service', () => ({
  authService: {
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
    getToken: jest.fn(),
  },
}));

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  describe('AuthProvider initialization', () => {
    it('should initialize with no user when no token exists', () => {
      // Arrange
      (authService.getToken as jest.Mock).mockReturnValue(null);

      // Act
      const { result } = renderHook(() => useAuth(), { wrapper });

      // Assert
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it('should restore token from localStorage on mount', async () => {
      // Arrange
      const savedToken = 'saved-jwt-token';
      (authService.getToken as jest.Mock).mockReturnValue(savedToken);

      // Act
      const { result } = renderHook(() => useAuth(), { wrapper });

      // Assert
      await waitFor(() => {
        expect(result.current.token).toBe(savedToken);
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('should set isLoading to false after initialization', async () => {
      // Arrange
      (authService.getToken as jest.Mock).mockReturnValue(null);

      // Act
      const { result } = renderHook(() => useAuth(), { wrapper });

      // Assert
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe('login()', () => {
    it('should login successfully and set user/token', async () => {
      // Arrange
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        created_at: '2026-02-11T10:00:00Z',
        updated_at: '2026-02-11T10:00:00Z',
      };

      const mockAuthResponse = {
        token: 'jwt-token-123',
        user: mockUser,
      };

      (authService.getToken as jest.Mock).mockReturnValue(null);
      (authService.login as jest.Mock).mockResolvedValue(mockAuthResponse);

      const { result } = renderHook(() => useAuth(), { wrapper });

      // Act
      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      // Assert
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(result.current.token).toBe('jwt-token-123');
      expect(result.current.user).toEqual(mockUser);
    });

    it('should set isAuthenticated to true after login', async () => {
      // Arrange
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        created_at: '2026-02-11T10:00:00Z',
        updated_at: '2026-02-11T10:00:00Z',
      };

      const mockAuthResponse = {
        token: 'jwt-token-123',
        user: mockUser,
      };

      (authService.getToken as jest.Mock).mockReturnValue(null);
      (authService.login as jest.Mock).mockResolvedValue(mockAuthResponse);

      const { result } = renderHook(() => useAuth(), { wrapper });

      // Act
      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      // Assert
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should throw error on login failure', async () => {
      // Arrange
      const mockError = { error: 'Invalid email or password' };
      (authService.getToken as jest.Mock).mockReturnValue(null);
      (authService.login as jest.Mock).mockRejectedValue(mockError);

      const { result } = renderHook(() => useAuth(), { wrapper });

      // Act & Assert
      await expect(
        act(async () => {
          await result.current.login('wrong@example.com', 'wrongpassword');
        })
      ).rejects.toEqual(mockError);

      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
    });
  });

  describe('logout()', () => {
    it('should clear user and token on logout', async () => {
      // Arrange
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        created_at: '2026-02-11T10:00:00Z',
        updated_at: '2026-02-11T10:00:00Z',
      };

      const mockAuthResponse = {
        token: 'jwt-token-123',
        user: mockUser,
      };

      (authService.getToken as jest.Mock).mockReturnValue(null);
      (authService.login as jest.Mock).mockResolvedValue(mockAuthResponse);

      const { result } = renderHook(() => useAuth(), { wrapper });

      // 먼저 로그인
      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Act - 로그아웃
      act(() => {
        result.current.logout();
      });

      // Assert
      expect(authService.logout).toHaveBeenCalledTimes(1);
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
    });

    it('should set isAuthenticated to false after logout', async () => {
      // Arrange
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        created_at: '2026-02-11T10:00:00Z',
        updated_at: '2026-02-11T10:00:00Z',
      };

      const mockAuthResponse = {
        token: 'jwt-token-123',
        user: mockUser,
      };

      (authService.getToken as jest.Mock).mockReturnValue(null);
      (authService.login as jest.Mock).mockResolvedValue(mockAuthResponse);

      const { result } = renderHook(() => useAuth(), { wrapper });

      // 먼저 로그인
      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      // Act - 로그아웃
      act(() => {
        result.current.logout();
      });

      // Assert
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('register()', () => {
    it('should register successfully', async () => {
      // Arrange
      (authService.getToken as jest.Mock).mockReturnValue(null);
      (authService.register as jest.Mock).mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper });

      // Act
      await act(async () => {
        await result.current.register('newuser@example.com', 'password123');
      });

      // Assert
      expect(authService.register).toHaveBeenCalledTimes(1);
      expect(authService.register).toHaveBeenCalledWith('newuser@example.com', 'password123');
    });

    it('should throw error on registration failure', async () => {
      // Arrange
      const mockError = { error: 'Email already exists' };
      (authService.getToken as jest.Mock).mockReturnValue(null);
      (authService.register as jest.Mock).mockRejectedValue(mockError);

      const { result } = renderHook(() => useAuth(), { wrapper });

      // Act & Assert
      await expect(
        act(async () => {
          await result.current.register('existing@example.com', 'password123');
        })
      ).rejects.toEqual(mockError);

      expect(authService.register).toHaveBeenCalledTimes(1);
    });
  });

  describe('useAuth()', () => {
    it('should return context value when used within provider', () => {
      // Arrange & Act
      const { result } = renderHook(() => useAuth(), { wrapper });

      // Assert
      expect(result.current).toHaveProperty('user');
      expect(result.current).toHaveProperty('token');
      expect(result.current).toHaveProperty('isAuthenticated');
      expect(result.current).toHaveProperty('isLoading');
      expect(result.current).toHaveProperty('login');
      expect(result.current).toHaveProperty('logout');
      expect(result.current).toHaveProperty('register');
    });

    it('should throw error when used outside provider', () => {
      // Arrange
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Act & Assert
      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within AuthProvider');

      consoleErrorSpy.mockRestore();
    });
  });
});
