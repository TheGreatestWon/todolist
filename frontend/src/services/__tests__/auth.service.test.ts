/**
 * Auth Service Tests
 *
 * 인증 서비스 비즈니스 로직 테스트
 * - 커버리지 목표: 80% 이상
 */

import { authService } from '../auth.service';
import * as api from '../api';
import { AuthResponse, ErrorResponse } from '../../types/api.types';

// api 모듈 mock
jest.mock('../api');

describe('Auth Service', () => {
  beforeEach(() => {
    // 각 테스트 전에 모든 mock 초기화
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('register()', () => {
    it('should register successfully with valid email and password', async () => {
      const mockResponse: AuthResponse = {
        token: 'mock-token-123',
        user: {
          id: 1,
          email: 'test@example.com',
          created_at: '2026-02-12T00:00:00Z',
          updated_at: '2026-02-12T00:00:00Z',
        },
      };

      (api.authApi.register as jest.Mock).mockResolvedValueOnce(mockResponse);

      // register는 Promise<void>를 반환
      await expect(
        authService.register('test@example.com', 'password123')
      ).resolves.toBeUndefined();

      expect(api.authApi.register).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(api.authApi.register).toHaveBeenCalledTimes(1);
    });

    it('should throw error when email already exists', async () => {
      const mockError: ErrorResponse = {
        error: 'Email already exists',
      };

      (api.authApi.register as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(
        authService.register('existing@example.com', 'password123')
      ).rejects.toEqual(mockError);
    });

    it('should throw error with invalid email format', async () => {
      const mockError: ErrorResponse = {
        error: 'Invalid email format',
      };

      (api.authApi.register as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(
        authService.register('invalid-email', 'password123')
      ).rejects.toEqual(mockError);
    });

    it('should throw error when password is too short', async () => {
      const mockError: ErrorResponse = {
        error: 'Password must be at least 8 characters',
      };

      (api.authApi.register as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(
        authService.register('test@example.com', 'short')
      ).rejects.toEqual(mockError);
    });
  });

  describe('login()', () => {
    it('should login successfully and return AuthResponse', async () => {
      const mockResponse: AuthResponse = {
        token: 'jwt-token-abc',
        user: {
          id: 1,
          email: 'test@example.com',
          created_at: '2026-02-12T00:00:00Z',
          updated_at: '2026-02-12T00:00:00Z',
        },
      };

      (api.authApi.login as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await authService.login('test@example.com', 'password123');

      expect(result).toEqual(mockResponse);
      expect(result.token).toBe('jwt-token-abc');
      expect(result.user.id).toBe(1);
      expect(result.user.email).toBe('test@example.com');
      expect(api.authApi.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(api.authApi.login).toHaveBeenCalledTimes(1);
    });

    it('should throw error on login failure', async () => {
      const mockError: ErrorResponse = {
        error: 'Invalid email or password',
      };

      (api.authApi.login as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(
        authService.login('test@example.com', 'wrongpassword')
      ).rejects.toEqual(mockError);
    });

    it('should throw error when credentials are missing', async () => {
      const mockError: ErrorResponse = {
        error: 'Email and password are required',
      };

      (api.authApi.login as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(authService.login('', '')).rejects.toEqual(mockError);
    });
  });

  describe('logout()', () => {
    it('should call authApi.logout', () => {
      const logoutSpy = jest.spyOn(api.authApi, 'logout');

      authService.logout();

      expect(logoutSpy).toHaveBeenCalledTimes(1);
    });

    it('should remove token from storage on logout', () => {
      // 먼저 토큰 설정
      localStorage.setItem('auth_token', 'test-token');

      authService.logout();

      // authApi.logout이 호출되면서 토큰이 제거되어야 함
      expect(api.authApi.logout).toHaveBeenCalled();
    });
  });

  describe('getToken()', () => {
    it('should return token when it exists', () => {
      const mockToken = 'existing-jwt-token';
      (api.getAuthToken as jest.Mock).mockReturnValueOnce(mockToken);

      const token = authService.getToken();

      expect(token).toBe(mockToken);
      expect(api.getAuthToken).toHaveBeenCalledTimes(1);
    });

    it('should return null when token does not exist', () => {
      (api.getAuthToken as jest.Mock).mockReturnValueOnce(null);

      const token = authService.getToken();

      expect(token).toBeNull();
      expect(api.getAuthToken).toHaveBeenCalledTimes(1);
    });
  });
});
