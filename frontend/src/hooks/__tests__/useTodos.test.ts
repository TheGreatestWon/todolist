import { renderHook, act } from '@testing-library/react';
import { useTodos } from '../../hooks/useTodos';

// Mock the todoService
jest.mock('../../services/todo.service', () => ({
  todoService: {
    getTodos: jest.fn(),
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
  },
}));

describe('useTodos', () => {
  const { getTodos, createTodo, updateTodo, deleteTodo } = require('../../services/todo.service').todoService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with loading state and fetches todos', async () => {
    (getTodos as jest.MockedFunction<any>).mockResolvedValue([]);

    const { result } = renderHook(() => useTodos());

    // Initially loading should be true
    expect(result.current.loading).toBe(true);

    // Wait for the async operation to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(getTodos).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.todos).toEqual([]);
  });

  test('fetches todos successfully', async () => {
    const mockTodos = [
      {
        id: 1,
        user_id: 1,
        title: 'Test todo',
        description: 'Test description',
        due_date: '2023-12-31',
        is_completed: false,
        created_at: '',
        updated_at: '',
      },
    ];
    (getTodos as jest.MockedFunction<any>).mockResolvedValue(mockTodos);

    const { result } = renderHook(() => useTodos());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.todos).toEqual(mockTodos);
  });

  test('handles error when fetching todos', async () => {
    const errorMessage = 'Failed to fetch todos';
    (getTodos as jest.MockedFunction<any>).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useTodos());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe(errorMessage);
  });

  test('creates a new todo', async () => {
    const newTodo = {
      id: 2,
      user_id: 1,
      title: 'New todo',
      description: 'New description',
      due_date: '2023-12-31',
      is_completed: false,
      created_at: '',
      updated_at: '',
    };
    (createTodo as jest.MockedFunction<any>).mockResolvedValue(newTodo);

    const { result } = renderHook(() => useTodos());

    await act(async () => {
      await result.current.createTodo({
        title: 'New todo',
        description: 'New description',
        due_date: '2023-12-31',
      });
    });

    expect(createTodo).toHaveBeenCalledWith({
      title: 'New todo',
      description: 'New description',
      due_date: '2023-12-31',
    });
    expect(result.current.todos).toContainEqual(newTodo);
  });

  test('updates a todo', async () => {
    const initialTodos = [
      {
        id: 1,
        user_id: 1,
        title: 'Old title',
        description: 'Old description',
        due_date: '2023-12-31',
        is_completed: false,
        created_at: '',
        updated_at: '',
      },
    ];
    (getTodos as jest.MockedFunction<any>).mockResolvedValue(initialTodos);

    const updatedTodo = {
      ...initialTodos[0],
      title: 'Updated title',
    };
    (updateTodo as jest.MockedFunction<any>).mockResolvedValue(updatedTodo);

    const { result } = renderHook(() => useTodos());

    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    await act(async () => {
      await result.current.updateTodo(1, { title: 'Updated title' });
    });

    expect(updateTodo).toHaveBeenCalledWith(1, { title: 'Updated title' });
    expect(result.current.todos).toContainEqual(updatedTodo);
  });

  test('deletes a todo', async () => {
    const initialTodos = [
      {
        id: 1,
        user_id: 1,
        title: 'Todo to delete',
        description: 'Description',
        due_date: '2023-12-31',
        is_completed: false,
        created_at: '',
        updated_at: '',
      },
      {
        id: 2,
        user_id: 1,
        title: 'Another todo',
        description: 'Description',
        due_date: '2023-12-31',
        is_completed: false,
        created_at: '',
        updated_at: '',
      },
    ];
    (getTodos as jest.MockedFunction<any>).mockResolvedValue(initialTodos);

    (deleteTodo as jest.MockedFunction<any>).mockResolvedValue(undefined);

    const { result } = renderHook(() => useTodos());

    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    await act(async () => {
      await result.current.deleteTodo(1);
    });

    expect(deleteTodo).toHaveBeenCalledWith(1);
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].id).toBe(2);
  });

  test('toggles todo completion status', async () => {
    const initialTodos = [
      {
        id: 1,
        user_id: 1,
        title: 'Test todo',
        description: 'Test description',
        due_date: '2023-12-31',
        is_completed: false,
        created_at: '',
        updated_at: '',
      },
    ];
    (getTodos as jest.MockedFunction<any>).mockResolvedValue(initialTodos);

    const updatedTodo = {
      ...initialTodos[0],
      is_completed: true,
    };
    (updateTodo as jest.MockedFunction<any>).mockResolvedValue(updatedTodo);

    const { result } = renderHook(() => useTodos());

    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    await act(async () => {
      await result.current.toggleComplete(1);
    });

    expect(updateTodo).toHaveBeenCalledWith(1, { is_completed: true });
    expect(result.current.todos[0].is_completed).toBe(true);
  });
});