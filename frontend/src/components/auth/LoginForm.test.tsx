import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';

// Mock useAuth hook
jest.mock('../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: jest.fn(),
}));

const MockComponent: React.FC<{ mockAuthState?: any; children: React.ReactNode }> = ({ mockAuthState, children }) => {
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
  mockUseAuth.mockReturnValue({
    login: jest.fn().mockResolvedValue(undefined),
    isLoading: false,
    isAuthenticated: false,
    ...mockAuthState,
  });

  return <>{children}</>;
};

describe('LoginForm', () => {
  const renderWithProviders = (ui: React.ReactElement, mockAuthState?: any) => {
    return render(
      <MemoryRouter>
        <MockComponent mockAuthState={mockAuthState}>
          <AuthProvider>
            {ui}
          </AuthProvider>
        </MockComponent>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form elements', () => {
    renderWithProviders(<LoginForm />);
    
    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  test('shows validation errors for invalid inputs', async () => {
    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/이메일/i);
    const passwordInput = screen.getByLabelText(/비밀번호/i);
    const submitButton = screen.getByRole('button', { name: /로그인/i });
    
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

  test('calls login function with valid inputs', async () => {
    const mockLogin = jest.fn().mockResolvedValue(undefined);
    renderWithProviders(<LoginForm />, { login: mockLogin });
    
    const emailInput = screen.getByLabelText(/이메일/i);
    const passwordInput = screen.getByLabelText(/비밀번호/i);
    const submitButton = screen.getByRole('button', { name: /로그인/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  test('shows error message when login fails', async () => {
    const mockLogin = jest.fn().mockRejectedValue({ error: 'Invalid email or password' });
    renderWithProviders(<LoginForm />, { login: mockLogin });
    
    const emailInput = screen.getByLabelText(/이메일/i);
    const passwordInput = screen.getByLabelText(/비밀번호/i);
    const submitButton = screen.getByRole('button', { name: /로그인/i });
    
    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
    });
  });

  test('shows loading state during login', async () => {
    const mockLogin = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    renderWithProviders(<LoginForm />, { 
      login: mockLogin,
      isLoading: true 
    });
    
    const emailInput = screen.getByLabelText(/이메일/i);
    const passwordInput = screen.getByLabelText(/비밀번호/i);
    const submitButton = screen.getByRole('button', { name: /로그인/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);
    
    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/로그인 중\.\.\./i)).toBeInTheDocument();
  });
});