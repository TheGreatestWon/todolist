import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';

const router = Router();

// Load swagger document
const swaggerPath = path.join(__dirname, '../../../swagger/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

// Swagger UI setup
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

export default router;
