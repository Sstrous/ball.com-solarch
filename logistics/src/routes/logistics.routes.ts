import { Router, Request, Response } from 'express';
import * as logisticsController from '../controllers/api.controller'

// New Router instance
const router = Router();

// Get all customers
router.get('/', (req: Request, res: Response) => {
  logisticsController.getAllDeliveryCompanies(req, res);
});

router.all('/create', logisticsController.checkCreateRequest)

router.post('/create', (req: Request, res: Response) => {
  logisticsController.addDeliveryCompany(req, res);
})

router.all('/:companyId', logisticsController.logisticMiddleware);

router.put('/:companyId', (req: Request, res: Response) => {
  logisticsController.updateCompany(req, res);
});

router.get('/:companyId', (req: Request, res: Response) => {
  logisticsController.getCompanyById(req, res);
})

export default router;