import { Router } from 'express';
import logisticRoutes from './logistics.routes';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/logistics', logisticRoutes);

export default router;