import { Router } from 'express';
import { login } from './user.controller';

const router = Router();

// Login route
router.post('/login', login);

export default router;
