/**
 * Todo interface representing todo data in the system
 */
export interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  due_date: string | null; // Format: YYYY-MM-DD
  is_completed: boolean;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
}

/**
 * Data Transfer Object for creating a new todo
 */
export interface CreateTodoDto {
  title: string;
  description?: string;
  due_date?: string; // Format: YYYY-MM-DD
}

/**
 * Data Transfer Object for updating an existing todo
 */
export interface UpdateTodoDto {
  title?: string;
  description?: string | null;
  due_date?: string | null; // Format: YYYY-MM-DD
  is_completed?: boolean;
}