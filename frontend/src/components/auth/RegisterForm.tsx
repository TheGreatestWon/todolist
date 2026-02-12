import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import type { ErrorResponse } from '../../types/api.types';
import styles from './RegisterForm.module.css';

/**
 * RegisterForm Props
 */
interface RegisterFormProps {
  className?: string;
}

/**
 * 회원가입 폼 컴포넌트
 *
 * 기능:
 * - 이메일, 비밀번호 입력 필드
 * - 입력 검증 (이메일 형식, 비밀번호 8자 이상)
 * - useAuth 훅을 통한 회원가입
 * - 성공 시 /login으로 리다이렉트
 */
const RegisterForm: React.FC<RegisterFormProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  // 폼 상태
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // 에러 상태
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  /**
   * 이메일 형식 검증
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('이메일을 입력해주세요');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다');
      return false;
    }
    setEmailError('');
    return true;
  };

  /**
   * 비밀번호 검증
   */
  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다');
      return false;
    }
    setPasswordError('');
    return true;
  };

  /**
   * 이메일 입력 핸들러
   */
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setEmail(value);
    // 입력 중에는 에러 메시지 제거
    if (emailError) {
      setEmailError('');
    }
    if (formError) {
      setFormError('');
    }
  };

  /**
   * 비밀번호 입력 핸들러
   */
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setPassword(value);
    // 입력 중에는 에러 메시지 제거
    if (passwordError) {
      setPasswordError('');
    }
    if (formError) {
      setFormError('');
    }
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    // 입력 검증
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    // 회원가입 시도
    try {
      await register(email, password);
      // 성공 시 로그인 페이지로 리다이렉트
      navigate('/login');
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      setFormError(errorResponse.error || '회원가입 중 오류가 발생했습니다');
    }
  };

  const formClassName = [styles.form, className].filter(Boolean).join(' ');

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <div className={styles.formGroup}>
        <Input
          type="email"
          label="이메일"
          value={email}
          onChange={handleEmailChange}
          placeholder="example@email.com"
          error={emailError}
          disabled={isLoading}
          required
          autoComplete="email"
          name="email"
        />
      </div>

      <div className={styles.formGroup}>
        <Input
          type="password"
          label="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          placeholder="8자 이상 입력"
          error={passwordError}
          disabled={isLoading}
          required
          autoComplete="new-password"
          name="password"
        />
      </div>

      {formError && (
        <div className={styles.formError} role="alert">
          {formError}
        </div>
      )}

      <Button type="submit" disabled={isLoading} variant="primary">
        {isLoading ? '가입 중...' : '가입하기'}
      </Button>
    </form>
  );
};

export default RegisterForm;
