import { Router } from 'express';
import warehouseRoutes from './warehouse.routes';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/warehouses', warehouseRoutes);

export default router;