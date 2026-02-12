/**
 * User interface representing user data in the system
 * Note: password_hash is excluded for frontend security
 */
export interface User {
  id: number;
  email: string;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
}

/**
 * Data Transfer Object for user registration
 */
export interface RegisterDto {
  email: string;
  password: string;
}

/**
 * Data Transfer Object for user login
 */
export interface LoginDto {
  email: string;
  password: string;
}
