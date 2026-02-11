import { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo.types';
import { TodoRepository } from '../repositories/todo.repository';
import { isOverdue } from '../utils/date';

export class TodoService {
  /**
   * Gets all todos for a specific user
   * @param userId - ID of the user whose todos to retrieve
   * @returns Array of Todo objects sorted by BR-012 priority (Overdue > due date > creation date)
   */
  static async getTodosByUser(userId: number): Promise<Todo[]> {
    const todos = await TodoRepository.findByUserId(userId);

    // Sort according to BR-012: Overdue > due date early > creation date early
    return todos.sort((a, b) => {
      const aIsOverdue = isOverdue(a.due_date, a.is_completed);
      const bIsOverdue = isOverdue(b.due_date, b.is_completed);

      // If one is overdue and the other is not, overdue comes first
      if (aIsOverdue && !bIsOverdue) return -1;
      if (!aIsOverdue && bIsOverdue) return 1;

      // If both are overdue or both are not overdue, sort by due date (earlier first)
      if (a.due_date && b.due_date) {
        if (a.due_date < b.due_date) return -1;
        if (a.due_date > b.due_date) return 1;
      } else if (a.due_date) {
        // a has due date, b doesn't - a comes first
        return -1;
      } else if (b.due_date) {
        // b has due date, a doesn't - b comes first
        return 1;
      }

      // If due dates are equal or both null, sort by creation date (earlier first)
      if (a.created_at < b.created_at) return -1;
      if (a.created_at > b.created_at) return 1;

      return 0;
    });
  }

  /**
   * Creates a new todo for a user
   * @param userId - ID of the user creating the todo
   * @param data - Todo creation data
   * @returns Created Todo object
   */
  static async createTodo(userId: number, data: CreateTodoDto): Promise<Todo> {
    // Validate title is not empty
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('Title is required');
    }

    // Create the todo
    return await TodoRepository.create(userId, data);
  }

  /**
   * Updates an existing todo
   * @param id - ID of the todo to update
   * @param userId - ID of the user who owns the todo
   * @param data - Todo update data
   * @returns Updated Todo object
   */
  static async updateTodo(id: number, userId: number, data: UpdateTodoDto): Promise<Todo> {
    // Validate that the user owns this todo
    const existingTodo = await TodoRepository.findById(id);
    if (!existingTodo || existingTodo.user_id !== userId) {
      throw new Error('Todo not found or access denied');
    }

    // Update the todo
    const updatedTodo = await TodoRepository.update(id, userId, data);
    if (!updatedTodo) {
      throw new Error('Failed to update todo');
    }

    return updatedTodo;
  }

  /**
   * Deletes a todo
   * @param id - ID of the todo to delete
   * @param userId - ID of the user who owns the todo
   * @returns True if deletion was successful, false otherwise
   */
  static async deleteTodo(id: number, userId: number): Promise<boolean> {
    // Validate that the user owns this todo
    const existingTodo = await TodoRepository.findById(id);
    if (!existingTodo || existingTodo.user_id !== userId) {
      throw new Error('Todo not found or access denied');
    }

    // Delete the todo
    return await TodoRepository.delete(id, userId);
  }
}