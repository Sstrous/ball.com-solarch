import { Router, Request, Response } from 'express';
import { createOrder } from '../controllers/order.controller';

// New Router instance
const router = Router();


// Get all customers
router.get('/', (req: Request, res: Response) => {
  createOrder(req, res);
});

export default router;