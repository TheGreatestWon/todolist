import { Request, Response, NextFunction } from 'express';

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Validate email format
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(422).json({ error: 'Invalid email format' });
  }

  // Validate password length
  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(422).json({ error: 'Password must be at least 8 characters' });
  }

  // If all validations pass, proceed to the next middleware
  return next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Validate email format
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(422).json({ error: 'Invalid email format' });
  }

  // Validate password is provided
  if (!password || typeof password !== 'string') {
    return res.status(422).json({ error: 'Password is required' });
  }

  // If all validations pass, proceed to the next middleware
  return next();
};

export const validateCreateTodo = (req: Request, res: Response, next: NextFunction) => {
  const { title } = req.body;

  // Validate title is provided and not empty
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required' });
  }

  // If validation passes, proceed to the next middleware
  return next();
};