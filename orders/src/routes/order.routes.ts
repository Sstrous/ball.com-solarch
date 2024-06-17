import { Router, Request, Response } from 'express';
import * as orderController from '../controllers/api.controller';

// New Router instance
const router = Router();

// Create a new order
router.post('/create', (req: Request, res: Response) => {
  orderController.createOrder(req, res);
});

router.get('/', (req: Request, res: Response) => {
  orderController.getAllOrders(req, res);
});

router.all('/:orderId', orderController.orderMiddleware);

router.put('/:orderId', (req: Request, res: Response) => {
  orderController.updateOrder(req, res);
});

export default router;