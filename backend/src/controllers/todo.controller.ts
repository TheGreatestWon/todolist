import { Request, Response } from 'express';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto, UpdateTodoDto } from '../types/todo.types';

export class TodoController {
  /**
   * Get all todos for the authenticated user
   * @param req - Express request object with user info from auth middleware
   * @param res - Express response object
   */
  static async getTodos(req: Request, res: Response) {
    try {
      // Extract user ID from the authenticated request
      const userId = req.user!.userId;

      // Call TodoService to get todos for the user
      const todos = await TodoService.getTodosByUser(userId);

      // Return 200 OK response with todos array
      return res.status(200).json({ todos, total: todos.length });
    } catch (error) {
      // Pass any errors to the error handler
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Create a new todo for the authenticated user
   * @param req - Express request object with user info and todo data in body
   * @param res - Express response object
   */
  static async createTodo(req: Request, res: Response) {
    try {
      // Extract user ID from the authenticated request
      const userId = req.user!.userId;
      
      // Parse the request body
      const { title, description, due_date }: CreateTodoDto = req.body;

      // Prepare the data object
      const data: CreateTodoDto = { title };
      if (description && typeof description === 'string') data.description = description;
      if (due_date && typeof due_date === 'string') data.due_date = due_date;

      // Call TodoService to create the todo
      const todo = await TodoService.createTodo(userId, data);

      // Return 201 Created response with the created todo
      return res.status(201).json({ todo });
    } catch (error: any) {
      // Pass any errors to the error handler
      if (error.message === 'Title is required') {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Update an existing todo
   * @param req - Express request object with user info, todo ID in params, and update data in body
   * @param res - Express response object
   */
  static async updateTodo(req: Request, res: Response) {
    try {
      // Extract user ID from the authenticated request and todo ID from params
      const userId = req.user!.userId;
      const id = parseInt(req.params.id as string, 10);

      // Parse the request body
      const { title, description, due_date, is_completed }: UpdateTodoDto = req.body;

      // Prepare the data object
      const data: UpdateTodoDto = {};
      if (title !== undefined && typeof title === 'string') data.title = title;
      if (description !== undefined) data.description = description;
      if (due_date !== undefined && typeof due_date === 'string') data.due_date = due_date;
      if (is_completed !== undefined && typeof is_completed === 'boolean') data.is_completed = is_completed;

      // Call TodoService to update the todo
      const todo = await TodoService.updateTodo(id, userId, data);

      // Return 200 OK response with the updated todo
      return res.status(200).json({ todo });
    } catch (error: any) {
      // Handle specific error cases
      if (error.message === 'Todo not found or access denied') {
        if (error.message.includes('access denied')) {
          // Return 403 for access denied
          return res.status(403).json({ error: error.message });
        } else {
          // Return 404 for todo not found
          return res.status(404).json({ error: error.message });
        }
      }

      // For other errors, pass to error handler
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Delete an existing todo
   * @param req - Express request object with user info and todo ID in params
   * @param res - Express response object
   */
  static async deleteTodo(req: Request, res: Response) {
    try {
      // Extract user ID from the authenticated request and todo ID from params
      const userId = req.user!.userId;
      const id = parseInt(req.params.id as string, 10);

      // Call TodoService to delete the todo
      const success = await TodoService.deleteTodo(id, userId);

      if (success) {
        // Return 200 OK response
        return res.status(200).json({ message: 'Todo deleted successfully' });
      } else {
        // Return 404 if todo not found
        return res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error: any) {
      // Handle specific error cases
      if (error.message === 'Todo not found or access denied') {
        if (error.message.includes('access denied')) {
          // Return 403 for access denied
          return res.status(403).json({ error: error.message });
        } else {
          // Return 404 for todo not found
          return res.status(404).json({ error: error.message });
        }
      }

      // For other errors, pass to error handler
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}