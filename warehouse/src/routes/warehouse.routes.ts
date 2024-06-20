import { Router, Request, Response } from 'express';
import * as warehouseController from '../controllers/api.controller'

// New Router instance
const router = Router();

// Get all customers
router.get('/', (req: Request, res: Response) => {
  warehouseController.getWarehouses(req, res);
});

router.all('/create', warehouseController.checkCreateRequest);

router.post('/create', (req: Request, res: Response) => {
  warehouseController.addWarehouse(req, res);
})

router.all('/:warehouseId', warehouseController.warehouseMiddleware);

router.put('/:warehouseId', (req: Request, res: Response) => {
  warehouseController.updateWarehouse(req, res);
});

router.get('/:warehouseId', (req: Request, res: Response) => {
  warehouseController.getWarehouseById(req, res);
})

export default router;