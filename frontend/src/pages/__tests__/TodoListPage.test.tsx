import React from '@testing-library/react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import TodoListPage from '../TodoListPage';

// Mock the useAuth hook
jest.mock('../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: () => ({
    user: { id: 1, email: 'test@example.com', created_at: '', updated_at: '' },
    token: 'fake-token',
    isAuthenticated: true,
    isLoading: false,
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
  }),
}));

// Mock the useTodos hook
jest.mock('../../hooks/useTodos', () => ({
  useTodos: () => ({
    todos: [],
    loading: false,
    error: null,
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
  }),
}));

describe('TodoListPage', () => {
  const renderWithProviders = () => {
    return render(
      <AuthProvider>
        <MemoryRouter>
          <TodoListPage />
        </MemoryRouter>
      </AuthProvider>
    );
  };

  test('renders header with app title and user email', () => {
    renderWithProviders();
    
    expect(screen.getByText(/할 일 관리/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/로그아웃/i)).toBeInTheDocument();
  });

  test('renders add todo section', () => {
    renderWithProviders();
    
    // Check that the form exists by looking for the form element
    const formElement = document.querySelector('form');
    expect(formElement).toBeInTheDocument();
    
    // Check for the form title specifically using a more specific query
    const formTitle = screen.getAllByText(/새로운 할 일 추가/i);
    expect(formTitle.length).toBeGreaterThan(0);
  });

  test('renders header with app title and user email', () => {
    renderWithProviders();
    
    expect(screen.getByText(/할 일 관리/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/로그아웃/i)).toBeInTheDocument();
  });
});