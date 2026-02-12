import React from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import RegisterPage from '../RegisterPage';

// Mock the useAuth hook
jest.mock('../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: () => ({
    isAuthenticated: false,
    isLoading: false,
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
  }),
}));

describe('RegisterPage', () => {
  const renderWithProviders = () => {
    return render(
      <AuthProvider>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthProvider>
    );
  };

  test('renders register form elements', () => {
    renderWithProviders();

    expect(screen.getByRole('heading', { name: /회원가입/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /가입하기/i })).toBeInTheDocument();

    // Check for the link to login page
    expect(screen.getByRole('link', { name: /로그인/i })).toBeInTheDocument();
  });

  test('shows app title', () => {
    renderWithProviders();
    
    expect(screen.getByText(/할 일 관리/i)).toBeInTheDocument();
  });
});