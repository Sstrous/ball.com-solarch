import { Router, Request, Response } from 'express';
import { getAllCustomers, getCustomerByEmail, createCustomer, customerMiddleware } from '../controllers/api.controller';

// New Router instance
const router = Router();


// Get all customers
router.get('/', (req: Request, res: Response) => {
  getAllCustomers(req, res);
});

router.post('/create', (req: Request, res: Response) => {
  createCustomer(req, res);
})

router.all('/:email', customerMiddleware);

router.get('/:email', (req: Request, res: Response) => {
  getCustomerByEmail(req, res);
})

export default router;