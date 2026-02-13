import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import swaggerRoutes from './routes/swagger.routes';
import { errorHandler } from './middleware/error-handler';

// Load environment variables
dotenv.config();

const app = express();

// CORS 설정 - 환경변수에서 허용할 origin 목록 가져오기
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:3000']; // 기본값

// CORS middleware
app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json());

// Test route (임시)
app.get('/test', (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'Test route works!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api-docs', swaggerRoutes);

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
const PORT = process.env.PORT || 3000;

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