import { Router } from 'express';
import productRoutes from './product.routes';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/products', productRoutes);

export default router;