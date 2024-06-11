import { Router } from 'express';
import customerRoutes from './customer.routes';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/customers', customerRoutes);

export default router;