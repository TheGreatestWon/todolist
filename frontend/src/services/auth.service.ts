import { authApi, getAuthToken } from './api';
import { AuthResponse } from '../types/api.types';

/**
 * Auth Service
 *
 * 인증 관련 비즈니스 로직을 담당하는 서비스
 * - API 래퍼 함수들을 통한 간접 접근
 * - 토큰 관리 (조회)
 */
export const authService = {
  /**
   * 회원가입
   *
   * @param email - 사용자 이메일
   * @param password - 사용자 비밀번호
   * @returns Promise<void>
   * @throws ErrorResponse - 회원가입 실패 시 에러 발생
   *
   * @example
   * await authService.register('user@example.com', 'password123');
   */
  register: async (email: string, password: string): Promise<void> => {
    await authApi.register({
      email,
      password,
    });
  },

  /**
   * 로그인
   *
   * @param email - 사용자 이메일
   * @param password - 사용자 비밀번호
   * @returns AuthResponse - 토큰과 사용자 정보
   * @throws ErrorResponse - 로그인 실패 시 에러 발생
   *
   * @example
   * const response = await authService.login('user@example.com', 'password123');
   * console.log(response.token);
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return authApi.login({
      email,
      password,
    });
  },

  /**
   * 로그아웃
   *
   * localStorage에서 토큰을 제거하고 인증 상태를 초기화합니다.
   *
   * @example
   * authService.logout();
   */
  logout: (): void => {
    authApi.logout();
  },

  /**
   * 저장된 인증 토큰 조회
   *
   * @returns 저장된 JWT 토큰 또는 null (토큰 없을 시)
   *
   * @example
   * const token = authService.getToken();
   * if (token) {
   *   console.log('User is authenticated');
   * }
   */
  getToken: (): string | null => {
    return getAuthToken();
  },
};
