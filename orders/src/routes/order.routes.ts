import { Router, Request, Response } from 'express';
import { createOrder, orderMiddleware } from '../controllers/api.controller';

// New Router instance
const router = Router();

// Create a new order
router.post('/create', (req: Request, res: Response) => {
  createOrder(req, res);
});

router.all('/:orderId', orderMiddleware);

export default router;