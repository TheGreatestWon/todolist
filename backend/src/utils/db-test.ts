import { UserRepository } from '../repositories/user.repository';
import { hashPassword } from './password';

/**
 * Test script to verify database connection and create a test user
 */
async function testDbConnection() {
  try {
    console.log('Testing database connection...');
    
    // Try to create a test user
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    
    // Check if test user already exists
    const existingUser = await UserRepository.findByEmail(testEmail);
    
    if (existingUser) {
      console.log('Test user already exists:', existingUser.email);
    } else {
      // Create a test user
      const hashedPassword = await hashPassword(testPassword);
      const newUser = await UserRepository.create(testEmail, hashedPassword);
      console.log('Created test user:', newUser.email);
    }
    
    console.log('Database connection and user creation test completed successfully!');
  } catch (error) {
    console.error('Database test failed:', error);
  }
}

// Run the test
testDbConnection();