import pool from '../config/database';
import { User } from '../types/user.types';

export class UserRepository {
  /**
   * Finds a user by their email address
   * @param email - Email address to search for
   * @returns User object if found, null otherwise
   */
  static async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT id, email, password_hash, created_at, updated_at FROM users WHERE email = $1';
    const values = [email];
    
    const result = await pool.query(query, values);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  /**
   * Creates a new user in the database
   * @param email - User's email address
   * @param passwordHash - Hashed password
   * @returns Created User object
   */
  static async create(email: string, passwordHash: string): Promise<User> {
    const query = `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING id, email, password_hash, created_at, updated_at
    `;
    const values = [email, passwordHash];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}