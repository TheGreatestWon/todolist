import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import { errorHandler } from './middleware/error-handler';

// Load environment variables
dotenv.config();

const app = express();

// CORS middleware
app.use(cors());

// Body parsing middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Health check endpoint
app.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'Personal Todo Management System API is running!' });
});

// Catch-all for undefined routes
app.use((_req: Request, res: Response) => {
  return res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// Server setup
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;