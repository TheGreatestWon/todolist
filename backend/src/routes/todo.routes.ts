import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { authMiddleware } from '../middleware/auth';
import { validateCreateTodo } from '../middleware/validator';

const router = Router();

// GET /api/todos
router.get('/', authMiddleware, TodoController.getTodos);

// POST /api/todos
router.post('/', authMiddleware, validateCreateTodo, TodoController.createTodo);

// PUT /api/todos/:id
router.put('/:id', authMiddleware, TodoController.updateTodo);

// DELETE /api/todos/:id
router.delete('/:id', authMiddleware, TodoController.deleteTodo);

export default router;