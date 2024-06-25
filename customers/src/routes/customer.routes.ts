import { Router, Request, Response } from 'express';
import * as customerController from '../controllers/api.controller';

// New Router instance
const router = Router();

// Get all customers
router.get('/', (req: Request, res: Response) => {
  customerController.getAllCustomers(req, res);
});

router.all('/create', customerController.checkCreateRequest)

router.post('/create', (req: Request, res: Response) => {
  customerController.createCustomer(req, res);
});

router.all('/:customerId', customerController.customerMiddleware);

router.put('/:customerId', (req: Request, res: Response) => {
  customerController.updateCustomer(req, res);
});

router.get('/:customerId', (req: Request, res: Response) => {
  customerController.getCustomerByID(req, res);
});



export default router;