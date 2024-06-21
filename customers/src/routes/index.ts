import { Router } from 'express';
import customerRoutes from './customer.routes';
import eventRoutes from './event.routes';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/customers', customerRoutes);
router.use('/events', eventRoutes);

export default router;