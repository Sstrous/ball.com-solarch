import { Router } from 'express';
import orderRoutes from './order.routes';
import healthCheck from './healthCheck';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/orders', orderRoutes);
//router.use('/health', healthCheck);



export default router;