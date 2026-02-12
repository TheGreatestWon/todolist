import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import styles from './LoginPage.module.css';

/**
 * LoginPage Component
 *
 * 로그인 페이지
 * - LoginForm 컴포넌트를 포함
 * - "계정이 없으신가요? 회원가입" 링크 포함
 * - 이미 로그인한 사용자가 접근 시 /todos로 리다이렉트
 */
const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 이미 로그인한 사용자는 할 일 목록 페이지로 리다이렉트
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.appTitle}>할 일 관리</h1>
        <h2 className={styles.sectionTitle}>로그인</h2>
        
        <LoginForm className={styles.loginForm} />
        
        <p className={styles.linkText}>
          계정이 없으신가요?{' '}
          <Link to="/register" className={styles.link}>
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;