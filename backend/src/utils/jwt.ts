import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

/**
 * Generates a JWT token for a user
 * @param userId - The ID of the user
 * @param email - The email of the user
 * @returns A signed JWT token
 */
export const generateToken = (userId: number, email: string): string => {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

/**
 * Verifies and decodes a JWT token
 * @param token - The JWT token to verify
 * @returns An object containing userId and email if valid, throws error if invalid
 */
export const verifyToken = (token: string): { userId: number; email: string } => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    return {
      userId: decoded.userId,
      email: decoded.email
    };
  } catch (error) {
    throw new Error('Invalid token');
  }
};