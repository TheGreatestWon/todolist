import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Log the error
  console.error(err.stack);

  // Determine status code based on error type
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Handle specific error types
  if (err.message.includes('Invalid token') || err.message.includes('Authentication required')) {
    statusCode = 401;
    message = err.message;
  } else if (err.message.includes('Access denied') || err.message.includes('Todo not found')) {
    statusCode = 403;
    message = err.message;
  } else if (err.message.includes('Title is required')) {
    statusCode = 400;
    message = err.message;
  } else if (err.message.includes('Email already exists') || err.message.includes('Invalid email or password')) {
    statusCode = err.message.includes('already exists') ? 400 : 401;
    message = err.message;
  }

  // In production, don't send stack trace
  return res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};