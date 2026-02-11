import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

// Extend the Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
      };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the token
    const user = verifyToken(token);

    // Attach user info to request object
    req.user = user;

    // Continue to the next middleware/route handler
    return next();
  } catch (error) {
    // If token verification fails, return 401 Unauthorized
    return res.status(401).json({ error: 'Invalid token' });
  }
};