import { RegisterDto, LoginDto } from '../types/user.types';
import { CreateTodoDto, UpdateTodoDto } from '../types/todo.types';
import {
  ApiResponse,
  ErrorResponse,
  AuthResponse,
  TodosResponse,
  TodoResponse,
  DeleteTodoResponse,
} from '../types/api.types';

// API Base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Token storage key
const TOKEN_KEY = 'auth_token';

/**
 * localStorage에서 인증 토큰 가져오기
 * @returns 저장된 토큰 또는 null
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * localStorage에 인증 토큰 저장
 * @param token - 저장할 JWT 토큰
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * localStorage에서 인증 토큰 제거
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * HTTP 요청을 위한 공통 래퍼 함수
 * - JWT 토큰 자동 포함
 * - JSON Content-Type 자동 설정
 * - 401 응답 시 토큰 자동 제거
 *
 * @param endpoint - API 엔드포인트 (예: '/auth/login')
 * @param options - fetch API의 RequestInit 옵션
 * @returns 파싱된 응답 데이터
 * @throws ErrorResponse - API 에러 발생 시
 */
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();

  // 기본 헤더 설정
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // 기존 헤더 병합
  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      if (typeof value === 'string') {
        headers[key] = value;
      }
    });
  }

  // JWT 토큰이 있으면 Authorization 헤더 추가
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // 401 Unauthorized 응답 처리
    if (response.status === 401) {
      removeAuthToken();
      const errorData = await response.json().catch(() => ({ error: 'Unauthorized' }));
      throw errorData as ErrorResponse;
    }

    // 응답 본문 파싱
    const data = await response.json();

    // 에러 응답 처리
    if (!response.ok) {
      throw data as ErrorResponse;
    }

    return data as T;
  } catch (error) {
    // 네트워크 에러 또는 JSON 파싱 에러
    if (error instanceof Error && !('error' in error)) {
      throw {
        error: error.message || 'Network error occurred',
      } as ErrorResponse;
    }
    throw error;
  }
};

/**
 * 인증 관련 API 함수들
 */
export const authApi = {
  /**
   * 회원가입
   * @param data - 회원가입 정보 (이메일, 비밀번호)
   * @returns 인증 토큰과 사용자 정보
   */
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * 로그인
   * - 성공 시 자동으로 토큰을 localStorage에 저장
   * @param data - 로그인 정보 (이메일, 비밀번호)
   * @returns 인증 토큰과 사용자 정보
   */
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // 로그인 성공 시 토큰 저장
    if (response.token) {
      setAuthToken(response.token);
    }

    return response;
  },

  /**
   * 로그아웃
   * - localStorage에서 토큰 제거
   */
  logout: (): void => {
    removeAuthToken();
  },
};

/**
 * Todo 관련 API 함수들
 */
export const todoApi = {
  /**
   * 모든 할 일 목록 조회
   * @returns 할 일 목록
   */
  getTodos: async (): Promise<TodosResponse> => {
    return apiRequest<TodosResponse>('/todos', {
      method: 'GET',
    });
  },

  /**
   * 새로운 할 일 생성
   * @param data - 할 일 생성 정보
   * @returns 생성된 할 일
   */
  createTodo: async (data: CreateTodoDto): Promise<TodoResponse> => {
    return apiRequest<TodoResponse>('/todos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * 할 일 수정
   * @param id - 할 일 ID
   * @param data - 수정할 정보
   * @returns 수정된 할 일
   */
  updateTodo: async (id: number, data: UpdateTodoDto): Promise<TodoResponse> => {
    return apiRequest<TodoResponse>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * 할 일 삭제
   * @param id - 할 일 ID
   * @returns 삭제 결과 메시지
   */
  deleteTodo: async (id: number): Promise<DeleteTodoResponse> => {
    return apiRequest<DeleteTodoResponse>(`/todos/${id}`, {
      method: 'DELETE',
    });
  },
};
