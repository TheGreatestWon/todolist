import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../TodoItem';
import { Todo } from '../../../types/todo.types';

// Mock Todo type for testing
const mockTodo: Todo = {
  id: 1,
  user_id: 1,
  title: 'Test Todo',
  description: 'Test Description',
  due_date: '2026-12-31',
  is_completed: false,
  created_at: '2026-02-12T00:00:00Z',
  updated_at: '2026-02-12T00:00:00Z'
};

describe('TodoItem', () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo item correctly', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('📅 2026-12-31')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith(1, { is_completed: true });
  });

  it('calls onDelete when delete button is clicked', () => {
    // Mock window.confirm to return true
    window.confirm = jest.fn(() => true);

    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /할 일 삭제/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('shows completed style when todo is completed', () => {
    const completedTodo = { ...mockTodo, is_completed: true };
    
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const todoCard = screen.getByText('Test Todo').closest('.todoCard');
    expect(todoCard).toHaveClass('completed');
  });

  it('shows overdue style when todo is overdue', () => {
    const overdueTodo = { 
      ...mockTodo, 
      due_date: '2020-01-01', // Past date
      is_completed: false 
    };
    
    render(
      <TodoItem
        todo={overdueTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const dueDateElement = screen.getByText('📅 2020-01-01');
    expect(dueDateElement).toHaveClass('overdue');
  });
});