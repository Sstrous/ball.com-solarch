import { Router } from 'express';
import usersRouter from './users.routes';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/users', usersRouter);

export default router;