import { Router, Request, Response } from 'express';
import { getAllCustomers, getCustomerById, createCustomer } from '../controllers/customer.controller';

// New Router instance
const router = Router();


// Get all customers
router.get('/', (req: Request, res: Response) => {
  getAllCustomers(req, res);
});

router.get('/:email', (req: Request, res: Response) => {
  getCustomerById(req, res);
})

router.post('/create', (req: Request, res: Response) => {
  createCustomer(req, res);
})

export default router;