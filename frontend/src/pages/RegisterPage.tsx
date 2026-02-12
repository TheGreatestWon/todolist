import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import styles from './RegisterPage.module.css';

/**
 * RegisterPage Component
 *
 * 회원가입 페이지
 * - RegisterForm 컴포넌트를 포함
 * - "이미 계정이 있으신가요? 로그인" 링크 포함
 * - 이미 로그인한 사용자가 접근 시 /todos로 리다이렉트
 */
const RegisterPage: React.FC = () => {
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
        <h2 className={styles.sectionTitle}>회원가입</h2>
        
        <RegisterForm className={styles.registerForm} />
        
        <p className={styles.linkText}>
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className={styles.link}>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;