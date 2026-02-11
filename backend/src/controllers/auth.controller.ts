import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  /**
   * Register a new user
   * @param req - Express request object containing email and password in body
   * @param res - Express response object
   */
  static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Call AuthService to register the user
      await AuthService.register(email, password);

      // Return 201 Created response
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error: any) {
      // Handle specific error cases
      if (error.message === 'Email already exists') {
        // Return 400 for duplicate email
        return res.status(400).json({ error: error.message });
      }

      // For other errors, pass to error handler
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Login a user
   * @param req - Express request object containing email and password in body
   * @param res - Express response object
   */
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Call AuthService to login the user
      const result = await AuthService.login(email, password);

      // Return 200 OK response with token and user info
      return res.status(200).json(result);
    } catch (error: any) {
      // Handle specific error cases
      if (error.message === 'Invalid email or password') {
        // Return 401 for invalid credentials
        return res.status(401).json({ error: error.message });
      }

      // For other errors, pass to error handler
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}