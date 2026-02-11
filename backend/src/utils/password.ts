import bcrypt from 'bcrypt';

/**
 * Hashes a plain text password using bcrypt
 * @param password - Plain text password to hash
 * @returns A promise that resolves to the hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compares a plain text password with a hashed password
 * @param password - Plain text password to compare
 * @param hash - Hashed password to compare against
 * @returns A promise that resolves to true if passwords match, false otherwise
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};