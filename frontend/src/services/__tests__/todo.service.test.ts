import { todoService } from '../todo.service';
import { todoApi } from '../api';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../../types';
import { ErrorResponse } from '../../types/api.types';

// Mock todoApi
jest.mock('../api', () => ({
  todoApi: {
    getTodos: jest.fn(),
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
  },
}));

describe('todoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTodos()', () => {
    it('should fetch all todos successfully', async () => {
      // Arrange
      const mockTodos: Todo[] = [
        {
          id: 1,
          user_id: 1,
          title: 'Test Todo 1',
          description: 'Description 1',
          due_date: '2026-02-15',
          is_completed: false,
          created_at: '2026-02-11T10:00:00Z',
          updated_at: '2026-02-11T10:00:00Z',
        },
        {
          id: 2,
          user_id: 1,
          title: 'Test Todo 2',
          description: null,
          due_date: null,
          is_completed: true,
          created_at: '2026-02-10T09:00:00Z',
          updated_at: '2026-02-11T11:30:00Z',
        },
      ];

      (todoApi.getTodos as jest.Mock).mockResolvedValue({ todos: mockTodos });

      // Act
      const result = await todoService.getTodos();

      // Assert
      expect(todoApi.getTodos).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockTodos);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no todos exist', async () => {
      // Arrange
      (todoApi.getTodos as jest.Mock).mockResolvedValue({ todos: [] });

      // Act
      const result = await todoService.getTodos();

      // Assert
      expect(todoApi.getTodos).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should throw error on API failure', async () => {
      // Arrange
      const mockError: ErrorResponse = {
        error: 'Authentication required',
      };
      (todoApi.getTodos as jest.Mock).mockRejectedValue(mockError);

      // Act & Assert
      await expect(todoService.getTodos()).rejects.toEqual(mockError);
      expect(todoApi.getTodos).toHaveBeenCalledTimes(1);
    });
  });

  describe('createTodo()', () => {
    it('should create todo with title only', async () => {
      // Arrange
      const newTodoData: CreateTodoDto = {
        title: 'New Todo',
      };

      const createdTodo: Todo = {
        id: 3,
        user_id: 1,
        title: 'New Todo',
        description: null,
        due_date: null,
        is_completed: false,
        created_at: '2026-02-12T10:00:00Z',
        updated_at: '2026-02-12T10:00:00Z',
      };

      (todoApi.createTodo as jest.Mock).mockResolvedValue({ todo: createdTodo });

      // Act
      const result = await todoService.createTodo(newTodoData);

      // Assert
      expect(todoApi.createTodo).toHaveBeenCalledTimes(1);
      expect(todoApi.createTodo).toHaveBeenCalledWith(newTodoData);
      expect(result).toEqual(createdTodo);
    });

    it('should create todo with all fields', async () => {
      // Arrange
      const newTodoData: CreateTodoDto = {
        title: 'Complete Todo',
        description: 'This has all fields',
        due_date: '2026-02-20',
      };

      const createdTodo: Todo = {
        id: 4,
        user_id: 1,
        title: 'Complete Todo',
        description: 'This has all fields',
        due_date: '2026-02-20',
        is_completed: false,
        created_at: '2026-02-12T10:00:00Z',
        updated_at: '2026-02-12T10:00:00Z',
      };

      (todoApi.createTodo as jest.Mock).mockResolvedValue({ todo: createdTodo });

      // Act
      const result = await todoService.createTodo(newTodoData);

      // Assert
      expect(todoApi.createTodo).toHaveBeenCalledTimes(1);
      expect(todoApi.createTodo).toHaveBeenCalledWith(newTodoData);
      expect(result).toEqual(createdTodo);
      expect(result.description).toBe('This has all fields');
      expect(result.due_date).toBe('2026-02-20');
    });

    it('should throw error when title is missing', async () => {
      // Arrange
      const invalidData = {} as CreateTodoDto;
      const mockError: ErrorResponse = {
        error: 'Title is required',
      };

      (todoApi.createTodo as jest.Mock).mockRejectedValue(mockError);

      // Act & Assert
      await expect(todoService.createTodo(invalidData)).rejects.toEqual(mockError);
      expect(todoApi.createTodo).toHaveBeenCalledTimes(1);
    });

    it('should throw error on API failure', async () => {
      // Arrange
      const newTodoData: CreateTodoDto = {
        title: 'Test Todo',
      };

      const mockError: ErrorResponse = {
        error: 'Internal server error',
      };

      (todoApi.createTodo as jest.Mock).mockRejectedValue(mockError);

      // Act & Assert
      await expect(todoService.createTodo(newTodoData)).rejects.toEqual(mockError);
      expect(todoApi.createTodo).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTodo()', () => {
    it('should update todo successfully', async () => {
      // Arrange
      const todoId = 1;
      const updateData: UpdateTodoDto = {
        title: 'Updated Title',
        description: 'Updated Description',
      };

      const updatedTodo: Todo = {
        id: 1,
        user_id: 1,
        title: 'Updated Title',
        description: 'Updated Description',
        due_date: '2026-02-15',
        is_completed: false,
        created_at: '2026-02-11T10:00:00Z',
        updated_at: '2026-02-12T12:00:00Z',
      };

      (todoApi.updateTodo as jest.Mock).mockResolvedValue({ todo: updatedTodo });

      // Act
      const result = await todoService.updateTodo(todoId, updateData);

      // Assert
      expect(todoApi.updateTodo).toHaveBeenCalledTimes(1);
      expect(todoApi.updateTodo).toHaveBeenCalledWith(todoId, updateData);
      expect(result).toEqual(updatedTodo);
      expect(result.title).toBe('Updated Title');
    });

    it('should update todo with partial data', async () => {
      // Arrange
      const todoId = 2;
      const partialUpdate: UpdateTodoDto = {
        is_completed: true,
      };

      const updatedTodo: Todo = {
        id: 2,
        user_id: 1,
        title: 'Original Title',
        description: null,
        due_date: null,
        is_completed: true,
        created_at: '2026-02-10T09:00:00Z',
        updated_at: '2026-02-12T12:00:00Z',
      };

      (todoApi.updateTodo as jest.Mock).mockResolvedValue({ todo: updatedTodo });

      // Act
      const result = await todoService.updateTodo(todoId, partialUpdate);

      // Assert
      expect(todoApi.updateTodo).toHaveBeenCalledTimes(1);
      expect(todoApi.updateTodo).toHaveBeenCalledWith(todoId, partialUpdate);
      expect(result.is_completed).toBe(true);
      expect(result.title).toBe('Original Title');
    });

    it('should toggle completion status', async () => {
      // Arrange
      const todoId = 3;
      const toggleData: UpdateTodoDto = {
        is_completed: true,
      };

      const toggledTodo: Todo = {
        id: 3,
        user_id: 1,
        title: 'Toggle Test',
        description: null,
        due_date: null,
        is_completed: true,
        created_at: '2026-02-11T10:00:00Z',
        updated_at: '2026-02-12T12:00:00Z',
      };

      (todoApi.updateTodo as jest.Mock).mockResolvedValue({ todo: toggledTodo });

      // Act
      const result = await todoService.updateTodo(todoId, toggleData);

      // Assert
      expect(result.is_completed).toBe(true);
    });

    it('should throw error when todo not found', async () => {
      // Arrange
      const todoId = 999;
      const updateData: UpdateTodoDto = { title: 'Updated' };
      const mockError: ErrorResponse = {
        error: 'Todo not found',
      };

      (todoApi.updateTodo as jest.Mock).mockRejectedValue(mockError);

      // Act & Assert
      await expect(todoService.updateTodo(todoId, updateData)).rejects.toEqual(mockError);
      expect(todoApi.updateTodo).toHaveBeenCalledTimes(1);
    });

    it('should throw error when user lacks permission', async () => {
      // Arrange
      const todoId = 1;
      const updateData: UpdateTodoDto = { title: 'Hacked' };
      const mockError: ErrorResponse = {
        error: 'Access denied',
      };

      (todoApi.updateTodo as jest.Mock).mockRejectedValue(mockError);

      // Act & Assert
      await expect(todoService.updateTodo(todoId, updateData)).rejects.toEqual(mockError);
      expect(todoApi.updateTodo).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTodo()', () => {
    it('should delete todo successfully', async () => {
      // Arrange
      const todoId = 1;
      (todoApi.deleteTodo as jest.Mock).mockResolvedValue({ message: 'Todo deleted successfully' });

      // Act
      const result = await todoService.deleteTodo(todoId);

      // Assert
      expect(todoApi.deleteTodo).toHaveBeenCalledTimes(1);
      expect(todoApi.deleteTodo).toHaveBeenCalledWith(todoId);
      expect(result).toBeUndefined();
    });

    it('should throw error when todo not found', async () => {
      // Arrange
      const todoId = 999;
      const mockError: ErrorResponse = {
        error: 'Todo not found',
      };

      (todoApi.deleteTodo as jest.Mock).mockRejectedValue(mockError);

      // Act & Assert
      await expect(todoService.deleteTodo(todoId)).rejects.toEqual(mockError);
      expect(todoApi.deleteTodo).toHaveBeenCalledTimes(1);
    });

    it('should throw error when user lacks permission', async () => {
      // Arrange
      const todoId = 1;
      const mockError: ErrorResponse = {
        error: 'Access denied',
      };

      (todoApi.deleteTodo as jest.Mock).mockRejectedValue(mockError);

      // Act & Assert
      await expect(todoService.deleteTodo(todoId)).rejects.toEqual(mockError);
      expect(todoApi.deleteTodo).toHaveBeenCalledTimes(1);
    });
  });
});
