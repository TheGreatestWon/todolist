import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute Props
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * 인증이 필요한 라우트를 위한 컴포넌트
 *
 * 기능:
 * - 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
 * - 인증 상태 로딩 중일 때는 로딩 표시
 * - 인증된 사용자만 자식 컴포넌트를 렌더링
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>로딩 중...</div>; // 또는 로딩 스피너 컴포넌트
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;