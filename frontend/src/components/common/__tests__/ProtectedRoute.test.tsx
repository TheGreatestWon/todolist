import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../../context/AuthContext';
import ProtectedRoute from '../ProtectedRoute';

// Mock useAuth hook
jest.mock('../../../context/AuthContext', () => ({
  ...jest.requireActual('../../../context/AuthContext'),
  useAuth: jest.fn(),
}));

const MockComponent: React.FC<{ mockAuthState?: any; children: React.ReactNode }> = ({ mockAuthState, children }) => {
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
  mockUseAuth.mockReturnValue({
    isAuthenticated: false,
    isLoading: false,
    user: null,
    token: null,
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
    ...mockAuthState,
  });

  return <>{children}</>;
};

describe('ProtectedRoute', () => {
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

  test('renders children when user is authenticated', () => {
    renderWithProviders(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      { isAuthenticated: true }
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('redirects to login when user is not authenticated', () => {
    renderWithProviders(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      { isAuthenticated: false }
    );

    // When not authenticated, it should redirect to login
    // We can't directly test the redirect, but we can check that the protected content is not rendered
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  test('shows loading state when loading', () => {
    renderWithProviders(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      { isLoading: true }
    );

    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  });
});