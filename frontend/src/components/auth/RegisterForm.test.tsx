import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import RegisterForm from './RegisterForm';

// Mock useAuth hook
jest.mock('../../context/AuthContext', () => {
  const originalModule = jest.requireActual('../../context/AuthContext');
  
  // Mock state variables
  let mockRegister = jest.fn();
  let mockIsLoading = false;
  let mockIsAuthenticated = false;

  return {
    ...originalModule,
    useAuth: () => ({
      register: mockRegister,
      isLoading: mockIsLoading,
      isAuthenticated: mockIsAuthenticated,
      user: null,
      token: null,
      login: jest.fn(),
      logout: jest.fn(),
      // Allow tests to update the mock state
      __updateMockState: (newState: { register?: any; isLoading?: boolean; isAuthenticated?: boolean }) => {
        if (newState.register !== undefined) mockRegister = newState.register;
        if (newState.isLoading !== undefined) mockIsLoading = newState.isLoading;
        if (newState.isAuthenticated !== undefined) mockIsAuthenticated = newState.isAuthenticated;
      },
    }),
  };
});

describe('RegisterForm', () => {
  // Get the mocked useAuth function
  const getMockedUseAuth = () => require('../../context/AuthContext').useAuth();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock state to default
    const { useAuth } = require('../../context/AuthContext');
    useAuth().__updateMockState({
      register: jest.fn().mockResolvedValue(undefined),
      isLoading: false,
      isAuthenticated: false,
    });
  });

  test('renders registration form elements', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /가입하기/i })).toBeInTheDocument();
  });

  test('shows validation errors for invalid inputs', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </MemoryRouter>
    );
    
    const emailInput = screen.getByLabelText(/이메일/i);
    const passwordInput = screen.getByLabelText(/비밀번호/i);
    const submitButton = screen.getByRole('button', { name: /가입하기/i });
    
    // Test empty form submission
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/이메일을 입력해주세요/i)).toBeInTheDocument();
      expect(screen.getByText(/비밀번호를 입력해주세요/i)).toBeInTheDocument();
    });
    
    // Test invalid email format
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/올바른 이메일 형식이 아닙니다/i)).toBeInTheDocument();
    });
    
    // Test short password
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/비밀번호는 8자 이상이어야 합니다/i)).toBeInTheDocument();
    });
  });

  test('calls register function with valid inputs', async () => {
    const mockRegister = jest.fn().mockResolvedValue(undefined);
    const { useAuth } = require('../../context/AuthContext');
    useAuth().__updateMockState({ register: mockRegister });

    render(
      <MemoryRouter>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </MemoryRouter>
    );
    
    const emailInput = screen.getByLabelText(/이메일/i);
    const passwordInput = screen.getByLabelText(/비밀번호/i);
    const submitButton = screen.getByRole('button', { name: /가입하기/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  test('shows error message when registration fails', async () => {
    const mockRegister = jest.fn().mockRejectedValue({ error: 'Email already exists' });
    const { useAuth } = require('../../context/AuthContext');
    useAuth().__updateMockState({ register: mockRegister });

    render(
      <MemoryRouter>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </MemoryRouter>
    );
    
    const emailInput = screen.getByLabelText(/이메일/i);
    const passwordInput = screen.getByLabelText(/비밀번호/i);
    const submitButton = screen.getByRole('button', { name: /가입하기/i });
    
    fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Email already exists/i)).toBeInTheDocument();
    });
  });

  test('shows loading state during registration', async () => {
    // Create a delayed promise to simulate API call
    const registerPromise = new Promise((resolve) => {
      setTimeout(() => resolve(undefined), 10);
    });
    const mockRegister = jest.fn().mockReturnValue(registerPromise);
    
    // Initially not loading
    const { useAuth } = require('../../context/AuthContext');
    useAuth().__updateMockState({ 
      register: mockRegister,
      isLoading: false 
    });

    const { rerender } = render(
      <MemoryRouter>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </MemoryRouter>
    );
    
    const emailInput = screen.getByLabelText(/이메일/i);
    const passwordInput = screen.getByLabelText(/비밀번호/i);
    const submitButton = screen.getByRole('button', { name: /가입하기/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);
    
    // Update mock to reflect loading state
    useAuth().__updateMockState({ 
      register: mockRegister,
      isLoading: true 
    });
    
    // Re-render to update the component with new state
    rerender(
      <MemoryRouter>
        <AuthProvider>
          <RegisterForm />
        </AuthProvider>
      </MemoryRouter>
    );
    
    // Check that button is disabled and loading text is shown
    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/가입 중\.\.\./i)).toBeInTheDocument();
  });
});