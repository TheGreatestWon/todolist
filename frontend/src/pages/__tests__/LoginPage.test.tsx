import React from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import LoginPage from '../LoginPage';

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

describe('LoginPage', () => {
  const renderWithProviders = () => {
    return render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>
    );
  };

  test('renders login form elements', () => {
    renderWithProviders();
    
    expect(screen.getByRole('heading', { name: /로그인/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
    
    // Check for the link to register page
    expect(screen.getByRole('link', { name: /회원가입/i })).toBeInTheDocument();
  });

  test('shows app title', () => {
    renderWithProviders();
    
    expect(screen.getByText(/할 일 관리/i)).toBeInTheDocument();
  });
});