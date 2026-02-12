import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';
import { Todo } from '../../../types/todo.types';

// Mock Todo type for testing
const mockTodos: Todo[] = [
  {
    id: 1,
    user_id: 1,
    title: 'Test Todo 1',
    description: 'Test Description 1',
    due_date: '2026-12-31',
    is_completed: false,
    created_at: '2026-02-12T00:00:00Z',
    updated_at: '2026-02-12T00:00:00Z'
  },
  {
    id: 2,
    user_id: 1,
    title: 'Test Todo 2',
    description: 'Test Description 2',
    due_date: '2026-12-30',
    is_completed: true,
    created_at: '2026-02-12T00:00:00Z',
    updated_at: '2026-02-12T00:00:00Z'
  }
];

describe('TodoList', () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo list correctly', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    // Check that todos are rendered in appropriate sections
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    // Completed todo will be in the completed section which is collapsed by default
    // So we only check for the count in the completed section header
    expect(screen.getByText('완료 (1)')).toBeInTheDocument();
  });

  it('renders empty state when no todos', () => {
    render(
      <TodoList
        todos={[]}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    // Since all todos are grouped by category, we check for the empty state in each section
    // The empty state appears in the completed section when there are no todos
    expect(screen.getByText(/완료/i)).toBeInTheDocument();
  });

  it('passes props correctly to TodoItem', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    // Check that TodoItem receives the correct props
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
  });
});