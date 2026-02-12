import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/auth.service';
import { User } from '../types';

/**
 * AuthContext의 값 타입 정의
 */
interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

/**
 * AuthProvider Props 타입
 */
interface AuthProviderProps {
  children: ReactNode;
}

// AuthContext 생성
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthProvider 컴포넌트
 *
 * 전역 인증 상태를 관리하고 자식 컴포넌트에 제공
 * - 초기 로드 시 localStorage에서 토큰 복원
 * - 로그인/로그아웃/회원가입 기능 제공
 * - 인증 상태 (isAuthenticated, isLoading) 관리
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 계산된 값: 토큰과 사용자 정보가 모두 있으면 인증됨
  const isAuthenticated = !!token && !!user;

  /**
   * 초기화: localStorage에서 토큰 복원
   */
  useEffect(() => {
    const savedToken = authService.getToken();

    if (savedToken) {
      setToken(savedToken);
      // MVP: 토큰만 복원, 사용자 정보는 API 호출 시 복원됨
      // TODO: /api/auth/me 엔드포인트가 생기면 사용자 정보도 복원
    }

    setIsLoading(false);
  }, []);

  /**
   * 로그인 함수
   *
   * @param email - 사용자 이메일
   * @param password - 사용자 비밀번호
   * @throws ErrorResponse - 로그인 실패 시
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);

      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      // 에러는 컴포넌트에서 처리하도록 전파
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 로그아웃 함수
   *
   * - localStorage에서 토큰 제거
   * - 상태 초기화
   */
  const logout = (): void => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  /**
   * 회원가입 함수
   *
   * @param email - 사용자 이메일
   * @param password - 사용자 비밀번호
   * @throws ErrorResponse - 회원가입 실패 시
   *
   * Note: 회원가입 후 자동 로그인하지 않음 (MVP 요구사항)
   */
  const register = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.register(email, password);
      // 회원가입 성공 - 컴포넌트에서 로그인 페이지로 리다이렉트
    } catch (error) {
      // 에러는 컴포넌트에서 처리하도록 전파
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth 커스텀 훅
 *
 * AuthContext를 사용하기 위한 훅
 * - AuthProvider 내부에서만 사용 가능
 *
 * @returns AuthContextValue
 * @throws Error - AuthProvider 외부에서 사용 시
 *
 * @example
 * const { user, login, logout, isAuthenticated } = useAuth();
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
