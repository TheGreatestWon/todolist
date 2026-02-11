import pool from '../config/database';
import { Todo } from '../types/todo.types';
import { CreateTodoDto, UpdateTodoDto } from '../types/todo.types';

export class TodoRepository {
  /**
   * Finds all todos for a specific user
   * @param userId - ID of the user whose todos to retrieve
   * @returns Array of Todo objects
   */
  static async findByUserId(userId: number): Promise<Todo[]> {
    const query = `
      SELECT id, user_id, title, description, due_date, is_completed, created_at, updated_at
      FROM todos
      WHERE user_id = $1
      ORDER BY 
        CASE WHEN due_date IS NULL THEN 1 ELSE 0 END,
        due_date ASC,
        created_at ASC
    `;
    const values = [userId];
    
    const result = await pool.query(query, values);
    return result.rows;
  }

  /**
   * Finds a specific todo by its ID
   * @param id - ID of the todo to retrieve
   * @returns Todo object if found, null otherwise
   */
  static async findById(id: number): Promise<Todo | null> {
    const query = `
      SELECT id, user_id, title, description, due_date, is_completed, created_at, updated_at
      FROM todos
      WHERE id = $1
    `;
    const values = [id];
    
    const result = await pool.query(query, values);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Creates a new todo for a user
   * @param userId - ID of the user creating the todo
   * @param data - Todo creation data
   * @returns Created Todo object
   */
  static async create(userId: number, data: CreateTodoDto): Promise<Todo> {
    const { title, description, due_date } = data;
    const query = `
      INSERT INTO todos (user_id, title, description, due_date, is_completed)
      VALUES ($1, $2, $3, $4, FALSE)
      RETURNING id, user_id, title, description, due_date, is_completed, created_at, updated_at
    `;
    const values = [userId, title, description || null, due_date || null];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Updates an existing todo
   * @param id - ID of the todo to update
   * @param userId - ID of the user who owns the todo
   * @param data - Todo update data
   * @returns Updated Todo object if successful, null otherwise
   */
  static async update(id: number, userId: number, data: UpdateTodoDto): Promise<Todo | null> {
    // Check if the todo belongs to the user first
    const checkQuery = 'SELECT id FROM todos WHERE id = $1 AND user_id = $2';
    const checkValues = [id, userId];
    const checkResult = await pool.query(checkQuery, checkValues);
    
    if (checkResult.rows.length === 0) {
      return null; // Todo doesn't exist or doesn't belong to the user
    }
    
    // Build dynamic query based on provided fields
    const fields: string[] = [];
    const values: any[] = [];
    
    if (data.title !== undefined) {
      fields.push(`title = $${fields.length + 1}`);
      values.push(data.title);
    }
    
    if (data.description !== undefined) {
      fields.push(`description = $${fields.length + 1}`);
      values.push(data.description);
    }
    
    if (data.due_date !== undefined) {
      fields.push(`due_date = $${fields.length + 1}`);
      values.push(data.due_date);
    }
    
    if (data.is_completed !== undefined) {
      fields.push(`is_completed = $${fields.length + 1}`);
      values.push(data.is_completed);
    }
    
    // Always update the updated_at timestamp
    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    
    if (fields.length === 0) {
      // Nothing to update, just return the existing todo
      return await this.findById(id);
    }
    
    values.push(id, userId); // Add id and userId for WHERE clause
    
    const query = `
      UPDATE todos SET ${fields.join(', ')}
      WHERE id = $${values.length - 1} AND user_id = $${values.length}
      RETURNING id, user_id, title, description, due_date, is_completed, created_at, updated_at
    `;
    
    const result = await pool.query(query, values);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Deletes a todo
   * @param id - ID of the todo to delete
   * @param userId - ID of the user who owns the todo
   * @returns True if deletion was successful, false otherwise
   */
  static async delete(id: number, userId: number): Promise<boolean> {
    const query = 'DELETE FROM todos WHERE id = $1 AND user_id = $2';
    const values = [id, userId];
    
    const result = await pool.query(query, values);
    return result.rowCount !== null && result.rowCount > 0;
  }
}