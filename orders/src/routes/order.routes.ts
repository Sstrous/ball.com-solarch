import { Router, Request, Response } from 'express';
import { createOrder } from '../controllers/order.controller';

// New Router instance
const router = Router();

// Create a new order
router.post('/create', (req: Request, res: Response) => {
  createOrder(req, res);
});

export default router;