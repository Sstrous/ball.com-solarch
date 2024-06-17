import { Router, Request, Response } from 'express';
import * as customerController from '../controllers/api.controller';

// New Router instance
const router = Router();

// Get all customers
router.get('/', (req: Request, res: Response) => {
  customerController.getAllCustomers(req, res);
});

router.post('/create', (req: Request, res: Response) => {
  customerController.createCustomer(req, res);
});

router.all('/:email', customerController.customerMiddleware);

router.put('/:email', (req: Request, res: Response) => {
  customerController.updateCustomer(req, res);
});

router.get('/:email', (req: Request, res: Response) => {
  customerController.getCustomerByEmail(req, res);
});

export default router;