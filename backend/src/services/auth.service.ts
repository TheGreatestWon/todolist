import { User } from '../types/user.types';
import { UserRepository } from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

// Define a user type without password hash for safer returns
type SafeUser = Omit<User, 'password_hash'>;

export class AuthService {
  /**
   * Registers a new user
   * @param email - User's email address
   * @param password - User's password (will be hashed)
   */
  static async register(email: string, password: string): Promise<void> {
    // Check if user already exists
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    await UserRepository.create(email, hashedPassword);
  }

  /**
   * Logs in a user
   * @param email - User's email address
   * @param password - User's password
   * @returns Token and user information if credentials are valid
   */
  static async login(email: string, password: string): Promise<{ token: string; user: SafeUser }> {
    // Find the user by email
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare the password
    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    // Return token and user info (excluding password hash)
    const { password_hash, ...safeUser } = user;
    return {
      token,
      user: safeUser
    };
  }
}