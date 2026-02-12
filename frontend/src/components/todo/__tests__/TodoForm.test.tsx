import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from '../TodoForm';
import { CreateTodoDto } from '../../../types/todo.types';

describe('TodoForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    render(<TodoForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/제목/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/설명/i)).toBeInTheDocument();
    expect(screen.getByText(/마감일:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /추가/i })).toBeInTheDocument();
  });

  it('allows entering title, description, and due date', () => {
    render(<TodoForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/제목/i);
    const descriptionInput = screen.getByLabelText(/설명/i);
    const dateInput = screen.getByLabelText(/마감일:/i);

    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.change(dateInput, { target: { value: '2026-12-31' } });

    expect(titleInput).toHaveValue('New Todo');
    expect(descriptionInput).toHaveValue('New Description');
    expect(dateInput).toHaveValue('2026-12-31');
  });

  it('submits form with correct data', () => {
    render(<TodoForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/제목/i);
    const descriptionInput = screen.getByLabelText(/설명/i);
    const dateInput = screen.getByLabelText(/마감일:/i);
    const submitButton = screen.getByRole('button', { name: /추가/i });

    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.change(dateInput, { target: { value: '2026-12-31' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'New Todo',
      description: 'New Description',
      due_date: '2026-12-31'
    });
  });

  it('validates required title field', () => {
    // Mock alert function
    window.alert = jest.fn();

    render(<TodoForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /추가/i });

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('제목을 입력해주세요');
  });

  it('resets form after submission', () => {
    render(<TodoForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/제목/i);
    const descriptionInput = screen.getByLabelText(/설명/i);
    const dateInput = screen.getByLabelText(/마감일:/i);
    const submitButton = screen.getByRole('button', { name: /추가/i });

    fireEvent.change(titleInput, { target: { value: 'New Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.change(dateInput, { target: { value: '2026-12-31' } });
    fireEvent.click(submitButton);

    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
    expect(dateInput).toHaveValue('');
  });
});